// Desc: This file is the main route file for the application.
// It will be used to import all of the API routes to prefix their endpoint names and package them up.

const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
    return res.send('Wrong Route!');
});

module.exports = router;

