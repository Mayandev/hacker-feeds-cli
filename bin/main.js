#!/usr/bin/env node
const chalk = require('chalk');
const program = require('commander');
const pkg = require('../package.json');
const ora = require('ora');
const { fetchHackerNews, fetchProductHunt } = require('../utils');

program.version(pkg.version).usage('<command> [options]');

program.on('--help', () => {
  console.log(chalk.green('Hacker feeds usage'));
});

// get hacker news feeds
program
  .command('news')
  .description('get the hacker news list')
  .option('--param', 'Set hacker feeds param')
  .action((args) => {
    // input "> hacker news"
    if (process.argv.length === 3) {
      fetchHackerNews();
    }
  });

// get product hunt feeds
program
  .command('product')
  .description('get the product hunt list')
  .option('--param', 'Set product hunt param')
  .action((args) => {
    // input "> hacker news"
    if (process.argv.length === 3) {
      fetchProductHunt();
    }
  });

program.parse(process.argv);

// trigger without param
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
