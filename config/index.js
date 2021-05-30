const dotenv = require('dotenv');

dotenv.config();

const config = {
  mongoUri: process.env.MONGO_URI || '',
  dbUser: process.env.MONGO_DB_USER,
  dbPassword: process.env.MONGO_DB_PASSWORD,
  dbHost: process.env.MONGO_DB_HOST,
  dbName: process.env.MONGO_DB_NAME,
};

module.exports = { config };
