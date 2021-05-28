const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

class MongoLib {
  constructor() {    
    let MONGO_URI = '';
    if (config.mongoUri !== ''){
      MONGO_URI = config.mongoUri;
    } else {
      MONGO_URI = USER && PASSWORD ?
                      `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`
                      : `mongodb://${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;
    }
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true,  useUnifiedTopology: true  });
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

  async close(){
    if (!MongoLib.connection) {
      await this.client.close();
    }
  }
}

module.exports = MongoLib;