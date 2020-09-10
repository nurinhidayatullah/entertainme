const express = require('express');
const router = express.Router();
const serieRoute = require('./seriesRoutes')

router.use('/tv', serieRoute)

module.exports = router;
