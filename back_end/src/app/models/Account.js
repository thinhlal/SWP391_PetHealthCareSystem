const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

const Schema = mongoose.Schema;

const Account = new Schema({
    username: {
        type: String,
        required: true,
        maxlength: 25,
        unique: true
    },
    password: {
        type: String,
        required: true,
        maxlength: 25
    },
    role: {
        type: String,
        required: true,
        maxlength: 25
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

Account.pre('save', async function (next) {
    if (!this.accountID) {
        let newID;
        let isUnique = false;
        while (!isUnique) {
            newID = shortid.generate().slice(0, 8);
            const existingAccount = await mongoose.models.Account.findOne({ accountID: newID });
            if (!existingAccount) {
                isUnique = true;
            }
        }
        this.accountID = newID;
    }
    next();
});

Account.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Account', Account);
