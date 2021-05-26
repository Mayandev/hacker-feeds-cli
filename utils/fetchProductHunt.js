const axios = require('axios');
const chalk = require('chalk');
const ora = require('ora');
const { PH_ACCESS_TOKEN } = require('../common/config');
const { ProductHuntBaseUrl } = require('../common/const');
const { formatDate, getAfterNDayDate, getBeforeNDayDate } = require('./date');

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
  const spinner = ora('Fetching feeds...').start();
  try {
    const { data } = await axios(reqOptions);
    const products = data.data.posts.edges || [];
    spinner.stop();
    if (products.length === 0) {
      spinner.fail('The ranking has not yet been updated, you can check the past data.');
      console.log(chalk.green('Example: hfeeds product -p 1'));
      return;
    }
    console.log(chalk.cyan(`------------ 🔮 ${beforeOneDay} Product Hunt List ------------`));
    console.log('----------------------------------------------');
    products
      .map((product) => product.node)
      .forEach(({ name, description, url, website, votesCount }) => {
        console.log(chalk.bold('Product Name: ', chalk.green(name)), chalk.bold('| Votes:', chalk.green(votesCount)));
        console.log('✍️  Description: ', chalk.green(description));
        console.log('🔗 Product URL: ', chalk.cyan(url.split('?')[0]));
        console.log('🌍 Website: ', chalk.cyan(website.split('?')[0]));
        console.log('----------------------------------------------');
      });
  } catch (error) {
    console.log(error);
    spinner.fail('Something error, You can contact the developer. Mail to <phillzou@gmail.com>');
  }
}

module.exports = fetchProductHunt;
