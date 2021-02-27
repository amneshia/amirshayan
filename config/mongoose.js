const mongoose = require('mongoose');
module.exports = function() {
    const db = mongoose.connect('mongodb://localhost/amirshayan');
    require('../models/schemas/user.');
    require('../models/schemas/contact');
    return db;
};
