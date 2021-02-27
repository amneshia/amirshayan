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
    res.locals.contactInfo = {
        email: "amirshayan.armaghan@gmail.com",
        phone: "+1 647 674 6446",
        name: "Amir Shayan Armaghan",
        jobTitle: "Backend Web & Android Software Engineer",
        instagram: "https://www.instagram.com/a.shayan.a/",
        linkedin: "https://www.linkedin.com/in/amir-shayan-armaghan-6019b488/",
        facebook: "https://www.facebook.com/amirshayan",
    }
    next();
};