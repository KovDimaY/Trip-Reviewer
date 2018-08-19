const bcrypt = require('bcrypt');

const SALT_I = 10;

const encryptPassword = function(rawPassword, callback) {
    bcrypt.genSalt(SALT_I, function(err, salt) {
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