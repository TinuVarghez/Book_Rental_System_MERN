const express = require('express');
const router = express.Router();
const authorControllers = require('../controllers/author-controller')

router.post('/create',authorControllers.createAuthor)

router.get('/:id',authorControllers.getAuthor)

router.get('/',authorControllers.getAllAuthor)

//update or patch
router.patch('/:id',authorControllers.updateAuthor)
//delete
router.delete('/:id',authorControllers.deleteAuthor)

module.exports = router