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
  .option('-t, --top <top n>', 'get top n list')
  .action((args) => {
    const { top = 10 } = args;
    fetchHackerNews(0, top);
  });

// get product hunt feeds
program
  .command('product')
  .description('get the product hunt list')
  .option('-c, --count <count n>', 'set product list count')
  .option('-p, --past <past n days>', 'get past n day list')
  .action((args) => {
    const { past = 0, count = 10 } = args;
    fetchProductHunt(count, past);
  });

program.parse(process.argv);

// trigger without param
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
