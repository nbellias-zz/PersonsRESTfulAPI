var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Person = require('./api/models/personModel'), //created model loading here
  cors = require('cors'),
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/nikolaosdb', { useNewUrlParser: true }); 
mongoose.set('useFindAndModify', false);

//enables cors
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var personsRoutes = require('./api/routes/personRoutes'); //importing route
personsRoutes(app);

app.listen(port);

console.log('Persons RESTful API server started on: ' + port);