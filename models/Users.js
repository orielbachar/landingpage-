var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  lastName: String
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
