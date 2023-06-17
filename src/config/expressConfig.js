const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const {auth} = require('../middleware/authMiddleware');

function expressConfig(app) {
    app.use(express.static(path.resolve(__dirname, '../')));
    app.use(express.urlencoded({ extended: false}));
    app.use(cookieParser());
    app.use(auth);
}

module.exports = expressConfig; 