var Admin      = require('../models/admin.model');
var cloudinary = require('cloudinary');
var jwt        = require('jsonwebtoken');  // used to create, sign, and verify tokens
var config     = require('../../config/config');      // get our config file


module.exports = {

  /**
   * [upload: Upload Admin Image to cloudinary]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  upload: function(req, res, next) {
    if(req.files.file) {
      var path        = req.files.file.path;
      cloudinary.uploader.upload(path, function(response){
        req.imageurl  = response.secure_url;
        next();
      },{ width: 400, height: 400, crop: "thumb", allowed_formats: ['jpg', 'gif', 'png'], format: "png"})
    }
  },

  /**
   * [createAdmin: Add new admin]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  createAdmin: function(req, res) {
    var adminSave   = JSON.parse(req.body.data);
    var admin       = new Admin(adminSave);
    admin.imageurl  = req.imageurl;

    // save the user
    admin.save(function(err, response) {
      if (err) {
        res.json(err);
      } else {
        return res.json({
               response: response,
               success: true,
               message: 'Admin Successfully created!',});
      };
    });
  },

  /**
   * [authenticate: verify admin information generates a token]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]} 
   */
  authenticate: function(req, res) {
    Admin.findOne ({
      username: req.body.username
    }, function(err, admin) {
        if (err) {
          throw err;
        }

        if (!admin) {
          res.json({ success: false, message: 'Authentication failed. Admin not found.' });
        } else if (admin) {
            var validPassword = admin.comparePassword(req.body.password);
            console.log("password", validPassword);
            if (!validPassword) {
              res.json({ success: false, message: 'Authentication failed. Wrong password.'});
            } else {
              /**
               * if user is found and password is right
               * create a token
               */
              var token = jwt.sign(admin, config.secret, {
                expiresInMinutes: 1440  // expires in 24 hours
              });

              // return the information including token as JSON
              res.json({
                success: true,
                message: 'Successfully Signed in!',
                token: token,
                adminid: admin
              });
            };
          };
       }
    );
  },

  /**
   * [getAllAdmin: returns all registered admin]
   * @param  {[type]}
   * @param  {[type]}
   * @return {[void]}
   */
  getAllAdmin: function(req, res) {
    Admin.find(function(err, viewAdmin) {
      if (err){
        res.send(err);
      } else {
        res.json(viewAdmin);
      }
    })
  },

  /**
   * [getAdminById: Retrieves one admin by ID]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  getAdminById: function(req, res) {
    Admin.findById(req.params.viewAdmin_id, function(err, admin) {
      if (err) {
        res.send(err);
      } else {
        res.json(admin)
      }
    });
  },

  /**
   * [putAdminById: updates one admin infomation by ID]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  putAdminById: function(req, res) {
    Admin.findById(req.params.viewAdmin_id, function(err, admin) {
      if (err) {
        res.send(err);
      }

      //update the admin info
      admin.fullname    = req.body.fullname;
      admin.email       = req.body.email;
      admin.username    = req.body.username;
      admin.password    = req.body.password;
      admin.admin       = req.body.admin;

      //save the Admin
      admin.save(function(err) {
        if (err){
          res.send(err);
        } else {
          //res.json({ message: 'Admin updated successfully' })
          res.json({ success: true, message: 'Admin updated successfully'});
        }
      });

    });
  },

  /**
   * [deleteAdminById: deletes one admin by ID]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  deleteAdminById: function(req, res) {
    Admin.remove({
      _id: req.params.viewAdmin_id,
      token: req.params.token
    }, function(err, admin) {
      if (err) {
        res.send(err);
      } else {
        res.json({ success: true, message: 'Admin deleted successfully' })
      }
    });
  }
};