const Account = require('../models/Account.js');
const Booking = require('../models/Booking.js');
const Admin = require('../models/Admin.js');
const Staff = require('../models/Staff.js');
const Doctor = require('../models/Doctor.js');
const bcrypt = require('bcrypt');
const Customer = require('../models/Customer.js');

class AdminController {
  // POST /
  async index(req, res, next) {
    try {
    } catch (error) {
      res.status(500).json({ message: 'Error creating ', error });
    }
  }

  // POST /add
  async add(req, res, next) {
    //const bookingInfo = req.body;
    try {
    } catch (error) {
      res.status(500).json({ message: 'Error creating ', error });
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
        console.log(newAdmin);
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

  // GET /updateAccount
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
}

module.exports = new AdminController();
