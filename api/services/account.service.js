const LocalDB = require('../../lib/db');

const Account = require('../models/account.model');

function AccountService() {

  const db = new LocalDB('accounts');

  function create({ balance }) {
    const account = new Account(balance);

    const result = db.create({
      id: account.id,
      balance: account.balance
    });

    return result;
  }

  function find(id) {
    return db.find(id);
  }

  function update(id, data) {
    return db.update(id, data);
  }

  return {
    create,
    find,
    update
  }
}

module.exports = AccountService;
