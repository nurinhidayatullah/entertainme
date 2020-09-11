const router = require('express').Router()
const movieController = require('../controllers/movie')

router.get('/', movieController.list);

router.post('/', movieController.create);

router.put('/:id', movieController.update);

router.delete('/:id', movieController.remove);

module.exports = router