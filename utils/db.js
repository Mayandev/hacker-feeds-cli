const homedir = process.env.HOME || require('os').homedir();
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const configPath = path.resolve(homedir, '.hfrc');

const config = {
  load(path = configPath) {
    const conf = {};
    if (fs.existsSync(path) && fs.statSync(path).isFile()) {
      const content = fs.readFileSync(path, 'utf-8');
      try {
        return JSON.parse(content.toString());
      } catch (e) {
        return conf;
      }
    } else {
      return conf;
    }
  },
  async write(options = {}, path = configPath) {
    const t = require('./i18n');
    const originOptions = await config.load(path);
    const mergedOptions = { ...originOptions, ...options };
    const content = JSON.stringify(mergedOptions);
    try {
      fs.writeFileSync(path, content);
      console.log(chalk.green(`✅ ${t('config.saved')}!`));
      return;
    } catch (error) {
      console.log(chalk.red(`${t('config.failed')}!`));
    }
    return fs.writeFileSync(path, content);
  },
};

module.exports = config;
