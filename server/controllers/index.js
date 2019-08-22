const express = require('express');
const router = new (express.Router)();
const routes = {
    user:       require('./user'),
    message:    require('./message')
};


// router.get('/', (req, res) => {} );
router.use('/user', routes.user);
router.use('/message', routes.message);

module.exports = router;