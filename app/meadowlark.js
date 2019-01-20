let express = require('express');
let app = express();

// app core
let handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
require('express-handlebars-sections')(handlebars);
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

let domain = require('domain');
app.use(function(req, res, next) {
    let d = domain.create();
    d.on('error', function(err) {
        console.log( process.pid + ' domain err catched');

        setTimeout( () => {
            console.log('fatal error, safe close process');
            process.exit(1);
        }, 10000);

        let cluster = require('cluster');
        if(cluster.worker)
            cluster.worker.disconnect();
        
        req.socket.server.close();

        try {
            next(err);
        } catch(err) {
            console.log('err got even express error handling');
            res.status(500);
            res.render('500', {
                'error': 'got fatal error',
            });

        };
    });
    d.add(req);
    d.add(res);
    d.run(next);
});
let morgan = require('morgan');
morgan.token('pid', function(req, res) {
    return "pid: " + process.pid;
});
switch (app.get('env'))
{
    case 'production':
        let path = require('path');
        let config = require('./config/site.js');
        app.use(morgan('combined', {
            'stream': require('rotating-file-stream')(config.log.filename, {
                'interval': config.log.interval, // 1 minute
                'path': path.join(__dirname, config.log.dir)
            }),
        }));
        break;
    case 'development':
    default:
        app.use(morgan(':pid :method :url :status :response-time ms - :res[content-length]'));
        break;
}
// add app middlewares
let secret = require('./config/confidential.js').secretCookie;
app.use(require('cookie-parser')(secret, {'httpOnly': true}));
app.use(require('express-session')({
    'resave': false,
    'saveUninitialized': false,
    'secret':  secret,
}));
app.use(express.static(__dirname + '/public'));
app.use(require('body-parser').urlencoded({'extended': true}));

// add custom middlewares
app.use(require('./middleware/nav'));
app.use(require('./middleware/auth'));
app.use(require('./middleware/flash'));
app.use(require('./middleware/qa'));
app.use(require('./middleware/weather'));

// add routes
app.use('/', require('./routes/'));

// add error handling
app.use(require('./middleware/error').notFound);
app.use(require('./middleware/error').internalError);

module.exports = app;
