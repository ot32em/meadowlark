
let app = new require('express').Router();


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


let rolldice = require('../../lib/rolldice.js');

app.get('/about', function(req, res) {
	res.render('about', {
		'dice': rolldice.rollDice(),
		'pageTestScript': '/qa/tests-about.js'
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




module.exports = app;