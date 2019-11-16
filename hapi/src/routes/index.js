const express = require('express');
const router = express.Router();

const registerRoute = require('./register');
const loginRoute = require('./login');
const combatRoute = require('./combat');
const gameRoute = require('./game');
const updateRoute = require('./updateRoute.js');

router.use('/register', registerRoute);
router.use('/login', loginRoute);
router.use('/game/combat', combatRoute);
router.use('/game/home', gameRoute);
router.use('/update', updateRoute);

module.exports = router;