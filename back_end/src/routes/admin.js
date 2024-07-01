const express = require('express');
const router = express.Router();

const { verifyToken } = require('../app/controllers/MiddlewareController');
const AdminController = require('../app/controllers/AdminController');

router.get('/getAllBookings', verifyToken, AdminController.getAllBookings);
router.post('/add', verifyToken, AdminController.add);
router.post('/', verifyToken, AdminController.index);

module.exports = router;
