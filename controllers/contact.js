const mongoose = require('mongoose');
const Contact = mongoose.model('Contact');

exports.index = function(req, res, next) {
    res.render('contacts', {});
};

exports.new = function(req, res, next) {
    res.render('contact_edit', {});
};

exports.create = function(req, res, next) {
    
};

exports.edit = function(req, res, next) {
    res.render('contact_edit', {});
};

exports.update = function(req, res, next) {

};

exports.delete = function(req, res, next) {
    
};