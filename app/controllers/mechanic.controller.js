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
      } else{
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
    var mechanic = new Mechanic(req.body);    // create a new instance of the Mechanic model

    // save the mechanic and check for errors
    mechanic.save(function(err) {
      if (err){
        res.send(err);
      } else {
        //res.json({message: 'Mechanic created!'});
        Mechanic.find(function(err, mechanics) {
          if (err) {
            res.send(err)
          }
          else {
            res.status('Mechanic created successfully!').json(mechanics);
          }
        })
      }
    });
  },

  /**
   * [getMechanicById: Retrieves one Mechanic by ID]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  getMechanicById: function(req, res) {
    Mechanic.findById(req.params.mechanic_id, function(err, mechanic) {
      if (err) {
        res.send(err);
      } else{
        res.json(mechanic);
      }
    })
  },

  /**
   * [putMechanicById: updates one mechanic information by ID]
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
      mechanic.updated_at   = req.body.updated_at;

      // save the mechanic
      mechanic.save(function(err) {
        if (err){
          res.send(err);
        } else {
          res.json({ message: 'Mechanic updated!'});
        }
      });

    })
  },

  /**
   * [deleteMechanicById: deletes one mechanic by ID]
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
      } else {
      //res.json({ message: 'Successfully deleted' })
        Mechanic.find(function(err, mechanics) {
          if (err) {
            res.send(err)
          }
          else {
            res.status('Successfully deleted').json( mechanics);
          }
        });
      }
    });
  }
};