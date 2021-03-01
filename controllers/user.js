const { body, validationResult, checkSchema } = require('express-validator');
const User = require('mongoose').model('User');
const passport = require('passport');

exports.create = [
    checkSchema({
        password: {
            isLength: {
                errorMessage: 'Password must be at least 6 characters long.',
                // Multiple options would be expressed as an array
                options: { min: 6 },
            },
        },
        username: {
            isAlphanumeric: {
                errorMessage: 'Only lower-case letters and numbers accepted as Username.'
            },
            isLength: {
                errorMessage: 'Username must be at least 3 characters long.',
                // Multiple options would be expressed as an array
                options: { min: 3 },
            },
            isUppercase: {
                errorMessage: 'Username must be in lower-case.',
                // To negate a validator
                negated: true,
            }
        },
        // Support bail functionality in schemas
        email: {
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
                .then(exists => {
                    if (exists) {
                        return ["A user with that username already exists."];
                    } else {
                        return [];
                    }
                });
            const emailCheck = await User.exists({ email: req.body.email })
                .then(exists => {
                    if (exists) {
                        return ["A user with that email already exists."];
                    } else {
                        return [];
                    }
                });
            const dbErrors = usernameCheck.concat(emailCheck);
            if (dbErrors.length === 0) {
                new User(req.body).save(err => {
                    if (err) {
                        return next(err);
                    } else {
                        res.status(201).redirect("/login");
                    }
                });
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