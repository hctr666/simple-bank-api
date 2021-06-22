const { accounts } = require('../../store.json');

const Account = require('../models/account.model');

function AccountService() {
  return {
    create: function ({ balance }) {
      const account = new Account(balance);
      accounts.push(account);
      return account;
    },
    find: function (id) {
      return accounts.find(account => account.id === id);
    },
    all: function () {
      return accounts;
    }
  }
}

module.exports = AccountService;
