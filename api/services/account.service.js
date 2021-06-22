const LocalDB = require('../../lib/db');

const Account = require('../models/account.model');

function AccountService() {

  const db = new LocalDB('accounts');

  function create({ id, balance }) {
    const account = new Account(id, balance);
    return db.create(account);
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
