let util = require('util');
let express = require('express');
let app = new express.Router();


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

let rolldice = require('../../lib/rolldice.js');

app.get('/about', function(req, res) {
	res.render('about', {
		'dice': rolldice.rollDice(),
		'pageTestScript': '/qa/tests-about.js'
	});
});


// ch06 examples - request and response
app.get('/error', function(req, res) {
	res.status(500).render('playground/error', {
		err: '....err....',
	});
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

module.exports = app;