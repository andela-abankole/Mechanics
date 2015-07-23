var Mechanic      = require('../models/mechanic.model');
var cloudinary    = require('cloudinary');

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
      if (err) {
        res.send(err);
      } else{
        res.json(mechanics);
      }
    });
  },

  createMechanic: function(req, res, next) {
    if (req.files && req.files.file) {
      var path        = req.files.file.path;
      cloudinary.uploader.upload(path, function(response){
        req.imageurl  = response.secure_url;
        next();
      },{ width: 400, height: 400, crop: "thumb", allowed_formats: ['jpg', 'gif', 'png'], format: "png"})
    } else {
      next();
    }
  },

  /**
   * [createMechanic: creates a new mechanic info]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  createdbMechanic: function(req, res) {
    var mechanicSave = JSON.parse(req.body.data);
    var mechanic = new Mechanic(mechanicSave);    // create a new instance of the Mechanic model
    mechanic.imageurl = req.imageurl;

    // save the mechanic and check for errors
    mechanic.save(function(err, response) {
      if (err) {
        res.send(err);
      } else {
        // return the information including token as JSON
        res.json({
          response: response,
          success: true,
          message: 'Mechanic created!',
        });
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
    var mechanicUpdate    = JSON.parse(req.body.data)
    var updated_at = Date.now();

    // use out mechanic model to find the mechanic we want
    Mechanic.findById(req.params.mechanic_id, function(err, mechanic) {
      if (err) {
        res.send(err);
      }
      
      // update the mechanic info
      mechanic.fullname     = mechanicUpdate.fullname;    
      mechanic.skill        = mechanicUpdate.skill; 
      mechanic.phone_no     = mechanicUpdate.phone_no; 
      mechanic.email        = mechanicUpdate.email;
      mechanic.organisation = mechanicUpdate.organisation;
      mechanic.location     = mechanicUpdate.location;
      mechanic.available    = mechanicUpdate.available;
      mechanic.updated_at   = updated_at;
      if (req.imageurl) {
        mechanic.imageurl = req.imageurl;
      };  

      // save the mechanic
      mechanic.save(function(err) {
        if (err) {
          res.send(err);
        } else {
          res.json({ success: true, message: 'Mechanic updated successfully' })
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
        res.json({ 
          success: true,
          message: 'Successfully deleted' 
        });
      }
    });
  }
};