const i18n = require('../i18n');
const _ = require('lodash');
const config = require('./db');

function t(path) {
  const { lang = 'en' } = config.load();
  const langMap = i18n[lang];
  return _.get(langMap, `${path}`);
}

module.exports = t;
