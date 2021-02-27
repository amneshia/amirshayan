const User = require('mongoose').model('User');
const passport = require('passport');

exports.create = function (req, res, next) {
    const user = new User(req.body);
    user.save((err) => {
        if (err) {
            return next(err);
        } else {
            res.status(200).json(user);
        }
    });
};

exports.login = function (req, res, next) {
    const url = req.body.redirectURL;
    console.log(url);
    passport.authenticate('local', {
        successRedirect: url ? url : "/",
        failureRedirect: '/login',
        failureFlash: true,
        session: true
    })(req,res,next)
}

exports.logout = function (req, res, next) {
    req.logout();
    res.redirect('/');
}