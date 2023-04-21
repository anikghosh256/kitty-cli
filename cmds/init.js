const { copy } = require('../helpers/file');
const path = require('path');
const chalk = require('chalk');


exports.command = 'init'
exports.desc = 'Initialize kitty dir.'

exports.handler = function () {
  try {
    const sourceFile = path.resolve(__dirname, '../templates');
    copy(sourceFile, "./kitty");
    console.log(chalk.green('Kitty dir initialized successfully!'));
    console.log('');
    console.log(`Please read the ${chalk.cyan('README.md')} file in the kitty dir.`)  
  } catch (error) {
    console.log(chalk.red(error.message));
  }
}