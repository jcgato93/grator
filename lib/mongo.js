const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);


class MongoLib {
  constructor(dbName) {
    const DB_NAME = dbName;
    let MONGO_URI = '';
    if (config.mongoUri !== ''){
      MONGO_URI = config.mongoUri;
    } else {
      MONGO_URI = USER && PASSWORD ?
                      `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`
                      : `mongodb+srv://${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;
    }
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
    this.dbName = DB_NAME;
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect(err => {
          if (err) {
            reject(err);
          }

          console.log('Connected succesfully to mongo');
          resolve(this.client.db(this.dbName));
        });
      });
    }

    return MongoLib.connection;
  }

  // getAll(collection, query) {
  //   return this.connect().then(db => {
  //     return db
  //       .collection(collection)
  //       .find(query)
  //       .toArray();
  //   });
  // }
}

module.exports = MongoLib;