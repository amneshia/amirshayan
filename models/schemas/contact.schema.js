const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const ContactSchema = new Schema({
    name: String,
    email: String,
    number: String
});
mongoose.model('Contact', ContactSchema);