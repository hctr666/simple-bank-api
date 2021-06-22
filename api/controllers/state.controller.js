const LocalDB = require('../../lib/db');

const db = new LocalDB();

function StateController() {
  function resetState(_, res) {
    try {
      db.reset();
      return res.text(200, 'OK');
    } catch (error) {
      console.error(error);
    }

    return res.text(500, 'Unable to reset state');
  }

  return {
    resetState
  }
}

module.exports = (StateController)();
