let express = require('express');
let app = express();

let config = require('./config/site.js');
let secret = require('./config/confidential.js');

// app core
let handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
require('express-handlebars-sections')(handlebars);
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.use(require('./middleware/customDomain.js'));
app.use(require('./middleware/customLogger.js')(app.get('env'), config.log));


// add app middlewares
app.use(require('cookie-parser')(secret.secretCookie, {'httpOnly': true}));
app.use(require('express-session')({
    'resave': false,
    'saveUninitialized': false,
    'secret':  secret.secretCookie,
}));
app.use(express.static(__dirname + '/public'));
app.use(require('body-parser').urlencoded({'extended': true}));

require('./lib/db').connectDb(secret.mongodb[app.get('env')].connectstring);

// add custom middlewares
app.use(require('./middleware/nav'));
app.use(require('./middleware/auth'));
app.use(require('./middleware/flash'));
app.use(require('./middleware/qa'));
app.use(require('./middleware/weather'));

// add routes
app.use('/', require('./routes/'));

// add error handling
app.use(require('./middleware/error').notFound);
app.use(require('./middleware/error').internalError);

module.exports = app;
