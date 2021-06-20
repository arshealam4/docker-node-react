'use strict';

const mongoose = require('mongoose');
const config = require('config');

mongoose.connect('mongodb://localhost:27017/demo');

mongoose.Promise = global.Promise;

let db = mongoose.connection;

db.on('connected', function() {
    console.log('[Server]', 'Connection with MongoDB installed');
});

db.on('error', function(err) {
    console.log('++++++ [error] ++++++', err);
});

module.exports = db;
