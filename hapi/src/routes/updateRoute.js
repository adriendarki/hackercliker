const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')

router.post('/user/:userId', userController.updateUserInfos);

module.exports = router;