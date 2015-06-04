// get an instance of mongoose and mongoose.Schema
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports  = mongoose.model('Admin', new Schema ({
  username: {
    type: String,
    required: "Username is required"
  },

  password: {
    type: String,
    required: "Password is required"
  },

  admin: Boolean
}));