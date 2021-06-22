const DEPOSIT = 'deposit';
const WITHDRAW = 'withdraw';

function Event(type, { destination, origin, amount }) {
  if (type === DEPOSIT) {
    return {
      destination: `${destination}`,
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
  DEPOSIT,
  WITHDRAW
};
