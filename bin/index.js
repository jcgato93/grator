#!/usr/bin/env node
const { default: chalk } = require('chalk');
const yargs = require('yargs');
const { createMigration } = require('../src/create');
const { rollbackMigration } = require('../src/rollback');
const { runMigrations } = require('../src/run');
const MongoLib = require('../lib/mongo');


const options = yargs
 .usage("Usage: -n <name>")
 .option("r", { alias: "run", describe: "Run migrations", type: "string", demandOption: false })
 .option("c", { alias: "create", describe: "Create new migration fiel", type: "string", demandOption: false })
 .option("u", { alias: "undo", describe: "undo last migration", type: "string", demandOption: false })
 .argv;

console.log(options);
if ('run' in options) {
    console.log(chalk.green('Running migrations...'));
    runMigrations();
}

if (options.create) {
    console.log(chalk.green('Creating migration file...'));
    createMigration(options.create);
}

if ('undo' in options) {
    chalk.green('Rolling back');
    rollbackMigration();
}

module.exports= {
    MongoLib
}