const Joi = require('joi');
const reqularEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const regularPhone = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;

const schemaContact = Joi.object({
	name: Joi.string().alphanum().min(1).max(25).required(),
	email: Joi.string().pattern(new RegExp(reqularEmail)),
	phone: Joi.string().pattern(new RegExp(regularPhone)),
}).with('phone', 'email');

const validate = async (schema, obj, res, next) => {
	try {
		await schema.validateAsync(obj);
		next();
	} catch (err) {
		res.status(400).json({
			status: 'error',
			code: 400,
			message: 'missing required name field',
		});
	}
};

module.exports.validateContact = async (req, res, next) => {
	return await validate(schemaContact, req.body, res, next);
};
