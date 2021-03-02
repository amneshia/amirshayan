const myContactInfo = require("../models/my-contact-info");

exports.secured = (req, res, next) => {
    if (req.user) {
        next(); // allow the next route to run
    } else {
        const url = req.url;
        if (url) {
            res.redirect("/login?redirectURL=" + url);
        } else {
            res.redirect("/login");
        }

    }
}

exports.globalLocals = (req, res, next) => {
    res.locals.request = req;
    res.locals.lang = "en";
    res.locals.contactInfo = myContactInfo;
    res.locals.syncMessages = () => {
        
    };
    next();
};