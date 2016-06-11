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
app.use(helpers.createConnection);


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
app.route('/statuses').get(routes.get);
app.route('/statuses/:id').get(routes.getOne);
app.route('/statuses').post(routes.create);

/**
* @todo check to see if this works
*/
app.get('/', (req, res) => res.render('index'));

app.use(helpers.closeConnection);

app.listen(process.env.PORT || config.port, function() {
  console.log('getting jiggy on port ' + (process.env.PORT || config.port));
});
