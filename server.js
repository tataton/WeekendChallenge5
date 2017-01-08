var port = process.env.PORT || 8080;
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Set up mongdb connection
var connStr = 'mongodb://localhost:27017/pets';
var mongoDB = mongoose.connect(connStr).connection;

mongoDB.on('error', function(err){
  console.log('mongo connection error', err);
}); // end on

mongoDB.once('open', function(){
  console.log('mongo connection open');
}); // end open

app.listen(port, function() {
  console.log('Server listening on port ', port);
}); // end listen

// Single router for all CRUD methods
var pets = require('./routers/pets');
app.use('/pets', pets);
