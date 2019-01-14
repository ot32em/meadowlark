let express = require('express');
let app = express();

// view
let handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
require('express-handlebars-sections')(handlebars);
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// cookie
let secret = require('./lib/confidential.js').secretCookie;
app.use(require('cookie-parser')(secret));
app.use(require('express-session')({
	'resave': false,
	'saveUninitialized': false,
	'secret':  secret,
}));
app.use(express.static(__dirname + '/public'));
app.use(require('body-parser').urlencoded({'extended': true}));


app.use(require('./middlewares/auth'));
app.use(require('./middlewares/flash'));
app.use(require('./middlewares/qa'));
app.use(require('./middlewares/weather'));


app.use('/', require('./routes/root'));
app.use('/tour', require('./routes/tour'));
app.use('/api', require('./routes/api'));


// route setup :: rest 404 and 500, routed to middleware
app.use(require('./middlewares/error').notFound);
app.use(require('./middlewares/error').internalError);

module.exports = app;
