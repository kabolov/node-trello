const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const { User } = require('../resources/users/user.model');

const initialUsers = [
  new User({ name: 'Alex', login: 'alex123', password: 'adgweiudjfgsjdhf' }),
  new User({
    name: 'Sasha',
    login: 'sasha123',
    password: 'asodhaisdqdehfshf23823'
  })
];

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
    .once('open', () => {
      console.log('Connected to database');
      database.dropDatabase(err => {
        if (!err) console.log('database dropped');
      });
      User.insertMany(initialUsers);
      callback();
    });
};

module.exports = { connectToDb };
