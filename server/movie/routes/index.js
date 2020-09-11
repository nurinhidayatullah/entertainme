const express = require('express');
const router = express.Router();
const MovieController = require('../controllers/movie')

router.get('/movies', MovieController.list)
router.post('/movies', MovieController.create)
router.put('/movies/:id', MovieController.update)
router.delete('/movies/:id', MovieController.delete)


module.exports = router;
