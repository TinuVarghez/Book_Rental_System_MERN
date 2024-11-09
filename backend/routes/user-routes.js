const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user-controllers')
const {check} = require('express-validator')

router.post('/signup', [check('username').isEmpty().isLength({ min: 6 }),check('password').isLength({ min: 6 })],userControllers.createUser)

router.post('/',userControllers.loginUser)

router.get('/',userControllers.getAllUser)

//update or patch
router.patch('/:id',userControllers.updateUser)
//delete
router.delete('/:id',userControllers.deleteUser)

module.exports = router
