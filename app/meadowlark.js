let app = require('express')();

// app core
let handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
require('express-handlebars-sections')(handlebars);
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// server middlewares
let bole = require('bole');
app.use(function (req, res, next) {
    log.info(`Request(method/url/ajax): [${req.method}][${req.path}][${req.xhr}] ip[${req.ip}]`);
    next();
});

// app middlewares
let secret = require('../config/confidential.js').secretCookie;
app.use(require('cookie-parser')(secret));
app.use(require('express-session')({
    'resave': false,
    'saveUninitialized': false,
    'secret':  secret,
}));
app.use(express.static(__dirname + '/../public'));
app.use(require('body-parser').urlencoded({'extended': true}));

// custom middlewares
app.use(require('../middleware/nav'));
app.use(require('../middleware/auth'));
app.use(require('../middleware/flash'));
app.use(require('../middleware/qa'));
app.use(require('../middleware/weather'));

// routes
app.use('/', require('./controllers/'));

// error handling
app.use(require('../middleware/error').notFound);
app.use(require('../middleware/error').internalError);

module.exports = app;
