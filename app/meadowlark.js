let app = require('express')();

// setup view engine
let handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
require('express-handlebars-sections')(handlebars);
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// setup controller
require('./controllers/').setup(app);

module.exports = app;
