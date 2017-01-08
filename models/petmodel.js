var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var petSchema = new Schema({
  name: String,
  animal: String,
  years_old: Number,
  imgurl: String
});

var Petmodel = mongoose.model('pets', petSchema);

module.exports = Petmodel;
