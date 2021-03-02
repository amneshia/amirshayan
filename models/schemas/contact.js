const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const ContactSchema = new Schema({
    userId: Schema.Types.ObjectId,
    name: String,
    email: String,
    phone: String
});
mongoose.model('Contact', ContactSchema);