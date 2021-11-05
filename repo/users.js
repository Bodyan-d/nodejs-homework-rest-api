const User = require('../model/user');

const currentUser = async token => {
	return await User.findOne({ token });
};

const findById = async id => {
	return await User.findById(id);
};

const findByEmail = async email => {
	return await User.findOne({ email });
};

const findUserByVerifyToken = async verifyToken => {
	return await User.findOne({ verifyToken });
};

const create = async options => {
	const user = new User(options);
	return await user.save();
};

const updateToken = async (id, token) => {
	return await User.updateOne({ _id: id }, { token });
};

const updateTokenVerify = async (id, verify, verifyToken) => {
	return await User.updateOne({ _id: id }, { verify, verifyToken });
};

const updateAvatar = async (id, avatarURL) => {
	return await User.updateOne({ _id: id }, { avatarURL });
};

module.exports = {
	currentUser,
	findById,
	findByEmail,
	findUserByVerifyToken,
	create,
	updateToken,
	updateTokenVerify,
	updateAvatar,
};
