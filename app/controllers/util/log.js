let bole = require('bole')

function makeLogRequests(name) {
    let log = bole(name);
    return function (req, res, next) {
        log.info(`Request(method/url/ajax): [${req.method}][${req.path}][${req.xhr}] ip[${req.ip}]`);
        next();
    };
}

module.exports = {
    'makeLogRequests': makeLogRequests,
};