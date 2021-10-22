const jwt = require('jsonwebtoken');
const Users = require('../repo/users');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const current = async (req, res, next) => {
	try {
		const user = await Users.currentUser(req.user.token);
		if (!user) {
			return res
				.status(401)
				.json({ status: 'error', code: 401, message: 'Not authorized' });
		}
		res.json({
			status: 'success',
			code: 200,
			data: { email: user.email, subscription: user.subscription },
		});
	} catch (error) {
		next(error);
	}
};

const signup = async (req, res, next) => {
	const { email, password, subscription } = req.body;
	const user = await Users.findByEmail(email);
	if (user) {
		return res
			.status(409)
			.json({ status: 'error', code: 409, message: 'Email in use' });
	}

	try {
		const newUser = await Users.create({
			email,
			password,
			subscription,
		});
		return res.status(201).json({
			status: 'success',
			code: 201,
			data: {
				id: newUser.id,
				email: newUser.email,
				subscription: newUser.subscription,
			},
		});
	} catch (error) {
		next(error);
	}
};

const login = async (req, res, next) => {
	const { email, password } = req.body;
	const user = await Users.findByEmail(email);
	const isValidPassword = await user.isValidPassword(password);

	if (!user || !isValidPassword) {
		return res.status(401).json({
			status: 'error',
			code: 401,
			message: 'Email or password is wrong',
		});
	}
	const id = user._id;
	const payload = { id };
	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1w' });
	await Users.updateToken(id, token);
	return res.status(200).json({
		status: 'success',
		code: 200,
		data: {
			token: token,
			user: {
				email: user.email,
				subscription: user.subscription,
			},
		},
	});
};

const logout = async (req, res, next) => {
	const id = req.user._id;
	await Users.updateToken(id, null);
	return res.status(200).json({});
};

module.exports = { current, signup, login, logout };
