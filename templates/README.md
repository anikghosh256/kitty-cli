# kitty-cli module

In this directory every folder is a module. Each module has a `config.json` file which contains the configuration for the module. For example you will find a folder named `example` which contains a `config.json` file and a `example.kitty` file. The `config.json` file contains the configuration for the module and the `example.kitty` file contains the template for the module.

## How to create a module

To create a module you have to run the following command:

```bash
kitty-cli create <module-name> --name <output-file-name>
```

You can also pass parameters to the command. For example:

```bash
kitty-cli create <module-name> --name "userModule" --author "John Doe" --email "john@doe.com"
```

## How to create a module template

To create a module template you have to create new folder in kitty folder with module name. For example if you want to create a module named `example` you have to create a folder named `example` in the kitty folder. Then you have to create a `config.json` file in the `example` folder. The `config.json` file should contain the following:

```json
{
	"type": "folder", // set type if you ar making a folder
	"mapFileName": {
		"hello.kitty": "hello.js",
		"lib/index.kitty": "index.js"
	}, // it support file map you can map and rename file otherwise it will follow original name and only work when type == "folder"
	"outputExtension": "js", // not required if "type" == "folder"
	"outputFile": "example.js", // not required if "type" == "folder"
	"sourceFile": "./example.kitty", // not required if "type" == "folder"
	"dir": "./${name}", // you can set variable for output path
	"inputs": {
		"name": {},
		"message": {
			"default": "hi"
		}
	},
	"extensions": ["js", "css", "php"] // Only compile files matching these extensions (applies when "type" == "folder")
}
```

The `outputExtension` is the extension of the output file. The `sourceFile` is the path to the template file. The `dir` is the directory where the output file will be created. The `inputs` is an object which contains the inputs for the template. The key of the object is the name of the input and the value is an object which contains the default value of the input you can leave it empty if you don't want to set a default value.

Then you have to create a template file. The template file should have the same name as the `sourceFile` in the `config.json` file. For example if the `sourceFile` is `./example.kitty` the template file should be named `example.kitty`. The template file will contain your code and some variables. The variables will be replaced with the inputs you passed to the command. For example if you have a variable named `name` in your template file and you pass `John` as the value of the `name` variable the `name` variable in the template file will be replaced with `John`.

```js
// example.kitty
console.log('Hello ${name}');
```

```bash
kitty-cli create example --name "John"
```

The output will be:

```js
// John.js
console.log('Hello John');
```

Note: The `name` variable is a special variable. It will also be used to name the output file. If you don't pass the `name` variable to the command it will show an error.
