const EventService = require('../services/event.service');
const { EventTypes } = require('../models/event.model');

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

      if (type === EventTypes.DEPOSIT) {
        result = processDeposit({ destination, amount });
      }

      if (type === EventTypes.WITHDRAW) {
        result = processWithdraw({ origin, amount });
      }

      if (type === EventTypes.TRANSFER) {
        result = processTransfer({ origin, amount, destination });
      }

      if (result) return res.json(201, result)

      return res.text(404, 0);

    } catch (error) {
      console.error(error);
    }

    return res.text(500, 'Internal server error');
  }

  function processDeposit(depositInput) {
    const result = eventService.deposit(depositInput);

    if (result) {
      return {
        destination: result.destination
      };
    }

    return null;
  }

  function processWithdraw(withDrawInput) {
    const result = eventService.withDraw(withDrawInput);

    if (result) {
      return {
        origin: result.origin
      };
    }

    return null;
  }

  function processTransfer(transferInputs) {
    const result = eventService.transfer(transferInputs);

    if (result) {
      return {
        origin: result.origin,
        destination: result.destination
      }
    }
  }

  return {
    processEvent
  };
}

module.exports = (EventController)();
