const router = require('express').Router()
const seriesController = require('../controllers/series')

router.get('/', seriesController.list);

router.get('/:id', seriesController.show);

router.post('/', seriesController.create);

router.put('/:id', seriesController.update);

router.delete('/:id', seriesController.remove);

module.exports = router