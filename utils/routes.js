var r = require('rethinkdb'),
  helpers = require('./helpers.js');


/**
* @desc Helpers for REST routes
*/
function get(req, res, next) {
  r.table('statuses')
    .orderBy(r.desc('created'))
    .limit(50)
    .run(req._rdbConn).then(function (cursor) {
      return cursor.toArray();
    }).then(function (result) {
      res.json(result);
    }).error(helpers.handleError(res))
    .finally(next);
}

function getOne(req, res, next) {
  var id = req.params.id;
  r.table('statuses')
    .get(id)
    .run(req._rdbConn).then(function (result) {
      res.json(result);
    }).finally(next);
}

/**
* @desc endpoint to create a new status document
*
* @param {Object} :: status
* @example curl -X POST -H 'Content-Type: application/json' -d '{"status": "test"}' localhost:3000/statuses
* @example curl -X POST -H 'Content-Type: application/json' -d '{"status": "test"}' http://162.243.6.139:3000/statuses
*/
function create(req, res, next) {
  var status = req.body.status;
  r.table('statuses')
    .insert({status: status, created: r.now()}, {returnChanges: true}).run(req._rdbConn).then(function (result) {
      if (result.inserted !== 1) {
        helpers.handleError(res, next)(new Error('Document was not inserted'));
      } else {
        res.json(result.changes[0].new_val);
      }
    }).error(helpers.handleError(res))
    .finally(next);
}

/**
* @desc endpoint returns historical activity data for one week
*/
function getWeek(req, res, next) {
  r.table('statuses')
  .group(r.row('created').day())
  .filter((row) => {
    return row('created').gt(r.now().sub(86400*7));
  })
  .count()
  .ungroup()
  .map((row) => row('reduction'))
  .run(req._rdbConn).then(function (cursor) {
    return cursor.toArray();
  }).then(function (result) {
    res.json(result);
  }).error(helpers.handleError(res))
  .finally(next);
}

/**
* @desc get week total (ungrouped)
*/
function getWeekDetails(req, res, next) {
  r.table('statuses')
  .group(r.row('created'))
  .filter((row) => {
    return row('created').gt(r.now().sub(86400*7));
  })
  .orderBy(r.desc('created'))
  .pluck('created', 'status')
  .ungroup()
  .map((row) => row('reduction').nth(0))
  .run(req._rdbConn).then(function (cursor) {
    return cursor.toArray();
  }).then(function (result) {
    res.json(result);
  }).error(helpers.handleError(res))
  .finally(next);
}

module.exports = {
  get: get,
  getOne: getOne,
  create: create,
  getWeek: getWeek,
  getWeekDetails: getWeekDetails
};
