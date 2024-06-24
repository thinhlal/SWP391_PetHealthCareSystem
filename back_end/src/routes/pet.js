const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../app/controllers/MiddlewareController');

const petController = require('../app/controllers/PetController');

router.post('/add', verifyToken, checkRole(['Customer']), petController.add);
router.post('/', verifyToken, checkRole(['Customer']), petController.index);

module.exports = router;
