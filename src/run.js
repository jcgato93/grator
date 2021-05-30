/* eslint-disable no-console */
/* eslint-disable radix */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const { default: chalk } = require('chalk');
const MongoLib = require('../lib/mongo');

const getMigrationsToExecute = async (mongoClient, migrations) => {
  try {
    let migrationsExecuted = await mongoClient.collection('migrations').find().toArray();

    migrationsExecuted = migrationsExecuted.map(migration => migration.id);

    if (migrationsExecuted.length === 0) return migrations;

    const migrationsToExecute = new Array(0);
    migrations.forEach(migration => {
      if (!migrationsExecuted.includes(migration)) {
        migrationsToExecute.push(migration);
      }
    });

    return migrationsToExecute;
  } catch (error) {
    throw new Error(error.message);
  }
};

const runMigration = async (file, mongoClient, migration) => {
  // require file
  const path = `${process.env.PWD}/migrations/${file}`;
  const migrationToRun = require(path);

  // run migration
  console.log(chalk.yellowBright(`Running migration ${file}`));
  const promiseInsertMigration = mongoClient
    .collection('migrations')
    .insertOne({ id: migration, created_at: new Date() });
  const promiseRunMigration = migrationToRun.up(mongoClient);

  return Promise.all([promiseInsertMigration, promiseRunMigration]);
};

exports.runMigrations = () => {
  const dir = './migrations';

  fs.readdir(dir, async (err, files) => {
    // handling error
    if (err) {
      console.log(`Unable to scan directory: ${err.message}`);
      return;
    }

    const numbers = files.map(file =>
      parseInt(file.split('_')[0])
    );

    const mongoInstance = new MongoLib();
    const mongoClient = await mongoInstance.connect();

    // sort migrations
    const migrations = numbers.sort((a, b) => a - b);

    const migrationsToExecute = await getMigrationsToExecute(mongoClient, migrations);

    if (migrationsToExecute.length === 0) {
      console.log(chalk.greenBright('No missing migrations'));
      await mongoInstance.client.close(true);
      return;
    }

    // run
    const promises = migrationsToExecute.map(async migration => {
      // find the file
      const file = files.find(x => x.includes(`${migration}_`));
      await runMigration(file, mongoClient, migration);
    });

    Promise.all(promises)
      .then(() => {
        console.log(chalk.green('All migrations were successfull!!!'));
      })
      .finally(async () => {
        await mongoInstance.client.close(true);
      });
  });
};
