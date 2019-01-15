function auth(req, res, next) {
	if(req.session.username) {
		auth = {
			'username': req.session.username,
			'isLogin': true,
		};
	} else {
		auth = { 
			'isLogin': false,
		};
	}
	res.locals.auth = auth;
	res.locals.url = req.url;
	next();
}

module.exports = auth;