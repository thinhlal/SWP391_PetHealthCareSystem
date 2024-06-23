const express = require('express');
const router = express.Router();
const MiddlewareController = require('../app/controllers/MiddlewareController');

const petController = require('../app/controllers/PetController');

router.post('/add', MiddlewareController.verifyToken, petController.add);
router.post('/', MiddlewareController.verifyToken, petController.index);

module.exports = router;
