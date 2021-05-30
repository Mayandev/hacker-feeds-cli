#!/usr/bin/env node
const chalk = require('chalk');
const program = require('commander');
const pkg = require('../package.json');
const inquirer = require('inquirer');
const { fetchHackerNews, fetchProductHunt, fetchGitHubTrending, config, t } = require('../utils');

program.on('--help', () => {
  console.log(
    chalk.green(`
Example:
  $ hfeeds hn`),
  );
});

// get hacker news feeds
program
  .command('news')
  .description(t('program.hnDesc'))
  .option('-t, --top <top n>', t('program.hnTop'))
  .action((args) => {
    const { top = 10 } = args;
    fetchHackerNews(0, top);
  });

// get product hunt feeds
program
  .command('product')
  .description(t('program.phDesc'))
  .option('-c, --count <count n>', t('program.phCount'))
  .option('-p, --past <past n days>', t('program.phPast'))
  .action((args) => {
    const { past = 0, count = 10 } = args;
    fetchProductHunt(count, past);
  });

// get github feeds
program
  .command('github')
  .description(t('program.ghDesc'))
  .option('-s, --since <optional>', t('program.ghSince'))
  .option('-l, --lang <optional>', t('program.ghLang'))
  .action((args) => {
    const { since = 'daily', lang = '' } = args;
    fetchGitHubTrending(since, lang);
  });

// settings
program
  .command('config')
  .description(t('program.configDesc'))
  .option('-l, --lang <optional>', t('program.configLang'))
  .action(({ args }) => {
    console.log(args);
    if (args.length === 0) {
      setConfig();
      return;
    }
    const { lang = 'en' } = args;
    config.write({ lang });
  });

program.addHelpCommand('help [command]', t('program.help'));
program.helpOption('-h, --help', t('program.help'));
program.version(pkg.version, '-v, --version', t('program.version'));

program.parse(process.argv);

// trigger without param
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

async function setConfig() {
  // inquire for a api link
  const { lang } = await inquirer.prompt([
    {
      type: 'list',
      message: t('program.langConfig'),
      name: 'lang',
      choices: [
        { name: 'EN（English）', value: 'en' },
        { name: 'ZH（简体中文）', value: 'zh' },
      ],
    },
  ]);
  config.write({ lang });
}
