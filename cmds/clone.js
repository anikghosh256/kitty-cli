const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const simpleGit = require('simple-git');

const git = simpleGit();

exports.command = 'clone --path [@anikghosh256/kitty-cli]';
exports.desc = 'Clone a git repo as component.';
exports.builder = {
	path: {
		describe: 'Path of the component',
		type: 'string'
	},
	as: {
		describe: 'Name of the component',
		type: 'string'
	},
	f: {
		describe: 'Force clone',
		type: 'boolean',
		default: false
	}
};

async function removeDirIfExists(dirPath) {
	if (fs.existsSync(dirPath)) {
		await fs.promises.rm(dirPath, { recursive: true, force: true });
	}
}

exports.handler = async function (argv) {
	try {
		const { path: repoPath, as, f } = argv;

		if (!repoPath)
			throw new Error('Please provide a path for the component.');

		const projectPath = process.cwd();
		const repoName = repoPath.startsWith('@')
			? repoPath.slice(1)
			: repoPath;
		const githubUrl = `https://github.com/${repoName}.git`;
		const targetPath = path.resolve(
			projectPath,
			'kitty',
			as || repoPath.split('/').pop()
		);

		if (fs.existsSync(targetPath)) {
			if (f) {
				await fs.promises.rm(targetPath, {
					recursive: true,
					force: true
				});
			} else {
				throw new Error('Component already exists!');
			}
		}

		await git.clone(githubUrl, targetPath);

		await Promise.all([
			removeDirIfExists(path.join(targetPath, '.git')),
			removeDirIfExists(path.join(targetPath, '.github'))
		]);

		console.log(chalk.green('Component cloned successfully!'));
	} catch (error) {
		console.error(chalk.red(error.message));
	}
};
