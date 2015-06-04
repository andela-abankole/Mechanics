// scripts/models/model.mechanic.js

var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;

var MechanicSchema  = new Schema({
  fullname: String,
  skill: String,
  phone_no: Number,
  email: String,
  available: Boolean,
  location: String,
  organisation: String
});

module.exports = mongoose.model('Mechanic', MechanicSchema)