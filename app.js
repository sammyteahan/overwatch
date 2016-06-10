var express = require('express'),
  helpers = require('./utils/helpers'),
  routes = require('./utils/routes.js'),
  bodyParser = require('body-parser'),
  sock = require('socket.io'),
  rethinkdb = require('rethinkdb'),
  config = require('./config'),
  cors = require('cors'),
  app = express();


/**
* @desc configuration
*/
app.use(bodyParser.json());
app.set('view engine', 'pug');
app.set('views', __dirname + '/client');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/client'));


/**
* @desc request middleware
*/
app.use(function (req, res, next) {
  console.log('A request was sent', req.body);
  next();
});

/**
 * @desc endpoints
 */
app.get('/', function (req, res) {
  res.render('index');
});

app.post('/message', function (req, res) {
  var message = req.body.message
  res.status(200).json(message);
});

app.listen(process.env.PORT || config.port, function() {
  console.log('getting jiggy on port ' + (process.env.PORT || config.port));
});
