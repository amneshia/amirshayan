const myContactInfo = require("../models/my-contact-info");
const methodOverride = require("method-override");

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
    next();
};

exports.methodOverride = methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      const method = req.body._method
      delete req.body._method
      return method
    }
  });