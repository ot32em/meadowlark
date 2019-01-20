let morgan = require('morgan');


function customMorgon(env, config) {
    morgan.token('pid', function(req, res) {
        return "pid: " + process.pid;
    });
    switch (env)
    {
        case 'production':
            let path = require('path');
            return morgan('combined', {
                'stream': require('rotating-file-stream')(config.filename, {
                    'interval': config.interval, // 1 minute
                    'path': path.join(__dirname, config.dir)
                }),
            });
        case 'development':
        default:
            return morgan(':pid :method :url :status :response-time ms - :res[content-length]');
    }
}

module.exports = customMorgon;