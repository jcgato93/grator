const fs = require('fs');
const { default: chalk } = require('chalk');

exports.runMigrations = () => {
    const dir = './migrations';

     fs.readdir(dir, (err, files) => {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        let numbers = files.map(file => {
            // TODO: verificar que migraciones ya se corrieron en la base de datos
            // solo retornar los numeros de las migracioens faltantes
            return parseInt(file.split('_')[0]);
        });

        let migrations = numbers.sort((a, b) => a-b);
        migrations.forEach(migration => {
            // find the file
            let file = files.find(x  => x.includes(`${migration}_`));            
            
            
            // require file
            const path = `${process.env.PWD}/migrations/${file}`;
            const migrationToRun = require(path);

            // run migration
            console.log(chalk.yellowBright(`Running migration ${file}`));
            migrationToRun.up();
        })
    });
};

