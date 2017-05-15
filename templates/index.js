#!/usr/bin/env node --harmony
const program = require('commander');

program
    .command('hello')
    .description('Welcome to your template!')
    .action(function () {
        console.log('Hello, world!');
        process.exit(0);
    });

program
    .parse(process.argv);
