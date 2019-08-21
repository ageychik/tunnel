const cluster = require('cluster');
const logger = new (require('./helpers/logger'))();
const CPUCount = 1 || require('os').cpus().length;

cluster.on('disconnect', (worker, code, signal) => {
    logger.info(`Worker ${worker.id} died`);
    cluster.fork();
});

cluster.on('online', (worker) => {
    logger.info(`Worker ${worker.id} running`);
});

for(let i = 0; i < CPUCount; ++i){
    cluster.fork();
}