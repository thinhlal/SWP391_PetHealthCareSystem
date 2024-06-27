const Account = require('../models/Account');

class AdminController {
  // GET //searchAccount/:accountIDOrUsername
  async searchAccountIDOrUsername(req, res, next) {
    const { accountIDOrUsername } = req.params;
    try {
      const listAccounts = await Account.find({
        $or: [
          { accountID: { $regex: accountIDOrUsername, $options: 'i' } },
          { username: { $regex: accountIDOrUsername, $options: 'i' } },
        ],
      });
      res.status(200).json(listAccounts);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error searchID or Name pets', error: error.message });
    }
  }
}

module.exports = new AdminController();
