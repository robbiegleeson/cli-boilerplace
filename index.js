#!/usr/bin/env node --harmony
const program = require('commander');
const prompt = require('co-prompt');
const co = require('co');
const fsPath = require('fs-path');
var exec = require('child_process').exec;
var child;

program
    .command('create')
    .action(co(function *() {
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
            name: cliName,
            version: '1.0.0',
            description: description,
            main: 'index.js',
            scripts: {
                test: 'echo \'Error: no test specified\' && exit 1'
            },
            keywords: [
                'cli',
                'node'
            ],
            author: author,
            license: 'ISC',
            'bin': {
                [cliName]: './index.js'
            },
            dependencies: {
                commander: '^2.9.0'
            }
        };

        function replacer(name, val) {
            if ( val && val.constructor === RegExp ) {
                return val.toString();
            } else if ( name === 'str' ) {
                return undefined;
            } else {
                return val;
            }
        };

        const file = JSON.stringify(packageJson, replacer, 4);

        fsPath.writeFile(cliName + '/package.json', file, function(err) {
            if (err) {
                throw err;
            }
        });

        child = exec('cd ' + cliName + ' && npm install -g', function (error, stdout, stderr) {
            if (error) {
                console.log(err);
            }
            console.log(stdout);
        });

        child.on('close', function (code) {
            console.log("Done");
        });
}));
