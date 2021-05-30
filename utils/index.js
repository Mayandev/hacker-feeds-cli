const fetchHackerNews = require('./fetchHackerNews');
const fetchProductHunt = require('./fetchProductHunt');
const fetchGitHubTrending = require('./fetchGitHub');
const config = require('./db');
const t = require('./i18n');

module.exports = {
  fetchHackerNews,
  fetchProductHunt,
  fetchGitHubTrending,
  config,
  t,
};
