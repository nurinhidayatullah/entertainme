const express = require('express');
const router = express.Router();
const TvSeriesController = require('../controllers/series')

router.get('/tv', TvSeriesController.list)
router.post('/tv', TvSeriesController.create)
router.put('/tv/:id', TvSeriesController.update)
router.delete('/tv/:id', TvSeriesController.delete)


module.exports = router;
