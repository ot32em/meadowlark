let app = new require('express').Router();

app.get('/vacation-photo', function(req, res) {
	let now = new Date();
	res.render('contest/vacation-photo', {
		'year': now.getFullYear(),
		'month': now.getMonth(),
	});
});

let formidable = require('formidable');
app.post('/vacation-photo/:year/:month', function(req, res) {
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

app.get('/vacation-photo-ex', function( req, res){
	res.render('contest/vacation-photo-ex');
});

module.exports = app;