const AccountService = require('../services/account.service');
const { Event, EventTypes } = require('../models/event.model');

function EventService() {
  const accountService = new AccountService();

  function deposit(inputs) {
    const { destination, amount } = new Event(EventTypes.DEPOSIT, inputs);
    const account = accountService.find(destination);

    if (!account) {
      return {
        destination: accountService.create({
          id: destination,
          balance: amount
        })
      };
    }

    return {
      destination: accountService.update(destination, {
        balance: account.balance + amount
      })
    };
  }

  function withDraw(inputs) {
    const { origin, amount } = new Event(EventTypes.WITHDRAW, inputs);
    const account = accountService.find(origin);

    if (!account) return false;

    return {
      origin: accountService.update(origin, {
        balance: account.balance - amount
      })
    };
  }

  function transfer(inputs) {
    const { origin, amount, destination } = new Event(EventTypes.TRANSFER, inputs);

    let originAccount = accountService.find(origin);
    let destinationAccount = accountService.find(destination);

    if (!originAccount || !destinationAccount) return false;

    originAccount = accountService.update(origin, {
      balance: originAccount.balance - amount
    });

    destinationAccount = accountService.update(destination, {
      balance: destinationAccount.balance + amount
    });

    return {
      destination: destinationAccount,
      origin: originAccount
    };
  }

  return {
    deposit,
    withDraw,
    transfer
  }
}

module.exports = EventService;
