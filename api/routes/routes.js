const { Route } = require('../../lib/api');
const BalanceController = require('../controllers/balance.controller');

module.exports = [
  Route.get('/balance', BalanceController.getAccountBalance)
];
