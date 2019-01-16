let app = new require('express').Router();

// setup::routes
app.use('/', require('./site/'));
app.use('/tour', require('./tour/'));
app.use('/api/tour', require('./tour/api'));
app.use('/playground', require('./playground/'));
app.use('/api/playground', require('./playground/api'));
app.use('/contest', require('./contest/'));

module.exports = app;
