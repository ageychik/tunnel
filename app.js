const cluster = require('cluster');
if(cluster.isMaster) require('./server/master');
if(cluster.isWorker) require('./server/index');