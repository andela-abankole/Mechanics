// get an instance of mongoose and mongoose.Schema
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
var adminSchema = new Schema ({
  username: { 
    type: String, 
    require: true, 
    required: 'Full Name is required', 
    default: '' 
  },
  password: { 
    type: String, 
    required: 'password is required'
  },
  admin: Boolean,
});

module.exports = mongoose.model('Admin', adminSchema)