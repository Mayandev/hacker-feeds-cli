const fetchHackerNews = require('./fetchHackerNews');
const fetchProductHunt = require('./fetchProductHunt');
const fetchGitHubTrending = require('./fetchGitHub');
const fetchReddit = require('./fetchReddit');
const fetchV2ex = require('./fetchV2ex');
const config = require('./db');
const t = require('./i18n');

module.exports = {
  fetchHackerNews,
  fetchProductHunt,
  fetchGitHubTrending,
  fetchReddit,
  fetchV2ex,
  config,
  t,
};
