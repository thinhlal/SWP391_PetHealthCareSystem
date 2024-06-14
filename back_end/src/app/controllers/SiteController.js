const Account = require('../models/Account.js');
const bcrypt = require('bcrypt');
const { multipleMongooseToObject } = require('../../util/mongoose');

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

            res.json({ message: 'Login successful' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    // [POST] /signup
    async signUp(req, res, next) {
        try {
            let { username, password } = req.body;

            // Kiểm tra xem username đã tồn tại hay chưa
            const existAccount = await Account.findOne({ username });
            if (existAccount) {
                return res.status(401).json({ message: 'User already exists. Please choose a different username.' });
            }

            // Mã hóa mật khẩu
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Tạo tài khoản mới
            const newAccount = new Account({
                username,
                password: hashedPassword,
                role: 'User',
                isAdmin: false
            });

            // Lưu tài khoản vào cơ sở dữ liệu
            const savedAccount = await newAccount.save();

            // Tạo JWT token
            //const token = jwt.sign({ id: savedAccount._id, username: savedAccount.username }, JWT_SECRET, { expiresIn: '1h' });

            // Trả về phản hồi thành công với token
            //res.status(201).json({ message: 'User registered successfully', token });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

module.exports = new SiteController();
