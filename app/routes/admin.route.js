var express     = require('express');
var router      = express.Router();
var Admin_Ctrl  = require('../controllers/admin.controller')
var jwt         = require('jsonwebtoken');  // used to create, sign, and verify tokens
var config      = require('../../config');      // get our config file
var verifyToken = require('../verifyToken');

module.exports  = function (router) {

  // Registers a new administrator (accessed at GET http://localhost:8080/api/admin/register)
  router.route('/admin/register')
    .post(Admin_Ctrl.createAdmin)

  // Authenticates the user details and generates a token (accessed at GET http://localhost:8080/api/authenticate)
  router.route('/authenticate')
    .post(Admin_Ctrl.authenticate);
  

  // route middleware to verify token
  router.use(verifyToken.verify);
  
  // retrieves all admin (accessed at GET http://localhost:8080/api/admin)
  router.route('/admin')
    .get(Admin_Ctrl.getAllAdmin); 

  // on routes that end in /mechanics/:viewAdmin_id
  router.route('/admin/:viewAdmin_id')
    // get the admin with ID (accessed at GET http://localhost:8080/api/admin/:viewAdmin_id)
    .get(Admin_Ctrl.getAdminById)

    // updates the admin with ID (accessed at GET http://localhost:8080/api/admin/:viewAdmin_id)
    .put(Admin_Ctrl.putAdminById)

    // deletes the admin with ID (accessed at GET http://localhost:8080/api/admin/:viewAdmin_id)
    .delete(Admin_Ctrl.deleteAdminById);
};