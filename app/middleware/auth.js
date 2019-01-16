function auth(req, res, next) {
	let authProp;
	if(req.session.username) {
		authProp = {
			'username': req.session.username,
			'isLogin': true,
		};
	} else {
		authProp = { 
			'isLogin': false,
		};
	}
	res.locals.auth = authProp;
	res.locals.url = req.url;
	next();
}

module.exports = auth;