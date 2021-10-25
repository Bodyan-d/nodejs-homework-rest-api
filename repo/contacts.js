const Contact = require('../model/contact');

const listContacts = async userId => {
	return await Contact.find({ owner: userId }).populate({
		path: 'owner',
		select: '_id email subscription',
	});
};

const getContactById = async (contactId, userId) => {
	return Contact.findOne({ _id: contactId, owner: userId }).populate({
		path: 'owner',
		select: '_id email subscription',
	});
};

const removeContact = async (contactId, userId) => {
	return Contact.findOneAndRemove({ _id: contactId, owner: userId });
};

const addContact = async body => {
	return Contact.create(body);
};

const updateContact = async (contactId, body, userId) => {
	return Contact.findOneAndUpdate({ _id: contactId, owner: userId }, body, {
		new: true,
	});
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
