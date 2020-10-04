const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('./../config/config').get(process.env.NODE_ENV);
const auth = require('./../constants/auth');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Should be at least 6 chars'],
  },
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required'],
    minlength: [2, 'Should be at least 2 chars'],
    maxlength: [100, 'Should be 100 chars at most'],
    validate: {
      validator(v) {
        return /^([^0-9]*)$/.test(v);
      },
      message: 'Digits are not allowed',
    },
  },
  lastname: {
    type: String,
    trim: true,
    required: [true, 'Last name is required'],
    minlength: [2, 'Should be at least 2 chars'],
    maxlength: [100, 'Should be 100 chars at most'],
    validate: {
      validator(v) {
        return /^([^0-9]*)$/.test(v);
      },
      message: 'Digits are not allowed',
    },
  },
  avatar: {
    type: String,
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
});

// eslint-disable-next-line consistent-return
userSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(auth.USER_SALT_I, (err1, salt) => {
      if (err1) return next(err1);

      return bcrypt.hash(user.password, salt, (err2, hash) => {
        if (err2) return next(err2);
        user.password = hash;
        return next();
      });
    });
  } else {
    return next();
  }
});

userSchema.post('save', (error, doc, next) => {
  if (error.code === 11000) {
    const customError = new Error();

    customError.errors = {
      email: {
        message: 'This email already exists',
        path: 'email',
        name: 'PostSaveError',
        kind: 'unique',
      },
    };

    next(customError);
  } else {
    next(error);
  }
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  const user = this;

  bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
    if (err) return callback(err);
    return callback(null, isMatch);
  });
};

userSchema.methods.generateToken = function (callback) {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), config.SECRET);

  user.token = token;
  user.save((err, doc) => {
    if (err) return callback(err);
    return callback(null, doc);
  });
};

userSchema.statics.findByToken = function (token, callback) {
  const user = this;

  jwt.verify(token, config.SECRET, (err1, decode) => {
    user.findOne({ _id: decode, token }, (err2, doc) => {
      if (err2) return callback(err2);
      return callback(null, doc);
    });
  });
};

userSchema.methods.deleteToken = function (token, callback) {
  const user = this;

  user.update({ $unset: { token: 1 } }, (err, doc) => {
    if (err) return callback(err);

    return callback(null, doc);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
