const express = require('express');
const colors = require('colors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const uuid = require('uuid');

const config = require('./config/config').get(process.env.NODE_ENV);
const encryptPassword = require('./helpers/auth').encryptPassword;

const app = express();
const port = process.env.PORT || 3001;
const adminMail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('client/build'));

const { User } = require('./models/user');
const { Trip } = require('./models/trip');
const { auth } = require('./middleware/auth');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: adminMail,
      pass: adminPassword
    }
});


// GET //
app.get('/api/auth', auth, (req, res) => {
    res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname
    });
});

// localhost:3001/api/getTrip?id=5b3f851338c4fc09f4487b24
app.get('/api/getTrip', (req, res) => {
    const id = req.query.id;

    Trip.findById(id, (err, doc) => {
        if (err) return res.status(400).send(err);

        res.send(doc);
    });
});

// locahost:3001/api/getManyTrips?skip=3&limit=2&order=asc
app.get('/api/getManyTrips', (req, res) => {
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const order = req.query.order === 'desc' ? 'desc' : 'asc';

    // ORDER = asc || desc
    Trip.find().skip(skip).sort({ _id: order }).limit(limit).exec((err, doc) => {
        if (err) return res.status(400).send(err);

        res.send(doc);
    })
});

// locahost:3001/api/getReviewer?id=5b40f519c1632805acd50639
app.get('/api/getReviewer', (req, res) => {
    const id = req.query.id;

    User.findById(id, (err, doc) => {
        if (err) return res.status(400).send(err);

        res.json({
            name: doc.name,
            lastname: doc.lastname
        });
    });
});

app.get('/api/users', (req, res) => {
    User.find({}, (err, rawUsers) => {
        if (err) return res.status(400).send(err);
        const users = rawUsers.map((user) => ({
            _id: user._id,
            lastname: user.lastname,
            name: user.name,
            avatar: user.avatar
        }));

        res.status(200).send(users);
    });
});

// locahost:3001/api/getUserReviews?user=5b40f519c1632805acd50639
app.get('/api/getUserReviews', (req, res) => {
    Trip.find({ ownerId: req.query.user }).exec((err, docs) => {
        if (err) return res.status(400).send(err);

        res.send(docs);
    });
});


app.get('/api/logout', auth, (req, res) => {
    req.user.deleteToken(req.token, (err, user) => {
        if (err) return res.status(400).send(err);

        res.sendStatus(200);
    });
});


// POST //
app.post('/api/trip', (req, res) => {
    const trip = new Trip(req.body);

    trip.save((err, doc) => {
        if (err) return res.status(400).send(err);
        
        res.status(200).json({
            post: true,
            tripId: doc._id
        });
    });
});

app.post('/api/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        
        user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);

            res.cookie('auth', user.token).json({
                success: true,
                id: user._id
            });
        });
    });
});

app.post('/api/login', (req, res) => {
    User.findOne({ 'email': req.body.email }, (err, user) => {
        if (!user) return res.json({ isAuth: false, message: 'Auth failed, email not found'});

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({
                isAuth: false,
                message: 'Wrong password'
            });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                res.cookie('auth', user.token).json({
                    isAuth: true,
                    id: user._id
                });
            });
        });
    });
});


// UPDATE //
app.post('/api/tripUpdate', (req, res) => {
    Trip.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
        if (err) return res.status(400).send(err);
        
        res.json({
            success: true,
            doc
        });
    });
});

app.post('/api/resetPassword', (req, res) => {
    const newPassword = uuid();

    encryptPassword(newPassword, (err, encrypted) => {
        if (err) return res.json({ success: false, message: err });

        User.findOneAndUpdate({ email: req.body.email }, { password: encrypted }, (err, user) => {
            if (err) return res.json({ success: false, message: err });
            if (!user) return res.json({ success: false, message: 'Request failed, email not found'});
            
            const mailOptions = {
                from: `"Admin TripReview" <${adminMail}>`,
                to: req.body.email,
                subject: 'Reset Password',
                text: `Your new password is ${newPassword}`
            };
              
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                    return res.json({ success: false, error });
                } else {
                    console.log('Email sent: ' + info.response);
                    return res.json({ success: true, info: info.response, message: 'New password is sent to your email' });
                }
            });
        });
    });
});


// DELETE //

// localhost:3001/api/tripDelete?id=5b3f851338c4fc09f4487b24
app.delete('/api/tripDelete', (req, res) => {
    const id = req.query.id;

    Trip.findByIdAndRemove(id, (err, doc) => {
        if(err) return res.status(400).send(err);

        res.json(true);
    });
});

if (process.env.NODE_ENV === 'production') {
    const path = require('path');

    app.get('/*', (req, res) => {
        res.sendfile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    })
}


// SERVE //
app.listen(port, () => {
    console.log(`Server is running on the localhost:${port}`.rainbow);
});