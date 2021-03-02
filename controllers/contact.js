const mongoose = require('mongoose');
const Contact = mongoose.model('Contact');

exports.index = async (req, res, next) => {
    return await Contact.find({ userId: req.user._id })
        .then(contacts => res.render('contacts', { contacts: contacts }))
        .catch(next);
};

exports.new = (req, res, next) => {
    res.render('contact_edit', {});
};

exports.create = (req, res, next) => {

};

exports.edit = async (req, res, next) => {
    return await Contact.findOne({ _id: req.params.contactId })
        .then(contact => {
            if (contact && contact.userId.equals(req.user._id)) {
                return res.render('contact_edit', { contact: contact });
            } else if (contact) {
                //For now we will handle these cases by redirecting the user.
                return res.status(403).redirect("/contacts");
            } else {
                //For now we will handle these cases by redirecting the user.
                return res.status(404).redirect("/contacts");
            }
        })
        .catch(next);
};

exports.update = (req, res, next) => {

};

exports.delete = async (req, res, next) => {
    return await Contact.findOne({ _id: req.params.contactId })
        .then(contact => {
            if (contact && contact.userId.equals(req.user._id)) {
                return new Contact(contact).delete()
                    .then(err => res.status(200).redirect("/contacts"));
            } else if (contact) {
                //For now we will handle these cases by redirecting the user.
                return res.status(403).redirect("/contacts");
            } else {
                //For now we will handle these cases by redirecting the user.
                return res.status(200).redirect("/contacts");
            }
        })
        .catch(next);
};