const mongoose = require('mongoose');
const User = mongoose.model('User');
const Contact = mongoose.model('Contact');

exports.index = function(req, res, next) {
    res.render('contacts', {});
};

exports.find = function(req, res, next) {
    res.render('contacts', {});
};

exports.update = function(req, res, next) {
    res.render('contacts', {});
};

exports.delete = function(req, res, next) {
    res.render('contacts', {});
};