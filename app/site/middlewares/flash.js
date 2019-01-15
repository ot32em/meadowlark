function flash(req, res, next) {
	if(req.session._flash){
		res.locals._flash = req.session._flash;
		delete req.session._flash;
	}
	next();
}

module.exports = flash;