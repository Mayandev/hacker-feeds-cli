const axios = require('axios');
const _ = require('lodash');
const ora = require('ora');
const t = require('./i18n');
const { RedditBaseUrl } = require('../common/const');
const chalk = require('chalk');

async function fetchReddit(sort = 'hot', topic = 'popular') {
  const url = `${RedditBaseUrl}/r/${topic}/${sort}.json`;
  const spinner = ora(t('spinner.load')).start();
  try {
    const { data } = await axios.get(url);
    const items = _.get(data, 'data.children', []);
    spinner.stop();
    console.log(
      chalk.cyan(`-----------------------------------------
              🤖️ ${t('reddit.title')}          
-----------------------------------------
    `),
    );
    items.forEach((item) => {
      const {
        data: { title, ups, selftext, num_comments, subreddit, permalink },
      } = item;
      console.log(t('reddit.postName'), ': ', chalk.green(title));
      console.log(
        `${t('reddit.comment')}: `,
        chalk.cyan(num_comments),
        ' | ',
        `${t('reddit.votes')}: `,
        chalk.cyan(ups),
        ` | ${t('reddit.topic')}: `,
        chalk.cyan(subreddit),
      );
      console.log(t('reddit.url'), ': ', chalk.dim(`${RedditBaseUrl}${permalink}`));
      if (selftext !== '') {
        console.log(t('reddit.content'), ': ', chalk.cyan(selftext));
      }
      console.log('----------------------------------------------');
    });
    spinner.stop();
  } catch (error) {
    console.log(error);
    spinner.fail(t('spinner.fail'));
  }
}

module.exports = fetchReddit;
