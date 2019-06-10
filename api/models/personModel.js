'use strict';
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
var Schema = mongoose.Schema;

var PersonSchema = new Schema({
  fname: {
    type: String,
    required: 'Enter your first name'
  },
  lname: {
    type: String,
    required: 'Enter your last name'
  },
  photo: {
    type: String
  },
  Created_date: {
    type: Date,
    default: Date.now
  }
});

PersonSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Persons', PersonSchema);