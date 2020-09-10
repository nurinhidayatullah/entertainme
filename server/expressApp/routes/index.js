const express = require('express');
const router = express.Router();
const movieRoute = require('./movieRoutes')
const serieRoute = require('./seriesRoutes')

router.use('/movies', movieRoute)
router.use('/series', serieRoute)

module.exports = router;
