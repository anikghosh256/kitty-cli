const chalk = require('chalk');
const version = require('../package.json').version;

exports.logo = () => {
	console.log(chalk.green(' _    _ _   _         '));
	console.log(chalk.green('| |  (_) | | |        '));
	console.log(chalk.green('| | ___| |_| |_ _   _ '));
	console.log(chalk.green('| |/ / | __| __| | | |'));
	console.log(chalk.green('|   <| | |_| |_| |_| |'));
	console.log(chalk.green('|_|__|__|__|__, |'));
	console.log(chalk.green('                 __/ |'));
	console.log(chalk.green('                |___/ '));
	console.log(chalk.cyan(`                v${version}`));
	console.log('');
};

exports.showHelp = argv => {
	console.log(chalk.gray('Usage: kitty <command> [options]'));
	console.log('');
	console.log(chalk.gray('Commands:'));
	console.log(chalk.gray('  init             Initialize kitty dir.'));
	console.log(chalk.gray('  create [name]    Create a kitty component.'));
	console.log(
		chalk.gray('  clone  [path]    Clone a git repo as component.')
	);
	console.log(chalk.gray('  help             Show help.'));
	console.log('');
	console.log(
		chalk.gray(
			'For more information, run any command with the `--help` flag:'
		)
	);
	console.log(chalk.gray('  kitty create --help'));
	console.log(chalk.gray('  kitty init --help'));
};
