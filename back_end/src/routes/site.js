const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.post('/login', siteController.logIn);
router.post('/signup', siteController.signUp);
router.get('/', siteController.index);

module.exports = router;
