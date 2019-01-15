let express = require('express');
let app = new express.Router();

app.get('/hood-river', function(req, res){
	res.render('tours/hood-river');
});
app.get('/taipei', function(req, res){
	res.render('tours/taipei');
});

app.get('/request-group-rate', function(req, res) {
	res.render('tours/request-group-rate');
});

app.delete('/:id', function(req, res) {
	let idxToDelete = tours.findIndex( (tour) => tour.id == req.params.id);
	if(idxToDelete != -1) {
		// delete array...
		res.json({'success': true});
	} else {
		res.json({'error': 'no such item to delete'});
	}
});

let data = require('../../lib/data.js');
app.get('/', function(req, res) {
	const toursIndex = {
		currency: {
			name: 'United States dollars',
			abbrev: 'USD',
		},
		tours: data.tours,
		specialsUrl: '/january-specials',
		currencies: [' USD', 'GBP', 'BTC'],
	};
	res.render('tours/tours', toursIndex);
});

module.exports = app;