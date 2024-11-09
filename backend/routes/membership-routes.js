const express = require('express');
const router = express.Router();
const membershipControllers = require('../controllers/membership-controller')

router.post('/create',membershipControllers.createMembership)

router.get('/:id',membershipControllers.getMembership)

router.get('/',membershipControllers.getAllMembership)

//update or patch
router.patch('/:id',membershipControllers.updateMembership)
//delete
router.delete('/:id',membershipControllers.deleteMembership)

module.exports = router