const AccountService = require('../services/account.service');

function BalanceController() {
  const accountService = new AccountService();

  /**
   * GET /balance
   * 
   * get balance amount for specific account
   * 
   * @param {*} req 
   * @param {*} res 
   */
  function getAccountBalance(req, res) {
    try {
      const accountId = req.query.account_id;
      const account = accountService.find(`${accountId}`);

      if (account) {
        return res.text(200, account.balance);
      }

      return res.text(404, 0);

    } catch (error) {
      console.error(error);
    }

    return res.text(500, error.message);
  }

  return {
    getAccountBalance
  };
}

module.exports = (BalanceController)();

