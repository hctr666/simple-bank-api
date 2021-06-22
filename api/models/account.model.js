const getIncrementaId = require('../helpers/getIncrementalId');
const { accounts } = require('../../store.json');

function Account(balance) {
  const id = getIncrementaId(accounts);
  return {
    id,
    balance
  };
}

module.exports = Account;
