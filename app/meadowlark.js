let express = require('express');
let app = express();

// view
let handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
require('express-handlebars-sections')(handlebars);
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// cookie
let secret = require('./config/confidential.js').secretCookie;
app.use(require('cookie-parser')(secret));
app.use(require('express-session')({
	'resave': false,
	'saveUninitialized': false,
	'secret':  secret,
}));
app.use(express.static(__dirname + '/public'));
app.use(require('body-parser').urlencoded({'extended': true}));


app.use(require('./site/middlewares/auth'));
app.use(require('./site/middlewares/flash'));
app.use(require('./site/middlewares/qa'));
app.use(require('./site/middlewares/weather'));


app.use('/', require('./site/routes/root'));
app.use('/tour', require('./site/routes/tour'));
app.use('/api', require('./site/routes/api'));


// route setup :: rest 404 and 500, routed to middleware
app.use(require('./site/middlewares/error').notFound);
app.use(require('./site/middlewares/error').internalError);

module.exports = app;
