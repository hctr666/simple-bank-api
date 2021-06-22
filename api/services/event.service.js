const AccountService = require('../services/account.service');
const { Event, DEPOSIT, WITHDRAW } = require('../models/event.model');

function EventService() {
  const accountService = new AccountService();

  function deposit(inputs) {
    const { destination, amount } = new Event(DEPOSIT, inputs);
    const account = accountService.find(destination);

    if (!account) {
      return accountService.create({
        id: destination,
        balance: amount
      });
    }

    return accountService.update(destination, {
      balance: account.balance + amount
    });
  }

  function withDraw(inputs) {
    const { origin, amount } = new Event(WITHDRAW, inputs);
    const account = accountService.find(origin);

    if (!account) return false;

    return accountService.update(origin, {
      balance: account.balance - amount
    });
  }

  return {
    deposit,
    withDraw
  }
}

module.exports = EventService;
