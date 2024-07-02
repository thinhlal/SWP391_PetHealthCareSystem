const Rate = require('../models/Rate.js');
const Booking = require('../models/Booking.js');

class RateController {
  //GET /getAllServices
  async getAllServices(req, res, next) {
    try {
    } catch (error) {
      res.status(500).json({ message: 'Error fetching services', error });
    }
  }

  //POST /addRateStart
  async addRateStart(req, res, next) {
    try {
      let { rating, feedback, customerID, bookingID } = req.body;

      await Booking.findOneAndUpdate({ bookingID }, { isRate: true });

      let rateID;
      while (true) {
        try {
          const lastRateID = await Rate.findOne().sort({ rateID: -1 });
          if (lastRateID) {
            const lastID = parseInt(lastRateID.rateID.substring(2));
            rateID = 'RT' + (lastID + 1).toString().padStart(6, '0');
          } else {
            rateID = 'RT000000';
          }
          break;
        } catch (error) {
          console.log(error);
        }
      }
      const newRate = new Rate({
        rateID: rateID,
        bookingID: bookingID,
        customerID: customerID,
        date: new Date(),
        rate: rating,
        comment: feedback.trim() === '' ? null : feedback,
      });
      await newRate.save();

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error add services', error });
    }
  }
}

module.exports = new RateController();
