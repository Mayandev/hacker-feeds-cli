const axios = require('axios');
const _ = require('lodash');
const ora = require('ora');
const t = require('./i18n');
const { V2exBaseUrl } = require('../common/const');
const chalk = require('chalk');

async function fetchV2ex(topic = 'create') {
  const url = `${V2exBaseUrl}/api/topics/show.json?node_name=${topic}`;
  const spinner = ora(t('spinner.load')).start();
  try {
    const { data } = await axios.get(url);
    spinner.stop();
    console.log(
      chalk.cyan(`-----------------------------------------
              🤖️ ${t('v2ex.title')}          
-----------------------------------------
    `),
    );
    data.forEach((item) => {
      const { title, url, content, node = {}, replies } = item;
      console.log(t('v2ex.postName'), ': ', chalk.cyan(title));
      console.log(
        `${t('v2ex.comment')}: `,
        chalk.yellow(replies),
        ` | ${t('v2ex.topic')}: `,
        chalk.yellow(node.name),
      );
      console.log(t('v2ex.url'), ': ', chalk.dim(url));
      if (content !== '') {
        console.log(t('v2ex.content'), ': ', chalk.green(content));
      }
      console.log('----------------------------------------------');
    });
    spinner.stop();
  } catch (error) {
    console.log(error);
    spinner.fail(t('spinner.fail'));
  }
}

module.exports = fetchV2ex;
