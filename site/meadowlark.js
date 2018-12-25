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

// static
app.use(expressMod.static(__dirname + '/public'));

// route setup
app.get('/', function(req, res) {
	res.render('home');
});

app.get('/about', function(req, res) {
	let numbers = [1,2,3,4,5,6];
	let index = Math.floor(Math.random() * numbers.length);
	let number = numbers[index];
	res.render('about', {'dice': number});	
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
		'Server(ch3-3) is up and listening port "'
		+ app.get('port')
		+ '. Press ctrl+c to terminate server.');
});
