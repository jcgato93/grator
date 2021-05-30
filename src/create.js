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
exports.up = db => {
    db.collection('collection')
    .find(query)
    .toArray();
}


exports.down = db => {
    db.collection('collection')
    .find(query)
    .toArray();
};
    `;

  // create migration file
  fs.writeFile(fileName, content, err => {
    if (err) throw err;
    console.log(chalk.green('File created successfully.'));
  });
};
