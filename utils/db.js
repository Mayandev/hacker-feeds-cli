const homedir = process.env.HOME || require('os').homedir();
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const configPath = path.resolve(homedir, '.hfrc');

const config = {
  async load(path = configPath) {
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
    const originOptions = await config.load(path);
    const mergedOptions = { ...originOptions, ...options };
    const content = JSON.stringify(mergedOptions);
    try {
      fs.writeFileSync(path, content);
      console.log(chalk.green('Saved!'));
      return;
    } catch (error) {
      console.log(chalk.red('Failed!'));
    }
    return fs.writeFileSync(path, content);
  },
};

module.exports = config;
