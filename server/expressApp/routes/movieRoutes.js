const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController.js');

router.get('/', movieController.list);

router.get('/:id', movieController.show);

router.post('/', movieController.create);

router.put('/:id', movieController.update);

router.delete('/:id', movieController.remove);

module.exports = router;
