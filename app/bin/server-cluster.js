let app = require('../meadowlark.js');

let bole = require('bole');
let log = bole('server');
let cluster = require('cluster');
let cpus = require('os').cpus().length;



if(cluster.isMaster) {
    cluster.on("disconnect", worker => {
        cluster.fork();
    });
    for(let i = 0; i < cpus; i++) {
        cluster.fork();
    }
} else {
    
    bole.output({
        'level': 'debug',
        'stream': process.stdout,
    });

    app.set('port', process.env.PORT || 3000);
    app.listen(app.get('port'), function() {
        log.info(`Worker (${process.pid}) is up. Port: ${ app.get("port") }. Press ctrl + c to close`);
    });
}