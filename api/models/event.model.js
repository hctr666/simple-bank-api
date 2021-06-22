const DEPOSIT = 'deposit';
const WITHDRAW = 'withdraw';
const TRANSFER = 'transfer';

function Event(type, { destination, origin, amount }) {
  if (type === DEPOSIT) {
    return {
      destination: `${destination}`,
      amount
    }
  }

  if (type === TRANSFER) {
    return {
      destination: `${destination}`,
      origin: `${origin}`,
      amount
    }
  }

  return {
    origin: `${origin}`,
    amount
  }
};

module.exports = {
  Event,
  EventTypes: {
    DEPOSIT,
    WITHDRAW,
    TRANSFER
  }
};
