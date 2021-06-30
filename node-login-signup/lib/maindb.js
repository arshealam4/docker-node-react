'use strict';

const mongoose = require('mongoose');
const config = require('config');

mongoose.connect('mongodb://db:27017/demo');

mongoose.Promise = global.Promise;

let db = mongoose.connection;

// Retry connection
const connectWithRetry = () => {
    console.log('MongoDB connection with retry')
    mongoose.connect('mongodb://db:27017/demo');
}

db.on('connected', function() {
    console.log('[Server]', 'Connection with MongoDB installed');
});

db.on('error', function(err) {
    console.log('++++++ [error] ++++++', err);
    setTimeout(connectWithRetry, 5000)
});

module.exports = db;
