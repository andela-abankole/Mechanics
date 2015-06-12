var Admin      = require('../models/admin.model');
var jwt        = require('jsonwebtoken');  // used to create, sign, and verify tokens
var config     = require('../../config/config');      // get our config file


module.exports = {

  /**
   * [createAdmin: Add new admin]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  createAdmin: function(req, res) {
    var admin = new Admin(req.body);

    // save the user
    admin.save(function(err) {
      if (err) {
        res.send(err)
      } else {
        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Admin saved successfully!',
        });
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
            res.json({ success: false, message: 'Authentication failed. Wrong password. '});
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
              message: 'Enjoy your token!',
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
      admin.username    = req.body.username;
      admin.email       = req.body.email;
      admin.password    = req.body.password;
      admin.admin       = req.body.admin;

      //save the Admin
      admin.save(function(err) {
        if (err){
          res.send(err);
        } else {
          res.json({ message: 'Admin updated successfully' })
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
      _id: req.params.viewAdmin_id
    }, function(err, admin) {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: 'Admin deleted successfully' })
      }
    });
  }
};