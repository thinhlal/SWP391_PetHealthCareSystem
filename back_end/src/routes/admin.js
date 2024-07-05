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
router.get('/getAllRates', verifyToken, AdminController.getAllRates);
router.get('/getAllAccounts', verifyToken, AdminController.getAllAccounts);
router.get('/getRating', verifyToken, AdminController.getRating);
router.get('/getTotalIncome', verifyToken, AdminController.getTotalIncome);
router.post('/add', verifyToken, AdminController.add);
router.post('/', verifyToken, AdminController.index);

module.exports = router;
