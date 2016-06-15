var express = require('express'),
  helpers = require('./utils/helpers'),
  routes = require('./utils/routes.js'),
  bodyParser = require('body-parser'),
  sock = require('socket.io'),
  r = require('rethinkdb'),
  config = require('./config'),
  cors = require('cors'),
  app = express(),
  http = require('http').Server(app),
  io = require('socket.io')(http);


/**
* @desc configuration
*/
app.use(cors());
app.use(bodyParser.json());
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
app.get('/', (req, res) => res.render('index'));
app.use(helpers.closeConnection);

/**
* @desc Changefeed
*/
r.connect({db: 'overwatch'}).then(function (conn) {
  r.table('statuses').changes().run(conn)
  .then(function (cursor) {
    cursor.each(function (err, change) {
      console.log('New Change: ', change);
      io.sockets.emit('status change', change);
    });
  });
});

/**
* @desc socket setup
*/
io.on('connection', function (socket) {
  console.log('client connected');
  socket.on('disconnect', function () {
    console.log('disconnected');
  });
  /**
  * @desc action :: new status
  *
  * @param data {Object} - Object with new status
  */
  socket.on('new status', function (data) {
    r.connect({db: 'overwatch'}).then(function (conn) {
      return r.table('statuses')
        .insert(data)
        .run(conn)
        .finally(function() { conn.close(); });
    })
    .error(function (err) { console.log('Error adding new question: ', err); });
  });
});

http.listen(process.env.PORT || config.port, function() {
  console.log('getting jiggy on port ' + (process.env.PORT || config.port));
});
