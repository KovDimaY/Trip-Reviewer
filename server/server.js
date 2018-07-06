const express = require('express');
const colors = require('colors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const config = require('./config/config').get(process.env.NODE_ENV);

const app = express();
const port = process.env.PORT || 3001;

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

app.use(bodyParser.json());
app.use(cookieParser());

const { User } = require('./models/user');
const { Trip } = require('./models/trip');


// GET //

// localhost:3001/api/getTrip?id=5b3f851338c4fc09f4487b24
app.get('/api/getTrip', (req,res) => {
    let id = req.query.id;

    Trip.findById(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    });
});

// locahost:3001/api/getManyTrips?skip=3&limit=2&order=asc
app.get('/api/getManyTrips', (req,res) => {
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order === 'desc' ? 'desc' : 'asc';

    // ORDER = asc || desc
    Trip.find().skip(skip).sort({_id: order}).limit(limit).exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    })
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

// UPDATE //

// DELETE //

app.listen(port, ()=>{
    console.log(`Server is running on the localhost:${port}`.rainbow)
})