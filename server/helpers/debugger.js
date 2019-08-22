const logger = new (require('./logger'))();

module.exports = function (req, res, next) {
    let beginTime = Date.now();



    res.on('finish', () => {
        let d = Date.now();
        logger.debug('', {
            date: beginTime,
            URL: req.originalUrl.split('?')[0],
            method: req.method,
            status: [res.statusCode, res.statusMessage],
            time: (d - beginTime)
        });
    });
    next();
};