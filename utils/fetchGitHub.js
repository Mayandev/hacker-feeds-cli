const axios = require('axios');
const chalk = require('chalk');
const ora = require('ora');
const { GitHubBaseUrl } = require('../common/const');
const t = require('./i18n');
async function fetchGitHubTrending(since = 'daily', language = '') {
  const spinner = ora(t('spinner.load')).start();
  try {
    const {
      data: { items },
    } = await axios.get(`${GitHubBaseUrl}?since=${since}&lang=${language}`);
    spinner.stop();
    console.log(
      chalk.green(`-----------------------------------------
          🐙 ${t('github.title')}          
-----------------------------------------
    `),
    );
    items.forEach(({ repo, repo_link, desc, lang, stars, added_stars }) => {
      console.log(
        `${t('github.repo')}: `,
        chalk.cyan(repo),
        ' | ',
        `${t('github.lang')}: `,
        chalk.cyan(lang),
        ` | ${t('github.star')}: `,
        chalk.cyan(stars, ' | ', added_stars),
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
