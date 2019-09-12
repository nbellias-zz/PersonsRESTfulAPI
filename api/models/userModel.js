'use strict';
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: {
    type: String,
    required: 'Enter your first name'
  },
  lastName: {
    type: String,
    required: 'Enter your last name'
  },
  gender: {
    type: String,
    required: 'Select your gender'
  },
  email: {
    type: String,
    required: 'Enter your email'
  },
  address: {
    type: String,
    required: 'Enter your address'
  },
  phone: {
    type: String,
    required: 'Enter your phone'
  },
  photo: {
    type: String
  },
  userName: {
    type: String,
    required: 'Enter your user name'
  },
  passWord: {
    type: String,
    required: 'Enter your password'
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  appKey: {
    type: String
  }
});

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Users', UserSchema);
