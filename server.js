var express = require('express'),
  app = express(),
  // port = process.env.PORT || 47237,
  portsec = process.env.PORTSEC || 47256,
  mongoose = require('mongoose'),
  Person = require('./api/models/personModel'), //created model loading here
  User = require('./api/models/userModel'), //created model loading here
  cors = require('cors'),
  bodyParser = require('body-parser'),
  helmet = require('helmet'),
  morgan = require('morgan'),
  // http = require('http'),
  https = require('https'),
  fs = require('fs');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://nikolaos:Sp#r0s1967!@vm2:27017/nikolaosdb', { useNewUrlParser: true }); 
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
app.use(helmet());
app.use(morgan('combined'));

const credentials = {
  key: fs.readFileSync('selfsigned.key', 'utf8'),
  cert: fs.readFileSync('selfsigned.crt', 'utf8')
};

// var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

var personsRoutes = require('./api/routes/personRoutes'); //importing route
var usersRoutes = require('./api/routes/userRoutes'); //importing route

personsRoutes(app);
usersRoutes(app);

app.get('/status', (req, res) => {
  console.log('Checking API....')
  res.status(200).send('API OK!');
});


// httpServer.listen(port);
httpsServer.listen(portsec);

console.log('Persons & Users RESTful API server started on https: ' + portsec);
