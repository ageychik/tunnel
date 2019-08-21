const logger = new (require('./logger'))();

module.exports = function(err,req,res,next) {
    logger.error('Error: ', {
        url: req.originalUrl
    });

    res.status(503).send(err.stack || err.message);
};