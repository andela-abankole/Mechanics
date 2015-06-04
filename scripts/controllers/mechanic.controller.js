var Mechanic      = require('../models/mechanic.model');

module.exports    = {
  getApi: function(req, res) {
    res.json({ message: 'hooray! welcome to our api'});
  },

  /**
   * [getAllMechanics: returns all mechanics]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  getAllMechanics: function(req, res) {
    Mechanic.find(function(err, mechanics) {
      if (err){
        res.send(err);
      }
      else{
        res.json(mechanics);
      }
    });
  },

  /**
   * [createMechanic: creates a new mechanic info]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  createMechanic: function(req, res) {
    var mechanic = new Mechanic();    // create a new instance of the Mechanic model

    // set the mechanic name (comes from the request)
    mechanic.fullname     = req.body.fullname;    
    mechanic.skill        = req.body.skill; 
    mechanic.phone_no     = req.body.phone_no; 
    mechanic.email        = req.body.email;
    mechanic.organisation = req.body.organisation;
    mechanic.location     = req.body.location;
    mechanic.available    = req.body.available;

    // save the mechanic and check for errors
    mechanic.save(function(err) {
      if (err){
        res.send(err);
      }
      else {
        res.json({message: 'Mechanic created!'});
      }
    });
  },

  /**
   * [getMechanicById: Get one Mechanic by unique ID]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  getMechanicById: function(req, res) {
    Mechanic.findById(req.params.mechanic_id, function(err, mechanic) {
      if (err) {
        res.send(err);
      }
      else{
        res.json(mechanic);
      }
    })
  },

  /**
   * [putMechanicById: updates one mechanic info by unique ID]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  putMechanicById: function(req, res) {

    // use out mechanic model to find the mechanic we want
    Mechanic.findById(req.params.mechanic_id, function(err, mechanic) {
      if (err) {
        res.send(err);
      }
      
      // update the mechanic info
      mechanic.fullname     = req.body.fullname;    
      mechanic.skill        = req.body.skill; 
      mechanic.phone_no     = req.body.phone_no; 
      mechanic.email        = req.body.email;
      mechanic.organisation = req.body.organisation;
      mechanic.location     = req.body.location;
      mechanic.available    = req.body.available;

      // save the mechanic
      mechanic.save(function(err) {
        if (err){
          res.send(err);
        }
        else {
          res.json({ message: 'Mechanic updated!'});
        }
      });

    })
  },

  /**
   * [deleteMechanicById: deletes one mechanic by unique ID]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  deleteMechanicById: function(req, res) {
    Mechanic.remove({
      _id: req.params.mechanic_id
    }, function(err, mechanic) {
      if (err) {
        res.send(err);
      }
      else {
      res.json({ message: 'Successfully deleted' });
      }
    });
  }

};