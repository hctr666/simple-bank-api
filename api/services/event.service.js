const AccountService = require('../services/account.service');
const { Event, DEPOSIT, WITHDRAW } = require('../models/event.model');

function EventService() {
  const accountService = new AccountService();

  function deposit(inputs) {
    const { destination, amount } = new Event(DEPOSIT, inputs);
    const current = accountService.find(destination);

    if (!current) {
      return accountService.create({
        id: destination,
        balance: amount
      });
    }

    return accountService.update(destination, {
      balance: current.balance + amount
    });
  }

  function withDraw(inputs) {
  }

  return {
    deposit,
    withDraw
  }
}

module.exports = EventService;
