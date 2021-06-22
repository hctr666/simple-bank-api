const { Route } = require('../../lib/api');
const BalanceController = require('../controllers/balance.controller');
const EventController = require('../controllers/event.controller');
const StateController = require('../controllers/state.controller');

module.exports = [
  Route.get('/balance', BalanceController.getAccountBalance),
  Route.post('/event', EventController.processEvent),
  Route.post('/reset', StateController.resetState)
];
