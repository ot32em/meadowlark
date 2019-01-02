// setup: common require
let util = require('util');

// steup: express server
let expressMod = require('express');
let app = expressMod();
app.set('port', process.env.PORT || 3000);


// setup: view engine
let handlebarsMod = require('express3-handlebars');
let handlebars = handlebarsMod.create(
	{defaultLayout: 'mainNav'}
);
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


// setup/local module: rolldice
let rolldiceMod = require('./lib/rolldice.js');
if(typeof rolldiceMod == 'undefined') {
	console.error('rolldice can NOT be loaded');
}


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

// route setup
app.get('/', function(req, res) {
	res.render('home');
});

app.get('/header', function(req, res) {
	res.set('Content-Type', 'text/plain');	
	let s = '';
	for(let n in req.headers) s += n + ': ' + req.headers[n] + '\n';

	s += 'req';
	s += util.inspect(req, false, 4);

	res.send(s);
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


// ch06 examples

app.get('/error', function(req, res) {
	res.status(500).render('error', {
		err: '....err....',
	});
});


const tours = [
	{ id: 0, name: 'Hood River', price: 99.99},
	{ id: 1, name: 'Taipei', price: 149.99},
];

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


const toursIndex = {
	currency: {
		name: 'United States dollars',
		abbrev: 'USD',
	},
	tours: tours,
	specialsUrl: '/january-specials',
	currencies: [' USD', 'GBP', 'BTC'],
};

app.get('/tours', function(req, res) {
	res.render('tours/tours', toursIndex);
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
