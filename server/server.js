const express = require('express');
const colors = require('colors'); // eslint-disable-line no-unused-vars
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const generator = require('generate-password');
const path = require('path');

const config = require('./config/config').get(process.env.NODE_ENV);
const { encryptPassword } = require('./helpers/auth');
const { updateModelAndSendEmail, generateResetPasswordTemplate } = require('./helpers/mailing');

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
    pass: adminPassword,
  },
});

// GET //
app.get('/api/auth', auth, (req, res) => {
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    avatar: req.user.avatar,
  });
});

// localhost:3001/api/getTrip?id=5b3f851338c4fc09f4487b24
app.get('/api/getTrip', (req, res) => {
  const { id } = req.query;

  Trip.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    if (!doc) return res.status(400).send({ error: 'Document not found' });

    return res.send(doc);
  });
});

// locahost:3001/api/getManyTrips?skip=3&limit=2&order=asc
app.get('/api/getManyTrips', (req, res) => {
  const skip = parseInt(req.query.skip, 10);
  const limit = parseInt(req.query.limit, 10);
  const order = req.query.order === 'desc' ? 'desc' : 'asc';

  // ORDER = asc || desc
  Trip.find()
    .skip(skip)
    .sort({ _id: order })
    .limit(limit)
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);

      return res.send(doc);
    });
});

// locahost:3001/api/getReviewer?id=5b40f519c1632805acd50639
app.get('/api/getReviewer', (req, res) => {
  const { id } = req.query;

  User.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);

    return res.json({
      name: doc.name,
      lastname: doc.lastname,
    });
  });
});

app.get('/api/users', (req, res) => {
  User.find({}, (err, rawUsers) => {
    if (err) return res.status(400).send(err);

    const users = rawUsers.map(user => ({
      _id: user._id,
      lastname: user.lastname,
      name: user.name,
      avatar: user.avatar,
    }));

    return res.status(200).send(users);
  });
});

// locahost:3001/api/getUserReviews?user=5b40f519c1632805acd50639
app.get('/api/getUserReviews', (req, res) => {
  Trip.find({ ownerId: req.query.user }).exec((err, docs) => {
    if (err) return res.status(400).send(err);

    return res.send(docs);
  });
});

app.get('/api/logout', auth, (req, res) => {
  req.user.deleteToken(req.token, err => {
    if (err) return res.status(400).send(err);

    return res.sendStatus(200);
  });
});

// POST //
app.post('/api/trip', (req, res) => {
  const trip = new Trip(req.body);

  trip.save((err, doc) => {
    if (err) {
      return res.status(200).json({
        success: false,
        error: err,
      });
    }

    return res.status(200).json({
      success: true,
      tripId: doc._id,
    });
  });
});

app.post('/api/register', (req, res) => {
  const user = new User(req.body);

  user.save(err1 => {
    if (err1) return res.json({ success: false, error: err1 });

    return user.generateToken((err2, doc) => {
      if (err2) return res.status(400).send(err2);

      return res.cookie('auth', doc.token).json({
        success: true,
        id: doc._id,
      });
    });
  });
});

app.post('/api/login', (req, res) => {
  // eslint-disable-next-line consistent-return
  User.findOne({ email: req.body.email }, (err1, user) => {
    if (err1) return res.status(400).send(err1);
    if (!user) {
      return res.json({
        isAuth: false,
        error: {
          field: 'email',
          message: 'Email not found',
        },
      });
    }

    // eslint-disable-next-line consistent-return
    user.comparePassword(req.body.password, (err2, isMatch) => {
      if (err2) return res.status(400).send(err2);
      if (!isMatch) {
        return res.json({
          isAuth: false,
          error: {
            field: 'password',
            message: 'Wrong password',
          },
        });
      }

      user.generateToken((err3, doc) => {
        if (err3) return res.status(400).send(err3);

        return res.cookie('auth', doc.token).json({
          isAuth: true,
          id: doc._id,
        });
      });
    });
  });
});

// UPDATE //
app.post('/api/tripUpdate', (req, res) => {
  Trip.findByIdAndUpdate(req.body._id, req.body, { new: true, runValidators: true }, (err, doc) => {
    if (err) {
      return res.status(200).json({
        success: false,
        error: err,
      });
    }

    return res.json({
      success: true,
      doc,
    });
  });
});

app.post('/api/userUpdate', (req, res) => {
  const { _id, name, lastname, email, avatar, oldPassword, newPassword, repeatPassword } = req.body;
  const fieldsToUpdate = {
    name,
    lastname,
    avatar,
  };

  // eslint-disable-next-line consistent-return
  User.findById(_id, (err1, user) => {
    if (err1) return res.status(400).send(err1);

    if (req.body.oldPassword) {
      // eslint-disable-next-line consistent-return
      user.comparePassword(oldPassword, (err2, isMatch) => {
        if (err2) return res.status(400).send(err2);

        if (!isMatch) {
          return res.json({
            success: false,
            error: {
              errors: {
                oldPassword: {
                  message: 'Wrong current password',
                },
              },
            },
          });
        }

        if (newPassword || repeatPassword) {
          const newPassCorrect = newPassword === repeatPassword && newPassword.length > 5;
          if (newPassCorrect) {
            encryptPassword(newPassword, (err3, encrypted) => {
              if (err3) return res.status(400).send(err3);

              fieldsToUpdate.email = email;
              fieldsToUpdate.password = encrypted;

              return updateModelAndSendEmail(
                User,
                _id,
                fieldsToUpdate,
                res,
                transporter,
                {
                  adminMail,
                  mailTo: user.email,
                  name,
                  lastname,
                  avatar,
                  email,
                  newPassword,
                },
                user
              );
            });
          } else {
            const errors = {};
            if (newPassword.length < 6) {
              errors.newPassword = {
                message: 'New password should be at least 6 characters',
              };
            } else {
              errors.repeatPassword = {
                message: 'Passwords are not the same',
              };
            }
            return res.json({
              success: false,
              error: {
                errors,
              },
            });
          }
        } else {
          fieldsToUpdate.email = email;

          updateModelAndSendEmail(
            User,
            _id,
            fieldsToUpdate,
            res,
            transporter,
            {
              adminMail,
              mailTo: user.email,
              name,
              lastname,
              avatar,
              email,
              newPassword: null,
            },
            user
          );
        }
      });
    } else {
      User.findByIdAndUpdate(_id, fieldsToUpdate, { new: true, runValidators: true }, err4 => {
        if (err4) return res.json({ success: false, error: err4 });

        return res.json({
          success: true,
        });
      });
    }
  });
});

app.post('/api/resetPassword', (req, res) => {
  const newPassword = generator.generate({
    length: 10,
    numbers: true,
  });
  encryptPassword(newPassword, (err1, encrypted) => {
    if (err1) return res.json({ success: false, message: err1 });

    return User.findOneAndUpdate(
      { email: req.body.email },
      { password: encrypted },
      (err2, user) => {
        if (err2) return res.json({ success: false, message: err2 });
        if (!user) return res.json({ success: false, message: 'Request failed, email not found' });

        const mailOptions = {
          from: `"Admin TripReview" <${adminMail}>`,
          to: req.body.email,
          subject: 'Reset Password',
          html: generateResetPasswordTemplate(user, newPassword),
        };

        return transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error); // eslint-disable-line no-console
            return res.json({ success: false, error });
          }
          console.log(`Email sent: ${info.response}`); // eslint-disable-line no-console
          return res.json({
            success: true,
            info: info.response,
            message: 'New password is sent to your email',
          });
        });
      }
    );
  });
});

// DELETE //

// localhost:3001/api/tripDelete?id=5b3f851338c4fc09f4487b24
app.delete('/api/tripDelete', (req, res) => {
  const { id } = req.query;

  Trip.findByIdAndRemove(id, err => {
    if (err) return res.status(400).send(err);

    return res.json(true);
  });
});

if (process.env.NODE_ENV === 'production') {
  app.get('/*', (req, res) => {
    res.sendfile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

// SERVE //
app.listen(port, () => {
  console.log(`Server is running on the localhost:${port}`.rainbow); // eslint-disable-line no-console
});
