let app = new require('express').Router();

// setup::routes
app.use('/', require('./site/'));
app.use('/tour', require('./tour/'));
app.use('/playground', require('./playground/'));
app.use('/contest', require('./contest/'));
app.use('/contact', require('./contact/'));

app.use('/api/tour', require('./tour/api'));
app.use('/api/playground', require('./playground/api'));

module.exports = app;
