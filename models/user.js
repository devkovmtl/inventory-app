const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 100,
  },
});

UserSchema.virtual('url').get(function () {
  return '/myShop/user/' + this._id;
});

module.exports = model('User', UserSchema);
