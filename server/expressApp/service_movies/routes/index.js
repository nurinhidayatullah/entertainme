const express = require('express');
const router = express.Router();
const movieRoute = require('./movieRoutes')

router.use('/movies', movieRoute)

module.exports = router;
