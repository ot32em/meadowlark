let data = require('../lib/data.js');

function weather(req, res, next) {
	if(!res.locals.partials) res.locals.partials = {};
	res.locals.partials.weather = data.weather;
	next();
}

module.exports = weather;