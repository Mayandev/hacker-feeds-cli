const axios = require('axios');
const chalk = require('chalk');
const ora = require('ora');
const { PH_ACCESS_TOKEN } = require('../common/config');
const { ProductHuntBaseUrl } = require('../common/const');
const { formatDate } = require('./format');

const defaultDate = formatDate();

async function fetchProductHunt(count = 10, time = defaultDate) {
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
      query: `query { posts(first: ${count}, order: VOTES, postedAfter: "${time}") {
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
    console.log('----------------------------------------------');
    products
      .map((product) => product.node)
      .forEach(({ name, description, url, website }) => {
        console.log(chalk.bold('Name: ', chalk.green(name)));
        console.log('Description: ', chalk.green(description));
        console.log('Product URL: ', chalk.cyan(url.split('?')[0]));
        console.log('Website: ', chalk.cyan(website.split('?')[0]));
        console.log('----------------------------------------------');
      });
  } catch (error) {
    spinner.fail('Something error, You can contact the developer. Mail to <phillzou@gmail.com>');
  }
}

module.exports = fetchProductHunt;
