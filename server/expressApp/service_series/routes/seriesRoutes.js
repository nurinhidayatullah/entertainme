const express = require('express');
const router = express.Router();
const seriesController = require('../controllers/seriesController.js');

router.get('/', seriesController.list);

router.get('/:id', seriesController.show);

router.post('/', seriesController.create);

router.put('/:id', seriesController.update);

router.delete('/:id', seriesController.remove);

module.exports = router;
