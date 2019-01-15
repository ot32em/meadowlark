let app = new require('express').Router();

app.get('/nursery-rhyme', function(req, res) {
	res.json({
		'animal': 'squirrel',
		'bodyPart': 'tail',
		'adjective': 'bushy',
		'noun': 'heck',
	});
});

module.exports = app;