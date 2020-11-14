const bcrypt = require('bcryptjs');

const auth = require('./../constants/auth');

const encryptPassword = (rawPassword, callback) => {
  bcrypt.genSalt(auth.USER_SALT_I, (err1, salt) => {
    if (err1) return callback(err1);

    return bcrypt.hash(rawPassword, salt, (err2, hash) => {
      if (err2) return callback(err2);

      return callback(null, hash);
    });
  });
};

module.exports = {
  encryptPassword,
};
