const mongoose = require('mongoose');
module.exports = function() {
    // const uri = 'mongodb://localhost/amirshayan'; 
    const uri = "mongodb+srv://amirshasyan:5DCVExiSiz18jvKm@cluster0.30uuz.mongodb.net/amirshayan?retryWrites=true&w=majority"; 
    const db = mongoose.connect(uri);
    require('../models/schemas/user.');
    require('../models/schemas/contact');
    return db;
};