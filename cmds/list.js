const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const { logo } = require('../helpers/print');

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
    logo();
    console.log(chalk.green('Kitty components:'));
    console.log('');
    for(let i = 0; i < kittyDir.length; i++) {
      // check if dir
      if(fs.lstatSync(path.resolve(projectPath, `./kitty/${kittyDir[i]}`)).isDirectory()) {
        console.log(chalk.cyan(kittyDir[i]));
      }
    }

  } catch (error) {
    console.log(chalk.red(error.message));
  }
}