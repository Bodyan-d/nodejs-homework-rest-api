const express = require('express');
const router = express.Router();
const {
	current,
	signup,
	login,
	logout,
	uploadAvatar,
} = require('../../controllers/users');
const { validateUser } = require('./validationUser');
const { guard } = require('../../helpers/guard');
const upload = require('../../helpers/uploads');

router.get('/current', guard, current);
router.post('/signup', validateUser, signup);
router.post('/login', validateUser, login);
router.post('/logout', guard, logout);
router.patch('/avatars', guard, upload.single('avatar'), uploadAvatar);

module.exports = router;
