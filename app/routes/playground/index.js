let app = new require('express').Router();


app.get('/header', function(req, res) {
	let s = Object.keys(req.headers).map( k => k + ': ' + req.headers[k] + '\n').join('');
	res.render('playground/dump', {'title': 'Header Dump', 'text': s});
});

let util = require('util');
app.get('/header-inspect/:level?', function(req, res) {
	let level = req.params.level || 1;
	let s = util.inspect(req, false, level);
	res.render('playground/dump', {'title': 'Header Inspect', 'text': s });
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

// ch07 example: handlebars: section
app.get('/jqueryTest', function(req, res){
	res.render('playground/jquerytest');
});


// ch06 examples - request and response
app.get('/error', function(req, res) {
	res.status(500).render('playground/error', {
		err: '....err....',
	});
});

app.get('/nursery-rhyme', function(req, res) {
	res.render('nursery-rhyme');
});

app.get('/test', function(req, res) {
	res.set('Content-Type', 'text/plain');
	res.send('test');
	res.send(req.text);
});

	let html = 	`<h1>Hello from Meadowlark (use generateTextFromHtml)</h1>` +
				`<p>This is notification from Meadowlark</p>` +
				`<ul><li>Google</li><li>Yahoo</li><li>Microsoft</li></ul>`;

	mailer.sendMail({
		'from': 'apeyuzuru@gmail.com',
		'to': 'ot32em@gmail.com',
		'subject': 'Test Mail From Meadowlark',
		'html': html,
		'generateTextFromHtml': true,
	}, function(err) {
		if(err) {
			log.error('Failed to send mail, err: ' + err);
			res.render('thank-you', {'msg': 'Email failed to send'});
		} else {
			log.info('Sent a mail!');
			res.render('thank-you', {'msg': 'Email is sent'});
		}		
	});

app.get('/throw-error', function(req, res) {	
	throw new InternalError('intended to be throwed');	
});
app.get('/close-server', function(req, res) {	
	res.send('closing...');
	process.exit(1);
});

module.exports = app;