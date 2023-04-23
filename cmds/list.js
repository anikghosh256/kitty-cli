const path = require('path');
const chalk = require('chalk');

exports.command = 'list'
exports.desc = 'List all kitty components.'

exports.handler = function () {
  try {   
    const projectPath = process.cwd();
    
    // check if kitty dir exists
    if(!fs.existsSync(path.resolve(projectPath, './kitty'))) {
      throw new Error('Kitty dir does not exist. Please run "kitty init" to initialize kitty dir.')
    }

    const kittyDir = fs.readdirSync(path.resolve(projectPath, './kitty'));
    console.log(chalk.green('Kitty components:'));
    console.log('');
    for(let i = 0; i < kittyDir.length; i++) {
      console.log(chalk.cyan(kittyDir[i]));
    }

    console.log('');
  } catch (error) {
    console.log(chalk.red(error.message));
  }
}