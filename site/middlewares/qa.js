function qa(req, res, next) {
	if( req.query.test === '1' && app.get('env') !== 'production')
		res.locals.showTests = true;
	else
		res.locals.showTests = false;
	next();
}

module.exports = qa;