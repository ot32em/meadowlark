let express = require('express');
let app = express();
let handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
let secret = require('./lib/confidential.js').secretCookie;

// view engine
require('express-handlebars-sections')(handlebars);
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// cookie and auth
app.use(require('cookie-parser')(secret));
app.use(require('express-session')({
	'resave': false,
	'saveUninitialized': false,
	'secret':  secret,
}));
app.use(function(req, res, next) {
	if(req.session.username) {
		auth = {
			'username': req.session.username,
			'isLogin': true,
		};
	} else {
		auth = { 
			'isLogin': false,
		};
	}
	res.locals.auth = auth;
	res.locals.url = req.url;
	next();
});

// flash
app.use(function(req, res, next) {
	if(req.session._flash){
		res.locals._flash = req.session._flash;
		delete req.session._flash;
	}
	next();
});

// middleware: static resource
app.use(express.static(__dirname + '/public'));

// middleware: QA data
app.use(function(req, res, next) {
	if( req.query.test === '1' && app.get('env') !== 'production')
		res.locals.showTests = true;
	else
		res.locals.showTests = false;
	next();
});

// middleware: weather widget
let data = require('./lib/data.js');
app.use(function(req, res, next) {
	if(!res.locals.partials) res.locals.partials = {};
	res.locals.partials.weather = data.weather;
	next();
});


app.use(require('body-parser').urlencoded({'extended': true}));

app.use('/', require('./routes/root'));
app.use('/tour', require('./routes/tour'));
app.use('/api', require('./routes/api'));


// route setup :: rest 404 and 500, routed to middleware
app.use(function(req, res, next) {
	res.render('404');	
});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.render('500');
});

module.exports = app;