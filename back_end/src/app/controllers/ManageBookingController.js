const bcrypt = require('bcrypt');
const Booking = require('../models/Booking.js');
const Payment = require('../models/Payment.js');
const Service = require('../models/Service.js');
const Customer = require('../models/Customer.js');
const ServiceBookingVet = require('../models/ServiceBookingVet.js');
const Account = require('../models/Account.js');
const Pet = require('../models/Pet.js');

class ManageBookingController {
  // GET /
  async index(req, res, next) {
    try {
    } catch (error) {
      res.status(500).json({ message: 'Error creating ', error });
    }
  }

  // POST /addHaveCustomer
  async addBookingHaveCustomer(req, res, next) {
    const bookingInfo = req.body;
    try {
      const serviceAvg = await Service.aggregate([
        {
          $match: {
            serviceID: { $in: bookingInfo.service },
          },
        },
        {
          $group: {
            _id: null,
            totalPrice: { $sum: '$price' },
          },
        },
      ]);
      const accountID = bookingInfo.petInfo.accountID;
      const customerAgg = await Customer.aggregate([
        {
          $match: {
            accountID,
          },
        },
      ]);

      let idBooking;
      while (true) {
        try {
          const lastBooking = await Booking.findOne().sort({ bookingID: -1 });
          if (lastBooking) {
            const lastID = parseInt(lastBooking.bookingID.substring(2));
            idBooking = 'BK' + (lastID + 1).toString().padStart(6, '0');
          } else {
            idBooking = 'BK000000';
          }
          break;
        } catch (error) {
          console.log(error);
        }
      }
      const saveBooking = new Booking({
        bookingID: idBooking,
        accountID: bookingInfo.petInfo.accountID,
        petID: bookingInfo.petInfo.petID,
        doctorID: bookingInfo.doctor.doctorID,
        name: customerAgg[0].name,
        phone: customerAgg[0].phone,
        email: customerAgg[0].email,
        dateBook: bookingInfo.day,
        isCheckIn: true,
        totalPrice: serviceAvg[0].totalPrice,
        ...bookingInfo,
      });

      await saveBooking.save();

      const services = bookingInfo.service;
      for (let i = 0; i < services.length; i++) {
        let idServiceBookingVet;
        const service = services[i];
        while (true) {
          try {
            const lastServiceBookingVet =
              await ServiceBookingVet.findOne().sort({
                serviceBookingVetID: -1,
              });
            if (lastServiceBookingVet) {
              idServiceBookingVet =
                parseInt(lastServiceBookingVet.serviceBookingVetID) + 1;
            } else {
              idServiceBookingVet = 0;
            }
            break;
          } catch (error) {
            console.log(error);
          }
        }
        const saveServiceBookingVet = new ServiceBookingVet({
          serviceBookingVetID: idServiceBookingVet,
          bookingID: idBooking,
          serviceID: service,
        });

        await saveServiceBookingVet.save();
      }
      let idPayment;
      while (true) {
        try {
          const lastPayment = await Payment.findOne().sort({ paymentID: -1 });
          if (lastPayment) {
            const lastID = parseInt(lastPayment.paymentID.substring(2));
            idPayment = 'PA' + (lastID + 1).toString().padStart(6, '0');
          } else {
            idPayment = 'PA000000';
          }
          break;
        } catch (error) {
          console.log(error);
        }
      }
      const createPayment = {
        paymentID: idPayment,
        bookingID: idBooking,
        isSuccess: true,
        date: new Date(),
        totalPrice: serviceAvg[0].totalPrice,
        paymentMethod: 'COUNTER',
        isCancelPayment: false,
      };
      const payment = new Payment(createPayment);

      await payment.save();
      res.status(201).json({
        message: 'Booking successfully created',
        bookingID: idBooking,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error creating ', error });
    }
  }

  // POST /addNotHaveCustomer
  async addBookingNotHaveCustomer(req, res, next) {
    const bookingInfo = req.body;
    try {
      let checkUserExist = true;
      let idAccount;
      let idCustomer;
      const username = req.body.userInfo.email;
      const existAccount = await Account.findOne({ username });
      // Exist Account
      if (!existAccount) {
        checkUserExist = false;
        let { email, name, phone } = req.body.userInfo;
        const password = process.env.DEFAULT_PASSWORD;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        while (true) {
          try {
            const lastAccountID = await Account.findOne().sort({
              accountID: -1,
            });
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

        const newAccount = new Account({
          accountID: idAccount,
          username: email,
          password: hashedPassword,
        });
        await newAccount.save();

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

      // Create Pet
      let petCreate = req.body.petInfo;
      let idPET;
      while (true) {
        try {
          const lastPetId = await Pet.findOne().sort({ petID: -1 });
          if (lastPetId) {
            const lastID = parseInt(lastPetId.petID.substring(2));
            idPET = 'PE' + (lastID + 1).toString().padStart(6, '0');
          } else {
            idPET = 'PE000000';
          }
          break;
        } catch (error) {
          console.log(error);
        }
      }

      const newPet = new Pet({
        petID: idPET,
        accountID: checkUserExist ? existAccount.accountID : idAccount,
        name: petCreate.name,
        birthday: petCreate.birthday,
        petType: petCreate.type.toUpperCase(),
        breed: petCreate.breed,
        gender: petCreate.gender.toUpperCase(),
      });
      await newPet.save();

      const serviceAvg = await Service.aggregate([
        {
          $match: {
            serviceID: { $in: bookingInfo.service },
          },
        },
        {
          $group: {
            _id: null,
            totalPrice: { $sum: '$price' },
          },
        },
      ]);

      //Create Booking
      let idBooking;
      while (true) {
        try {
          const lastBooking = await Booking.findOne().sort({ bookingID: -1 });
          if (lastBooking) {
            const lastID = parseInt(lastBooking.bookingID.substring(2));
            idBooking = 'BK' + (lastID + 1).toString().padStart(6, '0');
          } else {
            idBooking = 'BK000000';
          }
          break;
        } catch (error) {
          console.log(error);
        }
      }
      const saveBooking = new Booking({
        bookingID: idBooking,
        accountID: checkUserExist ? existAccount.accountID : idAccount,
        petID: idPET,
        doctorID: bookingInfo.doctor.doctorID,
        name: bookingInfo.userInfo.name,
        phone: bookingInfo.userInfo.phone,
        email: bookingInfo.userInfo.email,
        dateBook: bookingInfo.day,
        isCheckIn: true,
        totalPrice: serviceAvg[0].totalPrice,
        ...bookingInfo,
      });

      await saveBooking.save();

      const services = bookingInfo.service;
      for (let i = 0; i < services.length; i++) {
        let idServiceBookingVet;
        const service = services[i];
        while (true) {
          try {
            const lastServiceBookingVet =
              await ServiceBookingVet.findOne().sort({
                serviceBookingVetID: -1,
              });
            if (lastServiceBookingVet) {
              idServiceBookingVet =
                parseInt(lastServiceBookingVet.serviceBookingVetID) + 1;
            } else {
              idServiceBookingVet = 0;
            }
            break;
          } catch (error) {
            console.log(error);
          }
        }
        const saveServiceBookingVet = new ServiceBookingVet({
          serviceBookingVetID: idServiceBookingVet,
          bookingID: idBooking,
          serviceID: service,
        });

        await saveServiceBookingVet.save();
      }
      let idPayment;
      while (true) {
        try {
          const lastPayment = await Payment.findOne().sort({ paymentID: -1 });
          if (lastPayment) {
            const lastID = parseInt(lastPayment.paymentID.substring(2));
            idPayment = 'PA' + (lastID + 1).toString().padStart(6, '0');
          } else {
            idPayment = 'PA000000';
          }
          break;
        } catch (error) {
          console.log(error);
        }
      }
      const createPayment = {
        paymentID: idPayment,
        bookingID: idBooking,
        isSuccess: true,
        date: new Date(),
        totalPrice: serviceAvg[0].totalPrice,
        paymentMethod: 'COUNTER',
        isCancelPayment: false,
      };
      const payment = new Payment(createPayment);

      await payment.save();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error creating ', error });
    }
  }

  // POST /addHaveCustomer
  async updateBookingDoctors(req, res, next) {
    const { bookingID, chosenDoctor } = req.body;
    console.log(chosenDoctor);
    try {
      await Booking.findOneAndUpdate(
        { bookingID },
        {
          doctorID: chosenDoctor,
        },
        {
          new: true,
        },
      );
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error creating ', error });
    }
  }

  // POST /confirmCheckIn
  async confirmCheckIn(req, res, next) {
    const { bookingID } = req.body;
    try {
      await Booking.findOneAndUpdate(
        { bookingID },
        {
          isCheckIn: true,
        },
      );
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error creating ', error });
    }
  }

  // POST /confirmPayment
  async confirmPayment(req, res, next) {
    const { bookingID } = req.body;
    try {
      await Booking.findOneAndUpdate(
        { bookingID },
        {
          isCheckIn: true,
        },
      );
      await Payment.findOneAndUpdate(
        { bookingID },
        {
          isSuccess: true,
        },
      );
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error creating ', error });
    }
  }
}

module.exports = new ManageBookingController();
