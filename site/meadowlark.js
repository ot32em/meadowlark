// setup: common require
let util = require('util');

// steup: express server
let expressMod = require('express');
let app = expressMod();
app.set('port', process.env.PORT || 3000);


// setup: view engine
let handlebarsMod = require('express3-handlebars');
let handlebars = handlebarsMod.create(
	{defaultLayout: 'main'}
);
let handlebarsSectionMod = require('express-handlebars-sections');
handlebarsSectionMod(handlebars);

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');



// setup local module: rolldice
let rolldiceMod = require('./lib/rolldice.js');
let testdata = require('./lib/data.js');


// middleware: cookie
const secret = require('./lib/confidential.js').secretCookie;
app.use(require('cookie-parser')(secret));
app.use(require('express-session')({
	'resave': false,
	'saveUninitialized': false,
	'secret':  secret,
}));

// middleware: flash
app.use(function(req, res, next) {
	if(req.session._flash){
		res.locals._flash = req.session._flash;
		delete req.session._flash;
	}
	next();
});

// middleware: static resource
app.use(expressMod.static(__dirname + '/public'));

// middleware: QA data
app.use(function(req, res, next) {
	if( req.query.test === '1' && app.get('env') !== 'production')
		res.locals.showTests = true;
	else
		res.locals.showTests = false;
	next();
});

// middleware: weather widget
app.use(function(req, res, next) {
	if(!res.locals.partials) res.locals.partials = {};
	res.locals.partials.weather = testdata.weather;
	next();
});

// middleware: auth
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

// middleware: body-parser
app.use(require('body-parser').urlencoded({'extended': true}));


// route setup
app.get('/', function(req, res) {
	res.render('home');
});


app.post('/login', function(req, res) {
	let username = req.body.username;
	let url = req.body.refUrl || '/';
	if(username.length > 3) {
		req.session.username = username;
	}
	res.redirect(303, url);
});


app.post('/logout', function(req, res) {
	let url = req.body.refUrl || '/';
	delete req.session.username;
	res.redirect(303, url);
});

app.get('/header', function(req, res) {
	let s = Object.keys(req.headers).map( k => k + ': ' + req.headers[k] + '\n').join('');
	res.render('playground/dump', {'title': 'Header Dump', 'text': s});
});

app.get('/header-inspect/:level?', function(req, res) {
	let level = req.params.level || 1;
	let s = util.inspect(req, false, level);
	res.render('playground/dump', {'title': 'Header Inspect', 'text': s });
});

app.get('/about', function(req, res) {
	res.render('about', {
		'dice': rolldiceMod.rollDice(),
		'pageTestScript': '/qa/tests-about.js'
	});
});

app.get('/tours/hood-river', function(req, res){
	res.render('tours/hood-river');
});
app.get('/tours/taipei', function(req, res){
	res.render('tours/taipei');
});

app.get('/tours/request-group-rate', function(req, res) {
	res.render('tours/request-group-rate');
});


// ch06 examples - request and response
app.get('/error', function(req, res) {
	res.status(500).render('playground/error', {
		err: '....err....',
	});
});

app.get('/api/tours', function(req, res) {
	const toursXml = (tours) => {
		return '<?xml version="1.0"?>\n\t<tours>\n' +
				tours.map( (t) => `\t\t<tour id="${t.id}" price="${t.price}">${t.name}</tour>\n`).join('') +
				'\t<tours>\n</xml>';
	};
	const toursTxt = (tours) => tours.map( (t) => `${t.id}: ${t.name} (${t.price})\n`).join('');

	res.format({
		'application/json': function(){
			console.log('application/json');
			res.json(tours);
		},
		'application/xml': function(){
			console.log('application/xml');
			res.type('application/xml');
			res.send(toursXml(tours));
		},
		'text/xml': function() {
			console.log('text/xml');
			res.type('text/xml');
			res.send(toursXml(tours));
		},
		'text/plain': function(){
			console.log('text/plain');
			res.type('text/plain');
			res.send(toursTxt(tours));
		},
	});
});

app.put('/api/tour/:id', function(req, res) {
	let tourFound = tours.find( (tour) => tour.id == req.params.id);
	if(tourfound) {
		if(req.query.name) tourFound.name = req.query.name;
		if(req.query.price) tourFound.price = req.query.price;
		res.json({success: true});
	} else {
		res.json({error: 'No such tour exists.'});
	}
});

app.delete('/api/tour/:id', function(req, res) {
	let idxToDelete = tours.findIndex( (tour) => tour.id == req.params.id);
	if(idxToDelete != -1) {
		// delete array...
		res.json({'success': true});
	} else {
		res.json({'error': 'no such item to delete'});
	}
});

// ch07 example: handlebars
app.get('/tours', function(req, res) {
	const toursIndex = {
		currency: {
			name: 'United States dollars',
			abbrev: 'USD',
		},
		tours: testdata.tours,
		specialsUrl: '/january-specials',
		currencies: [' USD', 'GBP', 'BTC'],
	};
	res.render('tours/tours', toursIndex);
});


// ch07 example: handlebars: section
app.get('/jqueryTest', function(req, res){
	res.render('playground/jquerytest');
});

app.get('/nursery-rhyme', function(req, res) {
	res.render('nursery-rhyme');
});
app.get('/data/nursery-rhyme', function(req, res) {
	res.json({
		'animal': 'squirrel',
		'bodyPart': 'tail',
		'adjective': 'bushy',
		'noun': 'heck',
	});
});

app.get('/newsletter', function(req, res) {
	res.render('newsletter', {
		'csrf': 'Dummy crtf value',
		'enableAjaxSubmit': true,
	});
});

app.post('/process', function(req, res) {
	console.log(`Form type: ${req.query.form}`);
	console.log(`Name: ${req.body.name}`);
	console.log(`Email: ${req.body.email}`);
	console.log(`crtf value: ${req.body._csrf}`);

	if(req.xhr || req.accepts('json,html') === 'json') {
		console.log('json call');
		res.json({'success': true});
	} else {
		console.log('html call');
		res.redirect(303, '/thank-you');
	}
});
app.get('/thank-you', function(req, res) {
	res.render('thank-you');
});

app.get('/contest/vacation-photo', function(req, res) {
	let now = new Date();
	res.render('contest/vacation-photo', {
		'year': now.getFullYear(),
		'month': now.getMonth(),
	});
});

let formidable = require('formidable');
app.post('/contest/vacation-photo/:year/:month', function(req, res) {
	let form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		if(err) {
			return res.redirect(303, '/error');
		}
		console.log('fields:');
		console.log(fields);
		console.log('files:');
		console.log(files);
		res.redirect(303, '/thank-you');
	});
});

app.get('/contest/vacation-photo-ex', function( req, res){
	res.render('contest/vacation-photo-ex');
});

let jqupload = require('jquery-file-upload-middleware');
app.use('/upload', function(req, res, next) {
	console.log('upload request coming');
	let ts = + new Date();
	jqupload.fileHandler({
		'uploadDir': function() {
			return __dirname + '/public/uploads/' + ts
		},
		'uploadUrl': '/uploads/' + ts,
	})(req, res, next);
});


app.get('/cookietest', function(req, res) {
	// Remove cookie by browsing `/cookietest?clearcookie=1`
	if(req.query.clearcookie && req.query.clearcookie == '1') {
		Object.keys(req.cookies).map(
			k => {
				res.clearCookie(k);
				console.log(`Removed cookie '${k}'`);
			}
		);
		return res.redirect(303, '/cookietest');
	}



	// Add a new cookie with current timestamp as key
	let ts = +new Date();
	res.cookie(ts, 'true');

	// Transform cookie object `{...}` to `['key': k, 'value': v]` for viewing
	const cookieItems = Object.keys(req.cookies).map(
		k => {return {'key': k, 'value': req.cookies[k] };}
	);
	res.render('playground/cookietest', {
		'cookieItems': cookieItems,
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
	console.log(`Server is up. Port: ${ app.get("port") }. Press ctrl + c to close`);
});
