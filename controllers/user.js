const { body, validationResult, checkSchema } = require('express-validator');
const Mongoose = require("mongoose");
const User = Mongoose.model('User');
const Contact = Mongoose.model('Contact');
const passport = require('passport');
const myContactInfo = require("../models/my-contact-info");

exports.create = [
    checkSchema({
        password: {
            isLength: {
                errorMessage: 'Password must be at least 6 characters long.',
                options: { min: 6 },
            },
        },
        username: {
            isAlphanumeric: {
                errorMessage: 'Only lower-case letters and numbers accepted as Username.'
            },
            isLength: {
                errorMessage: 'Username must be at least 3 characters long.',
                options: { min: 3 },
            },
            isUppercase: {
                negated: true,
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
    }),
    async (req, res, next) => {
        await body('password-confirmation')
            .equals(req.body.password)
            .withMessage('Passwords do not match')
            .run(req);
        return next();
    },
    async (req, res, next) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            const errStrings = result.errors.map(e => e.msg);
            req.flash("error", errStrings);
            req.flash("form", req.body);
            res.status(400).redirect("/signup");
        } else {
            const usernameCheck = await User.exists({ username: req.body.username })
                .then(exists => exists ? ["A user with that username already exists."] : []);
            const emailCheck = await User.exists({ email: req.body.email })
                .then(exists => exists ? ["A user with that email already exists."] : []);
            const dbErrors = usernameCheck.concat(emailCheck);
            if (dbErrors.length === 0) {
                // Create the user along with me as their first contact.
                return await new User(req.body).save()
                .then(user => {
                    return new Contact({
                        userId: user._id,
                        name: myContactInfo.name,
                        email: myContactInfo.email,
                        phone: myContactInfo.phone
                    }).save();
                })
                .then(_ => res.status(201).redirect("/login"))
                .catch(next);
            } else {
                req.flash("error", dbErrors);
                req.flash("form", req.body);
                res.status(400).redirect("/signup");
            }
        }
    }];

exports.login = function (req, res, next) {
    const url = req.body.redirectURL;
    passport.authenticate('local', {
        successRedirect: url ? url : "/contacts",
        failureRedirect: '/login',
        failureFlash: "Invalid username or password.",
        session: true
    })(req, res, next)
}

exports.logout = function (req, res, next) {
    req.logout();
    res.redirect('/');
}