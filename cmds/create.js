const { copy } = require('../helpers/file');
const path = require('path');
const chalk = require('chalk');
const fs = require('fs');
const compile = require('@anikghosh256/compile-template');

exports.command = 'create [moduleName]'
exports.desc = 'Create a kitty component.'

exports.handler = function (argv) {
  try {
    if(argv.moduleName === undefined) {
      throw new Error('Please provide a name for the component.')
    }
    const projectPath = process.cwd();
    const configFilePath = path.resolve(projectPath, `./kitty/${argv.moduleName}/config.json`);

    // check if config file exists
    if(!fs.existsSync(configFilePath)) {
      throw new Error(`Component ${argv.moduleName} does not exist.`)
    }

    const config = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));

    // check source file
    if(config.sourceFile === undefined) {
      throw new Error(`Source file not defined in config file.`)
    }

    // check source file exists
    const sourceFile = path.resolve(projectPath, `./kitty/${argv.moduleName}/${config.sourceFile}`);
    if(!fs.existsSync(sourceFile)) {
      throw new Error(`Source file ${config.sourceFile} does not exist.`)
    }

    // check required fields and make object
    const inputKeys = Object.keys(config.inputs);
    const inputObject = {};
    
    for(let i = 0; i < inputKeys.length; i++) {
      if(argv[inputKeys[i]] === undefined) {
        if(config.inputs[inputKeys[i]].default === undefined) {
          throw new Error(`Please provide a value for ${inputKeys[i]}.`)
        }
        argv[inputKeys[i]] = config.inputs[inputKeys[i]].default;
      }
      inputObject[inputKeys[i]] = argv[inputKeys[i]];
    }

    // check output folder or create if not exist
    const outputFolder = path.resolve(projectPath, config.dir);
    if(!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });
    }

    // compile template
    const compiled = compile(sourceFile, inputObject);

    // write to output file
    const outputFile = path.resolve(projectPath, `${config.dir}/${argv.moduleName}.${config.outputExtension}`);
    fs.writeFileSync(outputFile, compiled);

    console.log(chalk.green('Component created successfully!'));

  } catch (error) {
    console.log(chalk.red(error.message));
  }
}
