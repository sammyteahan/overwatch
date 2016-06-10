var r = require('rethinkdb');


/**
* @desc middleware to create our connection
*/
function createConnection(req, res, next) {
  r.connect({db: 'overwatch'}).then(function (connection) {
    req._rdbConn = connection;
    next();
  }).error(handleError(res));
}

/**
* @desc middleware to close rethinkdb connection
*/
function closeConnection(req, res, next) {
  req._rdbConn.close();
}

/**
* @desc handle error on rethinkdb connection
*/
function handleError(res) {
  return function(error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  createConnection: createConnection,
  closeConnection: closeConnection,
  handleError: handleError
};
