#!/usr/bin/env node

/**
 * kitty-cli
 * CLI tool for creating kitty component.
 *
 * @author Anik Ghosh <https://github.com/anikghosh256>
 */

require('yargs/yargs')(process.argv.slice(2))
  .command('$0', false, () => {}, (argv) => {
    console.log('argv')
  })
  .commandDir('cmds')
  .demandCommand()
  .help()
  .argv