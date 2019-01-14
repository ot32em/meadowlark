function notFound(req, res, next) {
	res.render('404');	
}

function internalError(err, req, res, next) {
	console.error(err.stack);
	res.render('500');
}

module.exports = {
    'notFound': notFound,
    'internalError': internalError,
};