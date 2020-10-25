const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const User = require('../resources/users/user.model');

const users = [
  new User({ name: 'user1', login: 'admin', password: 'admin' }),
  new User({ name: 'user2', login: 'login', password: 'passwordfghdfhg' })
];

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    User.insertMany(users);
    cb();
  });
};

module.exports = { connectToDB };
