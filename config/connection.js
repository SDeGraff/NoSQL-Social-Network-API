const { connect, connection } = require('mongoose');

const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nosql-social-network-api';

connect(connectionString, {
  useUnifiedTopology: true,
});

module.exports = connection;
