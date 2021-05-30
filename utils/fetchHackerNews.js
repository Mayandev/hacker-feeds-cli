const axios = require('axios');
const chalk = require('chalk');
const ora = require('ora');
const { HackerNewsBaseUrl } = require('../common/const');
const t = require('./i18n');

async function fetchHackerNews(start = 0, end = 10) {
  const url = `${HackerNewsBaseUrl}topstories.json`;
  const spinner = ora(t('spinner.load')).start();
  try {
    const { data = [] } = await axios.get(url);
    const promises = data
      .slice(start, end)
      .map((itemId) => axios.get(`${HackerNewsBaseUrl}item/${itemId}.json`));
    const result = await Promise.all(promises);
    spinner.stop();
    console.log(
      chalk.cyan(`-----------------------------------------
              📰 ${t('hn.outputTitle')}          
-----------------------------------------
    `),
    );
    const news = result
      .map((item) => item.data)
      .forEach(({ title, url }) => {
        // output list
        console.log(`${t('hn.title')}: `, chalk.green(title));
        console.log(`${t('hn.url')}: `, chalk.dim(url));
        console.log('------------------------------------');
      });
    return news;
  } catch (error) {
    console.log(error);
    spinner.fail(t('spinner.fail'));
  }
}

module.exports = fetchHackerNews;
