var r = require('rethinkdb');

/**
* @desc Helpers for REST routes
*/
function get(req, res, next) {
  r.table('statuses')
    .run(req._rdbConn).then(function (cursor) {
      return cursor.toArray();
    }).then(function (result) {
      res.json(result);
    }).error(handleError(res))
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
* @todo re-write this logic
*/
// function update(req, res, next) {
//   var id = req.body.id;
//   r.table('statuses')
//     .get(id)
//     .update({'points': r.row('points').add(1)}, {returnChanges: true})
//     .run(req._rdbConn).then(function (result) {
//       if(result.replaced !== 1) {
//         handleError(res, next)(new Error('Document was not updated'));
//       } else {
//         res.json(result.changes[0].new_val);
//       }
//     }).finally(next);
// }
// 
function create(req, res, next) {
  var body = req.body;
  r.table('statuses')
    .insert(body, {returnChanges: true}).run(req._rdbConn).then(function (result) {
      if (result.inserted !== 1) {
        handleError(res, next)(new Error('Document was not inserted'));
      } else {
        res.json(result.changes[0].new_val);
      }
    }).error(handleError(res))
    .finally(next);
}

module.exports = {
  get: get,
  getOne: getOne,
  create: create
};
