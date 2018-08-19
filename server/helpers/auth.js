const bcrypt = require('bcrypt');

const auth = require('./../constants/auth');

const encryptPassword = function(rawPassword, callback) {
    bcrypt.genSalt(auth.USER_SALT_I, function(err, salt) {
        if (err) return callback(err);

        bcrypt.hash(rawPassword, salt, function(err, hash) {
            if (err) return callback(err);

            callback(null, hash);
        });
    });
};

module.exports = {
    encryptPassword: encryptPassword
}