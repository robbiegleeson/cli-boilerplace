#!/usr/bin/env node --harmony
const program = require('commander');
const prompt = require('co-prompt');
const co = require('co');
const fsPath = require('fs-path');

program
    .command('create')
    .action(co(function *() {
        // console.log(__dirname);
        const cliName = yield prompt('Name: ');

        fsPath.mkdir(cliName, function(err) {
            if (err) {
                throw err;
            }
        })

        fsPath.copy(__dirname + '/templates/index.js', cliName + '/', function(err) {
            if (err) {
                throw err;
            }
        })

        const description = yield prompt('Packae description: ');
        const author = yield prompt('Author: ');

        const packageJson = {
          "name": cliName,
          "version": "1.0.0",
          "description": description,
          "main": "index.js",
          "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1"
          },
          "keywords": [
            "cli",
            "node"
          ],
          "author": author,
          "license": "ISC",
          "bin": {
            "cli": "./index.js"
          },
          "dependencies": {
            "commander": "^2.9.0"
          }
        }

        fsPath.writeFile(cliName + '/package.json', JSON.stringify(packageJson), function(err) {
            if (err) {
                throw err
            }
        })
    }));
