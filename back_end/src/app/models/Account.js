const mongoose = require('mongoose');
const slugify = require('slug');
const Schema = mongoose.Schema;

const Account = new Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      maxlength: 255,
    },
    role: {
      type: String,
      required: true,
      maxlength: 25,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

Account.pre('save', function (next) {
  if (this.isModified('username') || this.isNew) {
    this.slug = slugify(this.username, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Account', Account);
