const Account = require('../models/Account.js');
const Customer = require('../models/Customer.js');
const bcrypt = require('bcrypt');

class UserController {
  // GET /getUserProfile/:accountID
  async getUserProfileByID(req, res, next) {
    const accountID = req.params.accountID;
    try {
      const accountInfo = await Account.aggregate([
        { $match: { accountID } },
        {
          $lookup: {
            from: 'customers',
            localField: 'accountID',
            foreignField: 'accountID',
            as: 'customerDetails',
          },
        },
      ]);

      res.status(200).json(accountInfo[0]);
    } catch (error) {
      res.status(500).json({ message: 'Error when get booking', error });
    }
  }

  // POST /changePassword
  async changePassword(req, res, next) {
    const { accountID, passwords } = req.body;
    const { currentPassword, newPassword } = passwords;
    try {
      const accountInfo = await Account.findOne({ accountID });
      const isMatch = await bcrypt.compare(
        currentPassword,
        accountInfo.password,
      );

      if (!isMatch) {
        return res.status(401).json({ message: 'Old password is incorrect' });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      await Account.findOneAndUpdate(
        { accountID },
        {
          password: hashedPassword,
        },
      );
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error when get booking', error });
    }
  }

  // POST /deleteAccount
  async deleteAccount(req, res, next) {
    const { accountID } = req.body;
    try {
      await Account.findOneAndUpdate(
        { accountID },
        {
          status: false,
        },
      );

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error when get booking', error });
    }
  }

  // PATCH /updateImageUser
  async updateImageUser(req, res, next) {
    const { customerID, image } = req.body;
    try {
      await Customer.findOneAndUpdate(
        { customerID },
        {
          image: image,
        },
      );
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error when get booking', error });
    }
  }

  // POST /updateUserInfo
  async updateUserInfo(req, res, next) {
    const { profile } = req.body;
    const { customerID, name, phone, email, birthday } =
      profile.customerDetails[0];
    try {
      await Customer.findOneAndUpdate(
        { customerID },
        {
          name,
          phone,
          email,
          birthday,
        },
      );
      res.status(201).json('Save successfully!!!');
    } catch (error) {
      res.status(500).json({ message: 'Error when get booking', error });
    }
  }
}
module.exports = new UserController();
