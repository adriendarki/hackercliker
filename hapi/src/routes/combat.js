const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/result', userController.updateCombatResult);
router.get('/enemy/:userId', userController.getEnemy);
router.get('/start', userController.getCombatUsersInfos);
router.get('/detect/:userId', userController.amIUnderAttack);

module.exports = router;