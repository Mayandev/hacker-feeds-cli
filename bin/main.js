#!/usr/bin/env node
const chalk = require('chalk');
const program = require('commander');
const pkg = require('../package.json');
const fetchHackerNews = require('../utils/fetchHackerNews');

program.version(pkg.version).usage('<command> [options]');

program.on('--help', () => {
  console.log(chalk.green('Template output'));
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

program
  .command('product')
  .description('get the product hunt list')
  .option('--param', 'Set product hubt param');

program.parse(process.argv);

// trigger without param
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
