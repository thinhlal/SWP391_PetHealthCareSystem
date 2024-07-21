const Account = require('../models/Account.js');
const Booking = require('../models/Booking.js');
const Admin = require('../models/Admin.js');
const Staff = require('../models/Staff.js');
const Doctor = require('../models/Doctor.js');
const bcrypt = require('bcrypt');
const Customer = require('../models/Customer.js');
const Rate = require('../models/Rate.js');

class AdminController {
  // GET /getRevenueOfEachMonth
  async getRevenueOfEachMonth(req, res, next) {
    try {
      const currentYear = new Date().getFullYear();

      const revenueByMonth = await Booking.aggregate([
        {
          $match: {
            dateBook: {
              $gte: new Date(`${currentYear}-01-01`),
              $lte: new Date(`${currentYear}-12-31`),
            },
          },
        },
        {
          $lookup: {
            from: 'payments',
            localField: 'bookingID',
            foreignField: 'bookingID',
            as: 'paymentDetails',
          },
        },
        {
          $unwind: {
            path: '$paymentDetails',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: {
            'paymentDetails.isCancelPayment': { $ne: true },
          },
        },
        {
          $project: {
            year: { $year: '$dateBook' },
            month: { $month: '$dateBook' },
            effectivePrice: {
              $cond: {
                if: '$isRefund',
                then: { $subtract: ['$totalPrice', '$refundPrice'] },
                else: '$totalPrice',
              },
            },
          },
        },
        {
          $group: {
            _id: {
              year: '$year',
              month: '$month',
            },
            totalRevenue: { $sum: '$effectivePrice' },
          },
        },
        {
          $sort: {
            '_id.year': 1,
            '_id.month': 1,
          },
        },
      ]);

      const canceledBookingsByMonth = await Booking.aggregate([
        {
          $match: {
            isCancel: true,
            dateBook: {
              $gte: new Date(`${currentYear}-01-01`),
              $lte: new Date(`${currentYear}-12-31`),
            },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: '$dateBook' },
              month: { $month: '$dateBook' },
            },
            canceledCount: { $sum: 1 },
          },
        },
        {
          $sort: {
            '_id.year': 1,
            '_id.month': 1,
          },
        },
      ]);

      const allMonths = Array.from({ length: 12 }, (_, i) => ({
        year: currentYear,
        month: i + 1,
        totalRevenue: 0,
        canceledCount: 0,
      }));

      revenueByMonth.forEach(item => {
        const index = item._id.month - 1;
        allMonths[index].totalRevenue = item.totalRevenue;
      });

      canceledBookingsByMonth.forEach(item => {
        const index = item._id.month - 1;
        allMonths[index].canceledCount = item.canceledCount;
      });

      res.status(200).json(allMonths);
    } catch (error) {
      res.status(500).json({ message: 'Error when getting bookings', error });
    }
  }

  // GET /getAllBookings
  async getAllBookings(req, res, next) {
    try {
      const allBookings = await Booking.aggregate([
        {
          $lookup: {
            from: 'customers',
            localField: 'accountID',
            foreignField: 'accountID',
            as: 'customerDetails',
          },
        },
        {
          $lookup: {
            from: 'pets',
            localField: 'petID',
            foreignField: 'petID',
            as: 'petDetails',
          },
        },
        {
          $lookup: {
            from: 'doctors',
            localField: 'doctorID',
            foreignField: 'doctorID',
            as: 'doctorDetails',
          },
        },
        {
          $lookup: {
            from: 'payments',
            localField: 'bookingID',
            foreignField: 'bookingID',
            as: 'paymentsDetails',
          },
        },
        {
          $lookup: {
            from: 'servicebookingvets',
            localField: 'bookingID',
            foreignField: 'bookingID',
            as: 'servicebookingvetsDetails',
          },
        },
        {
          $unwind: {
            path: '$servicebookingvetsDetails',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'services',
            localField: 'servicebookingvetsDetails.serviceID',
            foreignField: 'serviceID',
            as: 'servicebookingvetsDetails.servicesDetails',
          },
        },
        {
          $group: {
            _id: '$_id',
            bookingID: { $first: '$bookingID' },
            accountID: { $first: '$accountID' },
            petID: { $first: '$petID' },
            doctorID: { $first: '$doctorID' },
            name: { $first: '$name' },
            phone: { $first: '$phone' },
            email: { $first: '$email' },
            dateBook: { $first: '$dateBook' },
            startTime: { $first: '$startTime' },
            endTime: { $first: '$endTime' },
            totalPrice: { $first: '$totalPrice' },
            dateCancelBook: { $first: '$dateCancelBook' },
            isCancel: { $first: '$isCancel' },
            isCheckIn: { $first: '$isCheckIn' },
            isPrepayment: { $first: '$isPrepayment' },
            isRate: { $first: '$isRate' },
            isRefund: { $first: '$isRefund' },
            refundPrice: { $first: '$refundPrice' },
            isCheckedVaccinate: { $first: '$isCheckedVaccinate' },
            isCompleted: { $first: '$isCompleted' },
            customerDetails: { $first: '$customerDetails' },
            petDetails: { $first: '$petDetails' },
            doctorDetails: { $first: '$doctorDetails' },
            servicebookingvetsDetails: { $push: '$servicebookingvetsDetails' },
            paymentsDetails: { $first: '$paymentsDetails' },
          },
        },
        {
          $addFields: {
            servicesInBooking: {
              $map: {
                input: '$servicebookingvetsDetails',
                as: 'servicebookingvet',
                in: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: '$$servicebookingvet.servicesDetails',
                        as: 'service',
                        cond: {
                          $eq: [
                            '$$service.serviceID',
                            '$$servicebookingvet.serviceID',
                          ],
                        },
                      },
                    },
                    0,
                  ],
                },
              },
            },
          },
        },
        {
          $project: {
            bookingID: 1,
            accountID: 1,
            petID: 1,
            name: 1,
            phone: 1,
            email: 1,
            dateBook: 1,
            startTime: 1,
            endTime: 1,
            totalPrice: 1,
            dateCancelBook: 1,
            isCancel: 1,
            isCheckIn: 1,
            isPrepayment: 1,
            isRate: 1,
            isRefund: 1,
            refundPrice: 1,
            isCheckedVaccinate: 1,
            isCompleted: 1,
            doctorID: 1,
            customerDetails: 1,
            petDetails: 1,
            doctorDetails: 1,
            servicebookingvetsDetails: 1,
            servicesInBooking: 1,
            paymentsDetails: 1,
          },
        },
      ]);
      res.status(200).json(allBookings);
    } catch (error) {
      res.status(500).json({ message: 'Error when get booking', error });
    }
  }

  // GET /getAllAccounts
  async getAllAccounts(req, res, next) {
    try {
      const allAccounts = await Account.aggregate([
        {
          $lookup: {
            from: 'customers',
            localField: 'accountID',
            foreignField: 'accountID',
            as: 'customerDetails',
          },
        },
        {
          $lookup: {
            from: 'doctors',
            localField: 'accountID',
            foreignField: 'accountID',
            as: 'doctorDetails',
          },
        },
        {
          $lookup: {
            from: 'staffs',
            localField: 'accountID',
            foreignField: 'accountID',
            as: 'staffDetails',
          },
        },
        {
          $lookup: {
            from: 'admins',
            localField: 'accountID',
            foreignField: 'accountID',
            as: 'adminDetails',
          },
        },
      ]);
      res.status(200).json(allAccounts);
    } catch (error) {
      res.status(500).json({ message: 'Error when get accounts', error });
    }
  }

  // GET /getAllRates
  async getAllRates(req, res, next) {
    try {
      const allRates = await Rate.aggregate([
        {
          $lookup: {
            from: 'customers',
            localField: 'customerID',
            foreignField: 'customerID',
            as: 'customerDetails',
          },
        },
        {
          $lookup: {
            from: 'bookings',
            localField: 'bookingID',
            foreignField: 'bookingID',
            as: 'bookingDetails',
          },
        },
      ]);
      res.status(200).json(allRates);
    } catch (error) {
      res.status(500).json({ message: 'Error when get accounts', error });
    }
  }

  // GET /getRating
  async getRating(req, res, next) {
    try {
      const rating = await Rate.aggregate([
        {
          $group: {
            _id: null,
            averageRate: { $avg: '$rate' },
            totalReviews: { $sum: 1 },
          },
        },
      ]);

      if (rating.length > 0) {
        res.status(200).json({
          averageRate: rating[0]?.averageRate,
          totalReviews: rating[0]?.totalReviews,
        });
      } else {
        res.status(200).json({
          averageRate: 0,
          totalReviews: 0,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error when get rating', error });
    }
  }

  // GET /getTotalIncome
  async getTotalIncome(req, res, next) {
    const { date } = req.query;
    try {
      const timezoneOffset = 7 * 60 * 60 * 1000;
      const currentDate = new Date(new Date(date).getTime() + timezoneOffset);
      currentDate.setUTCHours(0, 0, 0, 0);
      //Get Prev date
      const previousDateStart = new Date(currentDate);
      previousDateStart.setDate(previousDateStart.getDate() - 1);

      // Get Week
      const day = currentDate.getDay();
      const weekStartDate = new Date(currentDate);
      const weekEndDate = new Date(currentDate);

      if (day === 0) {
        weekStartDate.setDate(currentDate.getDate() - 6);
      } else {
        weekStartDate.setDate(currentDate.getDate() - (day - 1));
      }

      weekEndDate.setDate(weekStartDate.getDate() + 6);

      const previousWeekStartDate = new Date(weekStartDate);
      previousWeekStartDate.setDate(weekStartDate.getDate() - 7);
      const previousWeekEndDate = new Date(weekEndDate);
      previousWeekEndDate.setDate(weekEndDate.getDate() - 7);

      // Get month
      const previousMonthStartDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1,
      );
      const previousMonthEndDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1,
      );

      const monthStartDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1,
      );
      const nextMonthStartDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1,
      );

      const currentBookings = await Booking.aggregate([
        {
          $match: {
            dateBook: currentDate,
          },
        },
        {
          $lookup: {
            from: 'payments',
            localField: 'bookingID',
            foreignField: 'bookingID',
            as: 'paymentDetails',
          },
        },
        {
          $match: {
            'paymentDetails.isCancelPayment': false,
            'paymentDetails.isSuccess': true,
          },
        },
      ]);
      const previousBookings = await Booking.aggregate([
        {
          $match: {
            dateBook: previousDateStart,
          },
        },
        {
          $lookup: {
            from: 'payments',
            localField: 'bookingID',
            foreignField: 'bookingID',
            as: 'paymentDetails',
          },
        },
        {
          $match: {
            'paymentDetails.isCancelPayment': false,
            'paymentDetails.isSuccess': true,
          },
        },
      ]);

      const previousWeeklyBookings = await Booking.aggregate([
        {
          $match: {
            dateBook: {
              $gte: previousWeekStartDate,
              $lt: new Date(
                previousWeekEndDate.getTime() + 24 * 60 * 60 * 1000,
              ),
            },
          },
        },
        {
          $lookup: {
            from: 'payments',
            localField: 'bookingID',
            foreignField: 'bookingID',
            as: 'paymentDetails',
          },
        },
        {
          $match: {
            'paymentDetails.isCancelPayment': false,
            'paymentDetails.isSuccess': true,
          },
        },
      ]);
      const currentWeeklyBookings = await Booking.aggregate([
        {
          $match: {
            dateBook: {
              $gte: weekStartDate,
              $lt: new Date(weekEndDate.getTime() + 24 * 60 * 60 * 1000),
            },
          },
        },
        {
          $lookup: {
            from: 'payments',
            localField: 'bookingID',
            foreignField: 'bookingID',
            as: 'paymentDetails',
          },
        },
        {
          $match: {
            'paymentDetails.isCancelPayment': false,
            'paymentDetails.isSuccess': true,
          },
        },
      ]);

      const previousMonthlyBookings = await Booking.aggregate([
        {
          $match: {
            dateBook: {
              $gte: previousMonthStartDate,
              $lt: previousMonthEndDate,
            },
          },
        },
        {
          $lookup: {
            from: 'payments',
            localField: 'bookingID',
            foreignField: 'bookingID',
            as: 'paymentDetails',
          },
        },
        {
          $match: {
            'paymentDetails.isCancelPayment': false,
            'paymentDetails.isSuccess': true,
          },
        },
      ]);
      const currentMonthlyBookings = await Booking.aggregate([
        {
          $match: {
            dateBook: {
              $gte: monthStartDate,
              $lt: nextMonthStartDate,
            },
          },
        },
        {
          $lookup: {
            from: 'payments',
            localField: 'bookingID',
            foreignField: 'bookingID',
            as: 'paymentDetails',
          },
        },
        {
          $match: {
            'paymentDetails.isCancelPayment': false,
            'paymentDetails.isSuccess': true,
          },
        },
      ]);

      const totalIncomeAllBookings = await Booking.aggregate([
        {
          $lookup: {
            from: 'payments',
            localField: 'bookingID',
            foreignField: 'bookingID',
            as: 'paymentDetails',
          },
        },
        {
          $match: {
            'paymentDetails.isCancelPayment': false,
            'paymentDetails.isSuccess': true,
          },
        },
      ]);

      const currentTotalIncome = currentBookings.reduce((total, booking) => {
        if (booking.isRefund && booking.refundPrice > 0) {
          return total + (booking.totalPrice - booking.refundPrice);
        } else if (booking.isRefund && booking.refundPrice === 0) {
          return total;
        } else {
          return total + booking.totalPrice;
        }
      }, 0);
      const previousTotalIncome = previousBookings.reduce((total, booking) => {
        if (booking.isRefund && booking.refundPrice > 0) {
          return total + (booking.totalPrice - booking.refundPrice);
        } else if (booking.isRefund && booking.refundPrice === 0) {
          return total;
        } else {
          return total + booking.totalPrice;
        }
      }, 0);
      const currentWeeklyTotalIncome = currentWeeklyBookings.reduce(
        (total, booking) => {
          if (booking.isRefund && booking.refundPrice > 0) {
            return total + (booking.totalPrice - booking.refundPrice);
          } else if (booking.isRefund && booking.refundPrice === 0) {
            return total;
          } else {
            return total + booking.totalPrice;
          }
        },
        0,
      );
      const previousWeeklyTotalIncome = previousWeeklyBookings.reduce(
        (total, booking) => {
          if (booking.isRefund && booking.refundPrice > 0) {
            return total + (booking.totalPrice - booking.refundPrice);
          } else if (booking.isRefund && booking.refundPrice === 0) {
            return total;
          } else {
            return total + booking.totalPrice;
          }
        },
        0,
      );
      const previousMonthlyTotalIncome = previousMonthlyBookings.reduce(
        (total, booking) => {
          if (booking.isRefund && booking.refundPrice > 0) {
            return total + (booking.totalPrice - booking.refundPrice);
          } else if (booking.isRefund && booking.refundPrice === 0) {
            return total;
          } else {
            return total + booking.totalPrice;
          }
        },
        0,
      );
      const currentMonthlyTotalIncome = currentMonthlyBookings.reduce(
        (total, booking) => {
          if (booking.isRefund && booking.refundPrice > 0) {
            return total + (booking.totalPrice - booking.refundPrice);
          } else if (booking.isRefund && booking.refundPrice === 0) {
            return total;
          } else {
            return total + booking.totalPrice;
          }
        },
        0,
      );
      const totalIncome = totalIncomeAllBookings.reduce((total, booking) => {
        if (booking.isRefund && booking.refundPrice > 0) {
          return total + (booking.totalPrice - booking.refundPrice);
        } else if (booking.isRefund && booking.refundPrice === 0) {
          return total;
        } else {
          return total + booking.totalPrice;
        }
      }, 0);
      res.status(200).json({
        currentTotalIncome,
        previousTotalIncome,
        currentWeeklyTotalIncome,
        previousWeeklyTotalIncome,
        previousMonthlyTotalIncome,
        currentMonthlyTotalIncome,
        totalIncome,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error when get rating', error });
    }
  }

  // [POST] /addAccount
  async addAccount(req, res, next) {
    try {
      let { username, password, name, phone, email, role } = req.body;

      const existAccount = await Account.findOne({ username });
      if (existAccount) {
        return res.status(409).json({
          message: 'User already exists. Please choose a different username.',
        });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      let idAccount;
      while (true) {
        try {
          const lastAccountID = await Account.findOne().sort({ accountID: -1 });
          if (lastAccountID) {
            const lastID = parseInt(lastAccountID.accountID.substring(2));
            idAccount = 'AC' + (lastID + 1).toString().padStart(6, '0');
          } else {
            idAccount = 'AC000000';
          }
          break;
        } catch (error) {
          console.log(error);
        }
      }

      if (role === 'Admin') {
        const newAccount = new Account({
          accountID: idAccount,
          username,
          password: hashedPassword,
          role: 'Admin',
          isAdmin: true,
          status: true,
        });
        await newAccount.save();

        let idAdmin;
        while (true) {
          try {
            const lastAdminID = await Admin.findOne().sort({
              adminID: -1,
            });
            if (lastAdminID) {
              const lastID = parseInt(lastAdminID.adminID.substring(2));
              idAdmin = 'AM' + (lastID + 1).toString().padStart(6, '0');
            } else {
              idAdmin = 'AM000000';
            }
            break;
          } catch (error) {
            console.log(error);
          }
        }
        const newAdmin = new Admin({
          adminID: idAdmin,
          accountID: idAccount,
          name,
          phone,
          email,
        });
        await newAdmin.save();
      } else if (role === 'Staff') {
        const newAccount = new Account({
          accountID: idAccount,
          username,
          password: hashedPassword,
          role: 'Staff',
          status: true,
        });
        await newAccount.save();

        let idStaff;
        while (true) {
          try {
            const lastStaffID = await Staff.findOne().sort({
              staffID: -1,
            });
            if (lastStaffID) {
              const lastID = parseInt(lastStaffID.staffID.substring(2));
              idStaff = 'ST' + (lastID + 1).toString().padStart(6, '0');
            } else {
              idStaff = 'ST000000';
            }
            break;
          } catch (error) {
            console.log(error);
          }
        }

        const newStaff = new Staff({
          staffID: idStaff,
          accountID: idAccount,
          name,
          phone,
          email,
        });
        await newStaff.save();
      } else if (role === 'Doctor') {
        const newAccount = new Account({
          accountID: idAccount,
          username,
          password: hashedPassword,
          role: 'Doctor',
          status: true,
        });
        await newAccount.save();

        let idDoctor;
        while (true) {
          try {
            const lastDoctorID = await Doctor.findOne().sort({
              doctorID: -1,
            });
            if (lastDoctorID) {
              const lastID = parseInt(lastDoctorID.doctorID.substring(2));
              idDoctor = 'DC' + (lastID + 1).toString().padStart(6, '0');
            } else {
              idDoctor = 'DC000000';
            }
            break;
          } catch (error) {
            console.log(error);
          }
        }

        const newDoctor = new Doctor({
          doctorID: idDoctor,
          accountID: idAccount,
          name,
          phone,
          email,
        });
        await newDoctor.save();
      } else if (role === 'Customer') {
        const newAccount = new Account({
          accountID: idAccount,
          username,
          password: hashedPassword,
          role: 'Customer',
          status: true,
        });
        await newAccount.save();

        let idCustomer;
        while (true) {
          try {
            const lastCustomerID = await Customer.findOne().sort({
              customerID: -1,
            });
            if (lastCustomerID) {
              const lastID = parseInt(lastCustomerID.customerID.substring(2));
              idCustomer = 'CS' + (lastID + 1).toString().padStart(6, '0');
            } else {
              idCustomer = 'CS000000';
            }
            break;
          } catch (error) {
            console.log(error);
          }
        }

        const newCustomer = new Customer({
          customerID: idCustomer,
          accountID: idAccount,
          name,
          phone,
          email,
        });
        await newCustomer.save();
      }
      res.status(201).json({ message: 'Account registered successfully' });
    } catch (error) {
      console.error('Signup Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // PATCH /updateAccount
  async updateAccount(req, res, next) {
    const account = req.body;
    try {
      await Account.findOneAndUpdate(
        { accountID: account.accountID },
        {
          status: account.status ? false : true,
        },
      );
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error when get accounts', error });
    }
  }

  // POST /updateAccountInfo
  async updateAccountInfo(req, res, next) {
    const { accountID, name, email, phone, role } = req.body;
    try {
      if (role === 'Customer') {
        await Customer.findOneAndUpdate(
          { accountID },
          {
            name: name,
            email: email,
            phone: phone,
          },
        );
      } else if (role === 'Staff') {
        await Staff.findOneAndUpdate(
          { accountID },
          {
            name: name,
            email: email,
            phone: phone,
          },
        );
      } else if (role === 'Doctor') {
        await Doctor.findOneAndUpdate(
          { accountID },
          {
            name: name,
            email: email,
            phone: phone,
          },
        );
      } else if (role === 'Admin') {
        await Admin.findOneAndUpdate(
          { accountID },
          {
            name: name,
            email: email,
            phone: phone,
          },
        );
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error when get accounts', error });
    }
  }

  // GET /checkUsername
  async checkUsername(req, res, next) {
    const { username } = req.query;
    try {
      const account = await Account.findOne({ username });
      if (account) {
        return res.status(200).json({ exists: true });
      }
      res.status(200).json({ exists: false });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  // GET /checkPhone
  async checkPhone(req, res, next) {
    const { phone } = req.query;
    try {
      const customer = await Customer.findOne({ phone });
      const staff = await Staff.findOne({ phone });
      const doctor = await Doctor.findOne({ phone });
      const admin = await Admin.findOne({ phone });
      if (customer || staff || doctor || admin) {
        return res.status(200).json({ exists: true });
      }
      res.status(200).json({ exists: false });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  // GET /checkEmail
  async checkEmail(req, res, next) {
    const { email } = req.query;
    try {
      const customer = await Customer.findOne({ email });
      const staff = await Staff.findOne({ email });
      const doctor = await Doctor.findOne({ email });
      const admin = await Admin.findOne({ email });
      if (customer || staff || doctor || admin) {
        return res.status(200).json({ exists: true });
      }
      res.status(200).json({ exists: false });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = new AdminController();
