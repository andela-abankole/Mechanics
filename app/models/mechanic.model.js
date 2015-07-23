// app/models/model.mechanic.js

var mongoose        = require('mongoose'),
    Schema          = mongoose.Schema,
    validateEmail   = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
},
    date            = Date.now();

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
  imageurl: {
    type: String,
    default: 'images/default.png',
  },
  created_at: { 
    type: Date, 
    default: date
  },
  updated_at: { 
    type: Date, 
    default: date
  },
});

module.exports = mongoose.model('Mechanic', mechanicSchema)