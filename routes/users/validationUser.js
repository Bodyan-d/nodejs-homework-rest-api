const Joi = require('joi');
const reqularEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const schemaUser = Joi.object({
	password: Joi.string().alphanum().min(5).max(25).required(),
	email: Joi.string().pattern(new RegExp(reqularEmail)).required(),
	subscription: Joi.string().alphanum(),
	token: Joi.string().alphanum(),
}).with('phone', 'email');

const validate = async (schema, obj, res, next) => {
	try {
		await schema.validateAsync(obj);
		next();
	} catch (err) {
		res.status(400).json({
			status: 'error',
			code: 400,
			message: err.message,
		});
	}
};

module.exports.validateUser = async (req, res, next) => {
	return await validate(schemaUser, req.body, res, next);
};
