const getIncrementaId = require('../helpers/getIncrementalId');
const LocalDB = require('../../lib/db');

const db = new LocalDB('accounts');

function Account(_id, balance) {
  const id = _id || getIncrementaId(db.all());
  return {
    id,
    balance
  };
}

module.exports = Account;
