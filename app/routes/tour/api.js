let express = require('express');
let app = new express.Router();

let tours = require('../../test/fixtures/data').tours;

app.get('/', function(req, res) {
	const toursXml = (tours) => {
		return '<?xml version="1.0"?><xml>\n\t<tours>\n' +
				tours.map( (t) => `\t\t<tour id="${t.id}" price="${t.price}">${t.name}</tour>\n`).join('') +
				'\t</tours>\n</xml>';
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

app.put('/:id', function(req, res) {
	let tourFound = tours.find( (tour) => tour.id == req.params.id);
	if(tourfound) {
		if(req.query.name) tourFound.name = req.query.name;
		if(req.query.price) tourFound.price = req.query.price;
		res.json({success: true});
	} else {
		res.json({error: 'No such tour exists.'});
	}
});


module.exports = app;