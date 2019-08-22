const cluster = require('cluster');
const CPUCount = 1 || require('os').cpus().length;
const Logger = require('./helpers/logger');
const logger = new Logger();

cluster.on('disconnect', (worker, code, signal) => {
    logger.warn(`Worker ${worker.id} died`);
    cluster.fork();
});

cluster.on('online', (worker) => {
    logger.info(`Worker ${worker.id} running`);
});

for(let i = 0; i < CPUCount; ++i){
    cluster.fork();
}