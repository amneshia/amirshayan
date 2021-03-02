const { body, validationResult, checkSchema } = require('express-validator');
const mongoose = require('mongoose');
const Contact = mongoose.model('Contact');

exports.index = async (req, res, next) => {
    return await Contact.find({ userId: req.user._id })
        .then(contacts => res.render('contacts', { contacts: contacts }))
        .catch(next);
};

exports.new = (req, res, next) => {
    res.render('contact_new', {});
};

const contactFormValidator = checkSchema({
    name: {
        isLength: {
            errorMessage: 'Contact name must be atleast 1 character.',
            options: { min: 1 },
        }
    },
    email: {
        isUppercase: {
            errorMessage: 'Email must be in lower-case.',
            negated: true,
        },
        isEmail: {
            errorMessage: 'Please provide a valid email address',
        },
    },
    phone: {
        matches: {
            errorMessage: 'Please provide a valid phone number.',
            // Simple regex that matches whitespaces, "+" at the beginning, and digits
            options: /^(\s*)\+?(\d\s*)+$/,
            trim: true
        },
    }
});

exports.create = [
    contactFormValidator,
    async (req, res, next) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            const errStrings = result.errors.map(e => e.msg);
            req.flash("error", errStrings);
            req.flash("form", req.body);
            res.status(400).redirect("/contacts/new");
        } else {
            const dbErrors = await Contact.exists({ email: req.body.email })
                .then(exists => exists ? ["A contact with that email already exists."] : []);
            if (dbErrors.length === 0) {
                // Create the user along with me as their first contact.
                req.body.userId = req.user._id;
                return await new Contact(req.body).save()
                    .then(_ => res.status(201).redirect("/contacts"))
                    .catch(next);
            } else {
                req.flash("error", dbErrors);
                req.flash("form", req.body);
                res.status(400).redirect("/contacts/new");
            }
        }
    }];

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

exports.update = [
    contactFormValidator,
    async (req, res, next) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            const errStrings = result.errors.map(e => e.msg);
            req.flash("error", errStrings);
            req.flash("form", req.body);
            res.status(400).redirect(`/contacts/${req.params.contactId}`);
        } else {
            return await Contact.findOne({ _id: req.params.contactId })
                .then(contact => {
                    if (contact && contact.userId.equals(req.user._id)) {
                        const emailTakenPromise =
                            (req.body.email === contact.email) ?
                                Promise.resolve(false) :
                                Contact.exists({ email: req.body.email });
                        return emailTakenPromise.then(emailTaken => {
                            if (emailTaken) {
                                req.flash("error", "A contact with that email already exists.");
                                req.flash("form", req.body);
                                return res.status(400).redirect(`/contacts/${req.params.contactId}`);
                            } else {
                                return contact.set(req.body).save()
                                    .then(err => res.status(200).redirect("/contacts"));
                            }
                        })
                    } else if (contact) {
                        //For now we will handle these cases by redirecting the user.
                        return res.status(403).redirect("/contacts");
                    } else {
                        //For now we will handle these cases by redirecting the user.
                        return res.status(200).redirect("/contacts");
                    }
                })
                .catch(next);
        }
    }];

exports.delete = async (req, res, next) => {
    return await Contact.findOne({ _id: req.params.contactId })
        .then(contact => {
            if (contact && contact.userId.equals(req.user._id)) {
                return contact.delete()
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