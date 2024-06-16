const Account = require('../models/Account.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redisClient = require('../../config/redis/redisClient.js');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

class SiteController {
    // [GET] /
    index(req, res, next) {
        res.send('Welcome to the homepage!');
    }

    // [POST] /signup
    async signUp(req, res, next) {
        try {
            let { username, password } = req.body;
            const existAccount = await Account.findOne({ username });
            if (existAccount) {
                return res.status(409).json({ message: 'User already exists. Please choose a different username.' });
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

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Signup Error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // [POST] /login
    async logIn(req, res, next) {
        const { username, password } = req.body;

        try {
            const account = await Account.findOne({ username });

            if (!account) {
                return res.status(401).json({ message: 'Wrong username or password' });
            }

            const isMatch = await bcrypt.compare(password, account.password);

            if (!isMatch) {
                return res.status(401).json({ message: 'Wrong username or password' });
            }

            const token = jwt.sign({ id: account._id, username: account.username }, JWT_SECRET, { expiresIn: '15m' });
            const refreshToken = jwt.sign({ id: account._id, username: account.username }, JWT_REFRESH_SECRET, { expiresIn: '7d' });

            redisClient.set(username, refreshToken, 'EX', 7 * 24 * 60 * 60);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
            })

            const user = account.toObject();
            delete user.password;
            res.json({ message: 'Login successful', user, token });
        } catch (error) {
            console.error('Login Error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // [POST] /refresh
    async requestRefreshToken(req, res, next) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: 'You are not authenticated' });
        }
        try {
            jwt.verify(refreshToken, JWT_REFRESH_SECRET, async (err, account) => {
                if (err) {
                    res.status(403).json('Token is not valid');
                }
                const username = account.username.toString();

                const result = await redisClient.get(username);

                if (result !== refreshToken) {
                    console.error('Refresh token does not match');
                    return res.status(403).json({ message: 'Refresh token is not valid' });
                }

                const newAccessToken = jwt.sign({ id: account._id, username: account.username }, JWT_SECRET, { expiresIn: '15m' });
                const newRefreshToken = jwt.sign({ id: account._id, username: account.username }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
                await redisClient.set(username, newRefreshToken, 'EX', 7 * 24 * 60 * 60);
                res.cookie('refreshToken', newRefreshToken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'strict',
                });
                res.status(200).json({ accessToken: newAccessToken });
            });
        } catch (error) {
            console.error('Refresh Token Error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    
    //POST /logout
    async logOut(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken;
            jwt.verify(refreshToken, JWT_REFRESH_SECRET, async (err, account) => {
                if (err) {
                    console.error('JWT verify error:', err);
                    return res.status(403).json({ message: 'Token is not valid' });
                }

                const username = account.username.toString();
                const response = await redisClient.del(username);
                if (response !== 1) {
                    console.error('Redis del error');
                    return res.status(500).json({ message: 'Logout failed' });
                }

                res.clearCookie('refreshToken');
                return res.status(200).json({ message: 'Logout successful' });
            });
        } catch (error) {
            console.error('Logout Error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new SiteController();
