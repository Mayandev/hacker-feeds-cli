const axios = require('axios');
const { HackerNewsBaseUrl } = require('../common/const');

function News(title, url) {
  this.title = title;
  this.url = url;
}

async function fetchHackerNews(start = 0, end = 10) {
  const url = `${HackerNewsBaseUrl}topstories.json`;
  const { data = [] } = await axios.get(url);
  const promises = data
    .slice(start, end)
    .map((itemId) => axios.get(`${HackerNewsBaseUrl}item/${itemId}.json`));
  const result = await Promise.all(promises);
  const news = result.map((item) => item.data).map(({ title, url }) => new News(title, url));
  console.table(news);
  return news;
}

module.exports = fetchHackerNews;
