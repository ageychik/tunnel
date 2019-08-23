const cluster = require('cluster');
const Logger = require('./server/helpers/logger');
const logger = new Logger();

if(cluster.isMaster) {
    let serverLogger = logger.log('Server started');
    cluster.fork();

    cluster.on('disconnect', (worker, code, signal) => {
        logger.warn(`Worker ${worker.id} died`);
        cluster.fork();
    });

    cluster.on('online', (worker) => {
        serverLogger.add({text: `- Worker ${worker.id} running`, color: 'cyan'});
    });

    require('./server/index')(serverLogger);
}