const express = require('express');
const colors = require('colors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const config = require('./config/config').get(process.env.NODE_ENV);

const app = express();
const port = process.env.PORT || 3001;

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE)

app.use(bodyParser.json());
app.use(cookieParser());

app.listen(port, ()=>{
    console.log(`Server is running on the localhost:${port}`.rainbow)
})