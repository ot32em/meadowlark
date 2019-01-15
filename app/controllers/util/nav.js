let navLinks = require('../../lib/nav');

function nav(req, res, next) {
    res.locals._nav = navLinks;
    next();
}

module.exports = nav;