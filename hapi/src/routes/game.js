const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const moduleController = require('../controllers/moduleController');

router.get('/:userId', moduleController.getGlobalInfosForUserId);
router.post('/research', moduleController.researchAModuleById);
router.post('/buy', moduleController.buyAMouleById);

module.exports = router;