const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('./../config/config').get(process.env.NODE_ENV);
const auth = require('./../constants/auth');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: [ true, 'Email is required'],
        unique: 1
    },
    password: {
        type: String,
        required: [ true, 'Password is required'],
        minlength: [ 6, 'Should be at least 6 chars']
    },
    name: {
        type: String,
        trim: true,
        required: [ true, 'Name is required'],
        minlength: [ 3, 'Should be at least 3 chars'],
        maxlength: [ 100, 'Should be 100 chars at most']
    },
    lastname: {
        type: String,
        trim: true,
        required: [ true, 'Last name is required'],
        minlength: [ 3, 'Should be at least 3 chars'],
        maxlength: [ 100, 'Should be 100 chars at most']
    },
    avatar: {
        type: String,
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    }
});

userSchema.pre('save', function(next) {
    const user = this;

    if(user.isModified('password')) {
        bcrypt.genSalt(auth.USER_SALT_I, function(err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.post('save', function(error, doc, next) {
    if (error.code === 11000) {
        const customError = new Error();
        customError.errors = {
            email: {
                message: 'This email already exists',
                path: 'email',
                name: 'PostSaveError',
                kind: 'unique'
            }
        };
        next(customError);
    } else {
        next(error);
    }
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    const user = this;

    bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

userSchema.methods.generateToken = function(callback) {
    const user = this;
    const token = jwt.sign(user._id.toHexString(), config.SECRET);

    user.token = token;
    user.save(function(err, user) {
        if (err) return callback(err);
        callback(null, user)
    });
};

userSchema.statics.findByToken = function(token, callback) {
    const user  = this;

    jwt.verify(token, config.SECRET, function(err, decode) {
        user.findOne({ "_id": decode, "token": token }, function(err, user) {
            if (err) return callback(err);
            callback(null, user);
        });
    });
};

userSchema.methods.deleteToken = function(token, callback) {
    var user = this;

    user.update({ $unset: { token: 1 } }, (err, user) => {
        if (err) return callback(err);

        callback(null,user)
    });
};


const User = mongoose.model('User', userSchema);

module.exports = { User };