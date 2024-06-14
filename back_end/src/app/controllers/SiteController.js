const Account = require('../models/Account.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { multipleMongooseToObject } = require('../../util/mongoose');
const JWT_SECRET = 'your_jwt_secret_key';
class SiteController {
    // [GET] /
    index(req, res, next) {
    }

    // [POST] /login
    async logIn(req, res, next) {
        const { username, password } = req.body;

        try {
            const account = await Account.findOne({ username });
            if (!account) {
                return res.status(401).json({ message: 'Wrong username or password' });
            }

            const isMatch = await account.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Wrong username or password' });
            }
            const token = jwt.sign({ id: account._id, username: account.username }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ message: 'Login successful', token });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    // [POST] /signup
    async signUp(req, res, next) {
        try {
            let { username, password } = req.body;
            const existAccount = await Account.findOne({ username });
            if (existAccount) {
                return res.status(401).json({ message: 'User already exists. Please choose a different username.' });
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newAccount = new Account({
                username,
                password: hashedPassword,
                role: 'User',
                isAdmin: false
            });

            const savedAccount = await newAccount.save();

            const token = jwt.sign({ id: savedAccount._id, username: savedAccount.username }, JWT_SECRET, { expiresIn: '1h' });

            res.status(201).json({ message: 'User registered successfully', token });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

module.exports = new SiteController();
