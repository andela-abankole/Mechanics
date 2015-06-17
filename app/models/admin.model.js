// get an instance of mongoose and mongoose.Schema
var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;
var bcrypt          = require('bcrypt-nodejs');

var validateEmail = function(email) {
 var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 return re.test(email);
};

// set up a mongoose model and pass it using module.exports
var adminSchema = new Schema ({
  fullname:  { 
    type: String, 
    require: true, 
    required: 'Full Name is required', 
    default: '' 
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
  username: { 
    type: String, 
    require: true, 
    unique: true,
    required: 'Full Name is required', 
    default: '' 
  },
  password: { 
    type: String, 
    required: 'password is required'
  },
  admin: Boolean,
  imageurl: {
    type: String,
  },
});

adminSchema.pre('save', function(next){
  var user = this;
  if(!user.isModified('password')){
    return next();
  }
  bcrypt.hash(user.password, null, null, function(err, hash){
    if (err){
      return next(err);
    }
    user.password = hash;
    next();
  });
});

adminSchema.methods.comparePassword = function(password){
  var user = this;
  return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('Admin', adminSchema)