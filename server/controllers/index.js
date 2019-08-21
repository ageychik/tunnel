const express = require('express');
const router = new (express.Router)();

router.use('/user', require('./user'));
router.use('/message', require('./message'));

module.exports = router;