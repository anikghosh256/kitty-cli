#!/usr/bin/env node

/**
 * kitty-cli
 * CLI tool for creating kitty component.
 *
 * @author Anik Ghosh <https://github.com/anikghosh256>
 */

const { logo, showHelp } = require('./helpers/print');

require('yargs/yargs')(process.argv.slice(2))
  .command('$0', false, () => {}, (argv) => {
    logo();
    showHelp();
  })
  .commandDir('cmds')
  .demandCommand()
  .help()
  .argv