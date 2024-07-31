const express = require('express');
const router = express.Router();

const { verifyToken } = require('../app/controllers/MiddlewareController');
const AdminController = require('../app/controllers/AdminController');

router.patch('/updateAccount', verifyToken, AdminController.updateAccount);
router.post(
  '/updateAccountInfo',
  verifyToken,
  AdminController.updateAccountInfo,
);
router.post('/addAccount', verifyToken, AdminController.addAccount);
router.get('/getAllBookings', verifyToken, AdminController.getAllBookings);
router.get(
  '/getRevenueOfEachMonth',
  verifyToken,
  AdminController.getRevenueOfEachMonth,
);
router.get('/getAllRates', verifyToken, AdminController.getAllRates);
router.get(
  '/countStatisticBooking',
  verifyToken,
  AdminController.countStatisticBooking,
);
router.get('/getAllAccounts', verifyToken, AdminController.getAllAccounts);
router.get('/getRating', verifyToken, AdminController.getRating);
router.get('/getTotalIncome', verifyToken, AdminController.getTotalIncome);
router.get('/checkUsername', verifyToken, AdminController.checkUsername);
router.get('/checkPhone', verifyToken, AdminController.checkPhone);
router.get('/checkEmail', verifyToken, AdminController.checkEmail);

module.exports = router;
