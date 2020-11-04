const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const { createUser } = require('../resources/users/user.memory.repository');

const initialUser = {
  name: 'admin',
  login: 'admin',
  password: 'admin'
};

const connectToDb = callback => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const database = mongoose.connection;

  database
    .on('error', () => {
      console.error('Error while connecting to database');
    })
    .once('open', async () => {
      console.log('Connected to database');
      database.dropDatabase(err => {
        if (!err) console.log('database dropped');
      });
      await createUser(initialUser);
      callback();
    });
};

module.exports = { connectToDb };
