const fs = require('fs');
const { default: chalk } = require('chalk');

const createFolderIfNotExists = () => {
    const dir = './migrations';

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}

exports.createMigration = (migrationDescription) => {    
    createFolderIfNotExists();

    // create the file name
    const time = Date.now();
    const fileName =  `migrations/${time}_${migrationDescription}.js`;

    // file content
    const content = `const grator = require('grator');
const DB_NAME= 'database_name';


// UP
exports.up = () => {
    const mongo = grator.MongoLib(DB_NAME);
    mongo.connect().then(db => {
        return db
            .collection('collection')
            .find(query)
            .toArray();
    });
}

// DOWN
exports.down = () => {
    const mongo = grator.MongoLib(DB_NAME);
    mongo.connect().then(db => {
        return db
            .collection('collection')
            .find(query)
            .toArray();
    });
};
    `


    // create migration file
    fs.writeFile(fileName, content, (err) => {
        if (err) throw err;
        console.log(chalk.green('File created successfully.'));
    });
};










// // ======== Renombrar un campo

// // UP
// db.books.update(
//     {"reorder": {$exists: true}}, 
//     {$rename:{"reorder":"reordenar"}},
//     false,
//     true
// );

// // DOWN
// db.books.update(
//     {"reordenar": {$exists: true}}, 
//     {$rename:{"reordenar":"reorder"}},
//     false,
//     true
// );


// // ======== Borrar un campo
// // UP
// db.books.updateMany(
//     {"reorder": {$exists: true}},
//     { $unset: { "reorder": "" } }
// )

// // DOWN
// db.books.updateMany(
//     {"test": {$exists: false}},
//     {
//       $set: { "test": "" }
//     }
// )


// // ======= Agregar un campo

