const express = require('express');
const {
	getContacts,
	getContact,
	createContact,
	deleteContact,
	updateContact,
} = require('../../controllers/contacts');
const router = express.Router();
const { validateContact } = require('./validationContact');
const { guard } = require('../../helpers/guard');

router.get('/', guard, getContacts);

router.get('/:contactId', guard, getContact);

router.post('/', guard, validateContact, createContact);

router.delete('/:contactId', guard, deleteContact);

router.put('/:contactId', guard, updateContact);

module.exports = router;
