const axios = require('axios');
const chalk = require('chalk');
const ora = require('ora');
const { GitHubBaseUrl } = require('../common/const');

async function fetchGitHubTrending(since = 'daily', language = '') {
  const spinner = ora('Fetching feeds...').start();
  try {
    const {
      data: { items },
    } = await axios.get(`${GitHubBaseUrl}?since=${since}&lang=${language}`);
    spinner.stop();
    console.log(chalk.cyan(`---------🐙 GitHub Trending List---------`));
    items.forEach(({ repo, repo_link, desc, lang, stars, added_stars }) => {
      console.log(
        'Repo: ',
        chalk.cyan(repo),
        ' | ',
        'Language: ',
        chalk.cyan(lang),
        ' | Star: ',
        chalk.cyan(stars, ' | ', added_stars),
      );
      desc && console.log('Desc: ', chalk.green(desc));
      console.log('Link: ', chalk.dim(repo_link));
      console.log(chalk.cyan(`-----------------------------------------`));
    });
  } catch (e) {}
}

module.exports = fetchGitHubTrending;
