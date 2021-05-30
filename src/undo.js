/* eslint-disable no-console */
/* eslint-disable radix */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const { default: chalk } = require('chalk');
const MongoLib = require('../lib/mongo');

const getMigrationToExecute = async mongoClient => {
  try {
    let migrationsExecuted = await mongoClient.collection('migrations').find().toArray();

    migrationsExecuted = migrationsExecuted
                          .map(migration => migration.id)
                          .sort((m1, m2) => m2 - m1);

    if (migrationsExecuted.length === 0) return 0;    

    return [
      migrationsExecuted[migrationsExecuted.length - 1]
    ];
  } catch (error) {
    throw new Error(error.message);
  }
};

const undoMigration = async (file, mongoClient, migration) => {
  // require file
  const path = `${process.env.PWD}/migrations/${file}`;
  const migrationToRun = require(path);

  // run migration
  console.log(chalk.yellowBright(`Running migration ${file}`));
  const promiseInsertMigration = mongoClient
    .collection('migrations')
    .deleteOne({ id: migration });
  const promiseRunMigration = migrationToRun.down(mongoClient);

  return Promise.all([promiseInsertMigration, promiseRunMigration]);
};

exports.undoMigration = () => {
  const dir = './migrations';

  fs.readdir(dir, async (err, files) => {
    // handling error
    if (err) {
        console.log(`Unable to scan directory: ${err}`);
        return
    }

    // Mongo instance
    const mongoInstance = new MongoLib();
    const mongoClient = await mongoInstance.connect();


    const migrationToExecute = await getMigrationToExecute(mongoClient);

    if (migrationToExecute.length === 0) {
      console.log(chalk.greenBright('No migrations to undo'));
      await mongoInstance.client.close(true);
      return
    }

    // run
    const promises = migrationToExecute.map(async migration => {
      // find the file
      const file = files.find(x => x.includes(`${migration}_`));
      await undoMigration(file, mongoClient, migration);
    });

    Promise.all(promises)
      .then(() => {        
        console.log(chalk.green('Last migration was undo'));
      })
      .finally(async () => {
        await mongoInstance.client.close(true);
      });
  });
};
