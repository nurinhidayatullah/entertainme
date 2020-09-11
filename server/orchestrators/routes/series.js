const router = require('express').Router()
const seriesController = require('../controllers/series')

router.get('/', seriesController.list);

router.post('/', seriesController.create);

router.put('/:id', seriesController.update);

router.delete('/:id', seriesController.remove);

module.exports = router