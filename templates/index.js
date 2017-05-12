#!/usr/bin/env node --harmony
const program = require('commander');

program
    .command('hello')
    .action(function () {
        console.log('Hello, world!');
    });
