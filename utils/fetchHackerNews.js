const axios = require('axios');
const chalk = require('chalk');
const ora = require('ora');
const { HackerNewsBaseUrl } = require('../common/const');

async function fetchHackerNews(start = 0, end = 10) {
  const url = `${HackerNewsBaseUrl}topstories.json`;
  const spinner = ora('Fetching feeds...').start();
  try {
    const { data = [] } = await axios.get(url);
    const promises = data
      .slice(start, end)
      .map((itemId) => axios.get(`${HackerNewsBaseUrl}item/${itemId}.json`));
    const result = await Promise.all(promises);
    spinner.stop();
    console.log('------------------------------------');
    const news = result
      .map((item) => item.data)
      .forEach(({ title, url }) => {
        // output list
        console.log('Title: ', chalk.green(title));
        console.log('URL: ', chalk.cyan(url));
        console.log('------------------------------------');
      });
    return news;
  } catch (error) {
    spinner.fail('Something error, You can contact the developer. Mail to <phillzou@gmail.com>');
  }
}

module.exports = fetchHackerNews;
