const { copy } = require('../helpers/file');
const path = require('path');
const chalk = require('chalk');


exports.command = 'init [dir]'
exports.desc = 'Initialize kitty dir.'
exports.builder = {
  dir: {
    default: './kitty'
  }
}
exports.handler = function (argv) {
  try {
    const sourceFile = path.resolve(__dirname, '../templates');
    copy(sourceFile, argv.dir);
    console.log(chalk.green('Kitty dir initialized successfully!'));
    console.log('');
    console.log(`Please read the ${chalk.cyan('README.md')} file in the kitty dir.`)  
  } catch (error) {
    console.log(chalk.red(error.message));
  }
}