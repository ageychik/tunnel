const logger = new (require('./logger'))();

module.exports = function (req, res, next) {
    let beginTime = Date.now();

    res.on('finish', () => {
        let d = Date.now();

        logger.log('Response time: ', {
            method: req.method,
            url: req.originalUrl.split('?')[0],
            time: (d - beginTime)
        });
    });
    next();
};