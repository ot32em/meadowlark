let domain = require('domain');

function customDomain(req, res, next) {
    let d = domain.create();
    d.on('error', function(err) {
        console.log( process.pid + ' domain err catched');

        setTimeout( () => {
            console.log('fatal error, safe close process ' + process.pid);
            process.exit(1);
        }, 5000);

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
}

module.exports = customDomain;