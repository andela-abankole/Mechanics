var express         = require('express');
var router          = express.Router();
var Mechanic_cntrl  = require('../controllers/mechanic.controller');

module.exports = function (router) {

  // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
  router.get('/', Mechanic_cntrl.getApi);

  // on routes that end in /mechanics
  router.route('/mechanics')
    // create a mechanic (accessed at POST http://localhost:8080/api/mechanics)
    .post(Mechanic_cntrl.createMechanic)

    //get all the mechanics (accessed at GET http://localhost:8080/api/mechanics)
    .get(Mechanic_cntrl.getAllMechanics);


  // on routes that end in /mechanics/:mechanic_id
  router.route('/mechanics/:mechanic_id')
    // get the mechanic with that id (accessed at GET http://localhost:8080/api/mechanics/:mechanic_id)
    .get(Mechanic_cntrl.getMechanicById)


    // update the mechanic with this id (accessed at PUT http://localhost:8080/api/mechanics/:mechanic_id)
    .put(Mechanic_cntrl.putMechanicById)

    // delete the mechanic with this id (accessed at PUT http://localhost:8080/api/mechanics/:mechanic_id)
    .delete(Mechanic_cntrl.deleteMechanicById);

};