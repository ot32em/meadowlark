let cluster = require('cluster');

if(cluster.isMaster) {
    cluster.on("disconnect", worker => {
        console.log("on disconnect");
    });
    cluster.on("exit", worker => {
        console.log("on process exit");
        cluster.fork();
    });

    let cpus = require('os').cpus().length;
    for(let i = 0; i < cpus; i++) {
        cluster.fork();
    }
    console.log('Press ctrl + c to close');
} else {
    require('./server.js').run();
}