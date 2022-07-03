const express = require('express');
const {
	listContacts,
	getContactById,
	addContact,
	removeContact,
	updateContact
} = require('../../../controllers/contacts');
const {
	schemaCreateContact,
	schemaFavoriteContact,
	schemaMongoId
} = require('../contacts/contact-validation-schema');
const { validateBody, validateParams } = require('../../../middlewares/validation');
const router = express.Router();

router.get('/', listContacts)

router.get('/:contactId', validateParams(schemaMongoId), getContactById)

router.post('/', validateBody(schemaCreateContact), addContact)

router.delete('/:contactId', validateParams(schemaMongoId), removeContact)

router.put('/:contactId', validateBody(schemaCreateContact), updateContact)

router.patch(
	'/:contactId/favorite',
	[validateParams(schemaMongoId), validateBody(schemaFavoriteContact)],
	updateContact
)

module.exports = router