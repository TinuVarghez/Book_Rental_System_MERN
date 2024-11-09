const express = require('express');
const router = express.Router();
const bookControllers = require('../controllers/book-controller')
const fileUpload = require('../middleware/file-upload.js')

router.post('/create',fileUpload.single('image'),bookControllers.createBook)

router.get('/:id',bookControllers.getBook)

router.get('/',bookControllers.getAllBooks)

//update or patch
router.patch('/:id',fileUpload.single('image'),bookControllers.updateBook)
//delete
router.delete('/:id',bookControllers.deleteBook)

module.exports = router