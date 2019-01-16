let express = require('express');

function setup (app) {
    // setup::middleware::server-level
    let secret = require('../config/confidential.js').secretCookie;
    app.use(require('cookie-parser')(secret));
    app.use(require('express-session')({
        'resave': false,
        'saveUninitialized': false,
        'secret':  secret,
    }));
    app.use(express.static(__dirname + '/../public'));
    app.use(require('body-parser').urlencoded({'extended': true}));


    // setup::middleware::user
    app.use(require('../middleware/nav'));
    app.use(require('../middleware/auth'));
    app.use(require('../middleware/flash'));
    app.use(require('../middleware/qa'));
    app.use(require('../middleware/weather'));


    // setup::routes
    app.use('/', require('./site/'));
    app.use('/tour', require('./tour/'));
    app.use('/api/tour', require('./tour/api'));
    app.use('/playground', require('./playground/'));
    app.use('/api/playground', require('./playground/api'));
    app.use('/contest', require('./contest/'));

    // setup::error handling
    app.use(require('../middleware/error').notFound);
    app.use(require('../middleware/error').internalError);
}

module.exports = {
    'setup': setup        
};