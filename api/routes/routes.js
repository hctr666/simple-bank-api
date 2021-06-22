const { Route } = require('../../lib/api');

module.exports = [
  Route.get('/event', function (req, res) {
    console.log(req.query)
    return res.text(200, 'GET: Event index')
  }),
  Route.post('/event', function (req, res) {
    console.log(req.body);
    return res.json(200, 'POST: Event index')
  }),
];
