var express        = require('express');
var router         = express.Router();
var mechanic_Ctrl  = require('../controllers/mechanic.controller');

module.exports = function (router) {

  // test route to make sure everything is working (accessed at GET http://localhost:3000/api)
  router.get('/', mechanic_Ctrl.getApi);

  router.post('/upload', mechanic_Ctrl.upload);

  // on routes that end in /mechanics
  router.route('/mechanics')
    // create a mechanic (accessed at POST http://localhost:3000/api/mechanics)
    .post(mechanic_Ctrl.createMechanic)

    //get all the mechanics (accessed at GET http://localhost:3000/api/mechanics)
    .get(mechanic_Ctrl.getAllMechanics);

  // on routes that end in /mechanics/:mechanic_id
  router.route('/mechanics/:mechanic_id')
    // get the mechanic with that id (accessed at GET http://localhost:3000/api/mechanics/:mechanic_id)
    .get(mechanic_Ctrl.getMechanicById)


    // update the mechanic with this id (accessed at PUT http://localhost:3000/api/mechanics/:mechanic_id)
    .put(mechanic_Ctrl.putMechanicById)

    // deletes the mechanic with this id (accessed at PUT http://localhost:3000/api/mechanics/:mechanic_id)
    .delete(mechanic_Ctrl.deleteMechanicById);
};