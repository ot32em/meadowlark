// steup: express server
let expressMod = require('express');
let app = expressMod();
app.set('port', process.env.PORT || 3000);


// setup: view engine
let handlebarsMod = require('express3-handlebars');
let handlebars = handlebarsMod.create(
	{defaultLayout: 'main'}
);
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


// setup/local module: rolldice
let rolldiceMod = require('./lib/rolldice.js')
if(typeof rolldiceMod == 'undefined') {
	console.error('rolldice can NOT be loaded');
}


// static
app.use(expressMod.static(__dirname + '/public'));


// route setup :: QA
app.use(function(req, res, next) {
	if( req.query.test === '1' && app.get('env') !== 'production')
		res.locals.showTests = true;
	else
		res.locals.showTests = false;
	next();
})

// route setup
app.get('/', function(req, res) {
	res.render('home');
});

app.get('/about', function(req, res) {
	res.render('about', {
		'dice': rolldiceMod.rollDice(),
		'pageTestScript': '/qa/tests-about.js'
	});
});


// route setup :: rest 404 and 500, routed to middleware
app.use(function(req, res, next) {
	res.render('404');	
});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.render('500');
});


app.listen(app.get('port'), function() {
	console.log(
		'Server(ch5-1) is up and listening port "'
		+ app.get('port')
		+ '. Press ctrl+c to terminate server.');
});
