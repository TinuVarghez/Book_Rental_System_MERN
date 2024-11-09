const express = require('express');
const router = express.Router();
const genreControllers = require('../controllers/genre-controller')

router.post('/create',genreControllers.createGenre)

router.get('/:id',genreControllers.getGenre)

router.get('/',genreControllers.getAllGenre)

//update or patch
router.patch('/:id',genreControllers.updateGenre)
//delete
router.delete('/:id',genreControllers.deleteGenre)

module.exports = router