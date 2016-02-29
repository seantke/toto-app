var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
  username: {type: String, required:true, unique:true},
  password: {type: String, required:true},
  sessionKey: {type:String}
});

var Users = mongoose.model('users', usersSchema);

module.exports = Users;
