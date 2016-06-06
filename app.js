var express = require('express'),
  bodyParser = require('body-parser'),
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
app.use('/static', express.static(__dirname + '/client'));

/**
 * @desc endpoints
 */
app.get('/', function (req, res) {
  res.render('index');
});

app.post('/message', function (req, res) {
  var message = req.body.message
  console.log(message);
  res.json(message);
});

app.listen(process.env.PORT || config.port, function() {
  console.log('getting jiggy on port ' + (process.env.PORT || config.port));
});
