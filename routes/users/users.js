const express = require('express');
const router = express.Router();
const { current, signup, login, logout } = require('../../controllers/users');
const { validateUser } = require('./validationUser');
const { guard } = require('../../helpers/guard');

router.get('/current', guard, current);

router.post('/signup', validateUser, signup);

router.post('/login', login);

router.post('/logout', guard, logout);

module.exports = router;
