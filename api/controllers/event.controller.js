const EventService = require('../services/event.service');
const { DEPOSIT, WITHDRAW } = require('../models/event.model');

function EventController() {
  const eventService = new EventService();

  /**
   * POST /event
   * 
   * Process account deposit/withdraw event
   * 
   * @param {*} req 
   * @param {*} res 
   */
  function processEvent(req, res) {
    const { type, destination, origin, amount } = req.body;

    let result;

    try {

      if (type === DEPOSIT) {
        result = processDeposit({ destination, amount });
      }

      if (type === WITHDRAW) {
        result = processWithdraw({ origin, amount });
      }

      if (result) return res.json(201, result);

      return res.text(500, 'Unable to process the event');

    } catch (error) {
      console.error(error);
      return res.text(500, 'Internal server error');
    }
  }

  function processDeposit(depositInput) {
    const result = eventService.deposit(depositInput);

    if (result) {
      return {
        destination: result
      };
    }

    return null;
  }

  function processWithdraw(withDrawInput) {
    const result = eventService.withDraw(withDrawInput);

    if (result) {
      return {
        origin: result
      };
    }

    return null;
  }

  return {
    processEvent
  };
}

module.exports = (EventController)();
