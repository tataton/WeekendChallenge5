var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Pet = require('../models/petmodel');

router.get('/', function(req, res) {
  // Retrieves all pets from the database.
  console.log('GET route hit.');
  Pet.find({}, function(err, allpets) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log(allpets);
      res.status(200).send(allpets);
    }
  }); // end Pet.find
}); // end GET route

router.post('/', function(req, res) {
  console.log('POST route hit.', req.body);
  // Assemble pet to add via mongoose.
  var newPet = new Pet({
    name: req.body.name,
    animal: req.body.animal,
    years_old: req.body.years_old,
    imgurl: req.body.imgurl
  });
  // Save the pet in the database.
  newPet.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Added new pet.');
      res.sendStatus(201);
    }
  });
});

router.delete('/:id', function(req, res){
  console.log('Index to be deleted: ', req.params.id);
  Pet.remove({_id: req.params.id}, function(err) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    } // end else
  }); // end find
});

module.exports = router;
