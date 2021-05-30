const axios = require('axios');
const chalk = require('chalk');
const ora = require('ora');
const t = require('./i18n');
const cheerio = require('cheerio');
const { omitBy, isNil } = require('lodash');
const GITHUB_URL = 'https://github.com';

function omitNil(object) {
  return omitBy(object, isNil);
}

function removeDefaultAvatarSize(src) {
  /* istanbul ignore if */
  if (!src) {
    return src;
  }
  return src.replace(/\?s=.*$/, '');
}

async function fetchRepositories({ language = '', since = 'daily', spokenLanguage = '' } = {}) {
  const url = `${GITHUB_URL}/trending/${language}?since=${since}&spoken_language_code=${spokenLanguage}`;
  const { data } = await axios.get(url, {
    responseType: 'text',
  });
  const $ = cheerio.load(data);
  return (
    $('.Box article.Box-row')
      .get()
      // eslint-disable-next-line complexity
      .map((repo) => {
        const $repo = $(repo);
        const title = $repo.find('.h3').text().trim();
        const [username, repoName] = title.split('/').map((v) => v.trim());
        const relativeUrl = $repo.find('.h3').find('a').attr('href');
        const currentPeriodStarsString =
          $repo.find('.float-sm-right').text().trim() || /* istanbul ignore next */ '';

        const builtBy = $repo
          .find('span:contains("Built by")')
          .find('[data-hovercard-type="user"]')
          .map((i, user) => {
            const altString = $(user).children('img').attr('alt');
            const avatarUrl = $(user).children('img').attr('src');
            return {
              username: altString ? altString.slice(1) : /* istanbul ignore next */ null,
              href: `${GITHUB_URL}${user.attribs.href}`,
              avatar: removeDefaultAvatarSize(avatarUrl),
            };
          })
          .get();

        const colorNode = $repo.find('.repo-language-color');
        const langColor = colorNode.length ? colorNode.css('background-color') : null;

        const langNode = $repo.find('[itemprop=programmingLanguage]');

        const lang = langNode.length ? langNode.text().trim() : /* istanbul ignore next */ null;

        return omitNil({
          author: username,
          repo: repoName,
          avatar: `${GITHUB_URL}/${username}.png`,
          repo_link: `${GITHUB_URL}${relativeUrl}`,
          desc: $repo.find('p.my-1').text().trim() || '',
          lang: lang,
          languageColor: langColor,
          stars: parseInt(
            $repo
              .find(".mr-3 svg[aria-label='star']")
              .first()
              .parent()
              .text()
              .trim()
              .replace(',', '') || /* istanbul ignore next */ '0',
            10,
          ),
          forks: parseInt(
            $repo.find("svg[aria-label='fork']").first().parent().text().trim().replace(',', '') ||
              /* istanbul ignore next */ '0',
            10,
          ),
          added_stars: parseInt(
            currentPeriodStarsString.split(' ')[0].replace(',', '') ||
              /* istanbul ignore next */ '0',
            10,
          ),
          builtBy,
        });
      })
  );
}

async function fetchGitHubTrending(since = 'daily', language = '') {
  const spinner = ora(t('spinner.load')).start();
  try {
    const items = await fetchRepositories({ language, since });
    spinner.stop();
    console.log(
      chalk.green(`-----------------------------------------
          🐙 ${t('github.title')}          
-----------------------------------------
    `),
    );
    items.forEach(({ repo, repo_link, desc, lang, stars, added_stars, author }) => {
      console.log(
        `${t('github.repo')}: `,
        chalk.cyan(repo),
        ' | ',
        `${t('github.lang')}: `,
        chalk.cyan(lang),
        ` | ${t('github.star')}: `,
        chalk.cyan(stars),
        ` ｜ ${t(`github.addedStar.${since}`)}: `,
        chalk.cyan(added_stars),
        ` | ${t('github.author')}: `,
        chalk.cyan(author),
      );
      desc && console.log(`${t('github.desc')}: `, chalk.green(desc));
      console.log(`${t('github.link')}: `, chalk.dim(repo_link));
      console.log(chalk.cyan(`-----------------------------------------`));
    });
  } catch (e) {
    console.log(e);
    spinner.fail(t('spinner.fail'));
  }
}

module.exports = fetchGitHubTrending;
