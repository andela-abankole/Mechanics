// scripts/models/model.mechanic.js

var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;
var validateEmail   = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

var mechanicSchema  = new Schema({
  fullname:  { 
    type: String, 
    require: true, 
    required: 'Full Name is required', 
    default: '' 
  },
  skill: String,
  phone_no: { 
     type: String, 
     unique: true, 
     default: '',
     required: 'Phone Number is required',
   },
  email: {
       type:   String,
       trim:   true,
       unique: true,
       default: '',
       required: 'Email address is required',
       validate: [validateEmail, 'Please fill a valid email address'],
       match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
   },
  organisation: String,
  location: String,
  available: Boolean,
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  updated_at: { 
    type: Date, 
    default: Date.now 
  },
});

module.exports = mongoose.model('Mechanic', mechanicSchema)