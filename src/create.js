/* eslint-disable no-console */
const fs = require('fs');
const { default: chalk } = require('chalk');

const createFolderIfNotExists = () => {
  const dir = './migrations';

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

exports.createMigration = migrationDescription => {
  createFolderIfNotExists();

  // create the file name
  const time = Date.now();
  const fileName = `migrations/${time}_${migrationDescription}.js`;

  // file content
  const content = `
exports.up = async db => {
  await db.collection('collection')
    .insertOne({ field: 'value'});
};


exports.down = async db => {
  await db.collection('collection')
    .deleteMany();
};
    `;

  // create migration file
  fs.writeFile(fileName, content, err => {
    if (err) throw err;
    console.log(chalk.green('File created successfully.'));
  });
};
