const fetchHackerNews = require('./fetchHackerNews');
const fetchProductHunt = require('./fetchProductHunt');
const fetchGitHubTrending = require('./fetchGitHub');
const fetchReddit = require('./fetchReddit');
const config = require('./db');
const t = require('./i18n');

module.exports = {
  fetchHackerNews,
  fetchProductHunt,
  fetchGitHubTrending,
  fetchReddit,
  config,
  t,
};
