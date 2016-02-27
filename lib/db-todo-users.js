var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
  username: String,
  password: String
});

var Users = mongoose.model('users', usersSchema);

module.exports = Users;
