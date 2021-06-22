const getIncrementaId = require('../helpers/getIncrementalId');
const LocalDB = require('../../lib/db');

const db = new LocalDB('accounts');

function Account(balance) {
  const id = getIncrementaId(db.all());
  return {
    id,
    balance
  };
}

module.exports = Account;
