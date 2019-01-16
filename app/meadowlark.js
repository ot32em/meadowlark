let app = require('express')();

// setup view engine
let handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
require('express-handlebars-sections')(handlebars);
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

let bole = require('bole');
app.use(function (req, res, next) {
    log.info(`Request(method/url/ajax): [${req.method}][${req.path}][${req.xhr}] ip[${req.ip}]`);
    next();
});

// setup controller
require('./controllers/').setup(app);

module.exports = app;
