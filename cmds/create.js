const path = require('path');
const chalk = require('chalk');
const fs = require('fs');
const compile = require('@anikghosh256/compile-template');

exports.command = 'create [moduleName]';
exports.desc = 'Create a kitty component.';

exports.handler = function (argv) {
	try {
		const { moduleName, name } = argv;
		if (!moduleName)
			throw new Error('Please provide a name for the component.');
		if (!name)
			throw new Error(
				'Please provide a name for the component instance.'
			);

		const projectPath = process.cwd();
		const configFilePath = path.resolve(
			projectPath,
			`./kitty/${moduleName}/config.json`
		);
		const config = JSON.parse(
			validateFile(
				configFilePath,
				`Component ${moduleName} does not exist.`
			)
		);
		const inputObject = prepareInputs(config.inputs, argv);

		const outputFolder = path.resolve(
			projectPath,
			config.dir.replace('${name}', name)
		);
		ensureDirExists(outputFolder);

		config.type === 'folder'
			? processFolder(
					config,
					inputObject,
					argv,
					projectPath,
					configFilePath
			  )
			: processSingleFile(config, inputObject, argv, projectPath);

		console.log(chalk.green('Component created successfully!'));
		if (config.successMessage)
			console.log(
				chalk.green(compile(null, inputObject, config.successMessage))
			);
	} catch (error) {
		console.error(chalk.red(error.message));
	}
};

function validateFile(filePath, errorMessage) {
	if (!fs.existsSync(filePath)) throw new Error(errorMessage);
	return fs.readFileSync(filePath, 'utf8');
}

function prepareInputs(inputs = {}, argv) {
	return Object.keys(inputs).reduce((acc, key) => {
		acc[key] =
			argv[key] !== undefined
				? argv[key]
				: inputs[key]?.default ??
				  (() => {
						throw new Error(`Please provide a value for ${key}.`);
				  })();
		return acc;
	}, {});
}

function ensureDirExists(dir) {
	fs.existsSync(dir) || fs.mkdirSync(dir, { recursive: true });
}

function processFolder(config, inputObject, argv, projectPath, configFilePath) {
	const sourceFolder = path.resolve(
		projectPath,
		`./kitty/${argv.moduleName}`
	);
	const outputFolder = path.resolve(
		projectPath,
		config.dir.replace('${name}', argv.name)
	);
	const files = walkSync(sourceFolder);

	files.forEach(file => {
		if (file === configFilePath) return;
		const relativePath = path.relative(sourceFolder, file);
		const fileExtension = path.extname(file).slice(1);
		const normalizedRelativePath = relativePath.replace(/\\/g, '/');
		let outputFilePath = path.resolve(outputFolder, relativePath);

		if (config.mapFileName[normalizedRelativePath]) {
			const mappedFileName = compile(
				null,
				inputObject,
				config.mapFileName[normalizedRelativePath]
			);
			outputFilePath = path.resolve(
				outputFolder,
				path.dirname(relativePath),
				mappedFileName
			);
		}

		ensureDirExists(path.dirname(outputFilePath));
		!config.extensions ||
		config.extensions.length === 0 ||
		config.extensions.includes(fileExtension)
			? fs.writeFileSync(outputFilePath, compile(file, inputObject))
			: fs.copyFileSync(file, outputFilePath);
	});
}

function processSingleFile(config, inputObject, argv, projectPath) {
	const sourceFile = path.resolve(
		projectPath,
		`./kitty/${argv.moduleName}/${config.sourceFile}`
	);
	validateFile(
		sourceFile,
		`Source file ${config.sourceFile} does not exist.`
	);

	let outputFilePath = path.resolve(
		projectPath,
		`${config.dir}/${argv.name}.${config.outputExtension}`
	);
	if (config.outputFile) {
		outputFilePath = path.resolve(
			projectPath,
			`${config.dir}/${compile(null, inputObject, config.outputFile)}`
		);
	}
	fs.writeFileSync(outputFilePath, compile(sourceFile, inputObject));
}

function walkSync(dir) {
	return fs.readdirSync(dir).flatMap(file => {
		const filePath = path.join(dir, file);
		return fs.statSync(filePath).isDirectory()
			? walkSync(filePath)
			: [filePath];
	});
}
