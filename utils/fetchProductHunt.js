const axios = require('axios');
const chalk = require('chalk');
const ora = require('ora');
const { PH_ACCESS_TOKEN } = require('../common/config');
const { ProductHuntBaseUrl } = require('../common/const');
const { formatDate, getAfterNDayDate, getBeforeNDayDate } = require('./date');
const t = require('./i18n');

const defaultDate = formatDate(new Date());

async function fetchProductHunt(count = 10, past = 0, time = defaultDate) {
  const beforeOneDay = getBeforeNDayDate(time, past);
  const afterOneDay = getAfterNDayDate(time, 1);
  const reqOptions = {
    url: ProductHuntBaseUrl,
    headers: {
      Authorization: `Bearer ${PH_ACCESS_TOKEN}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    mode: 'cors',
    data: JSON.stringify({
      query: `query { posts(first: ${count}, order: VOTES, postedAfter: "${beforeOneDay}", postedBefore: "${afterOneDay}") {
          edges{
            cursor
            node{
              id
              name
              tagline
              description
              url
              votesCount
              thumbnail{
                type
                url
              }
              website
              reviewsRating
}}}}`,
    }),
  };
  const spinner = ora(t('spinner.load')).start();
  try {
    const { data } = await axios(reqOptions);
    const products = data.data.posts.edges || [];
    if (products.length === 0) {
      spinner.fail(t('spinner.unUpdate'));
      return;
    }
    spinner.stop();
    console.log(
      chalk.green(`-----------------------------------------
          🔮 ${t('ph.title')}          
-----------------------------------------
    `),
    );
    products
      .map((product) => product.node)
      .forEach(({ name, description, url, website, votesCount }) => {
        console.log(
          chalk.bold(`${t('ph.name')}: `, chalk.cyan(name)),
          `| ${t('ph.votes')}:`,
          chalk.cyan(votesCount),
        );
        console.log(`${t('ph.desc')}: `, chalk.green(description));
        console.log(`${t('ph.url')}: `, chalk.dim(url.split('?')[0]));
        console.log(`${t('ph.website')}: `, chalk.dim(website.split('?')[0]));
        console.log('----------------------------------------------');
      });
  } catch (error) {
    console.log(error);
    spinner.fail(t('spinner.fail'));
  }
}

module.exports = fetchProductHunt;
