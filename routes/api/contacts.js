const express = require('express');
const contactRepository = require('../../repository/contacts');
const {
	schemaCreateContact,
	schemaFavoriteContact,
	schemaMongoId
} = require('../api/contact-validation-schema');
const { validateBody, validateParams } = require('../../middlewares/validation');
const router = express.Router();

router.get('/', async (req, res, next) => {
	const contacts = await contactRepository.listContacts()
	res.json({ status: 'success', code: 200, payload: { contacts } })
})

router.get('/:contactId', async (req, res, next) => {
	const contact = await contactRepository.getContactById(req.params.contactId)
	if (contact) {
		return res.json({ status: 'success', code: 200, payload: { contact } })
	}
	return res
		.status(404)
		.json({ status: 'error', code: 404, message: 'Not Found' })
})

router.post('/', validateBody(schemaCreateContact), async (req, res, next) => {
	const contact = await contactRepository.addContact(req.body)
	res.status(201).json({ status: 'success', code: 201, payload: { contact } })
})

router.delete('/:contactId', validateParams(schemaMongoId), async (req, res, next) => {
	try {
		const contact = await contactRepository.removeContact(req.params.contactId)
		if (contact) {
			return res.json({ status: 'success', code: 200, message: "contact deleted", payload: { contact } })
		}
		return res
			.status(404)
			.json({ status: 'error', code: 404, message: 'Not Found' })
	} catch (err) {
		next(err)
	}
})

router.put('/:contactId', validateBody(schemaCreateContact), async (req, res, next) => {
	const contact = await contactRepository.updateContact(req.params.contactId, req.body)
	if (contact) {
		return res.json({ status: 'success', code: 200, payload: { contact } })
	}
	return res
		.status(404)
		.json({ status: 'error', code: 404, message: 'Not Found' })
})

router.patch(
	'/:contactId/favorite',
	[validateParams(schemaMongoId), validateBody(schemaFavoriteContact)],
	async (req, res, next) => {
		const contact = await contactRepository.updateContact(req.params.contactId, req.body)
		if (contact) {
			return res.json({ status: 'success', code: 200, payload: { contact } })
		}
		return res
			.status(404)
			.json({ status: 'error', code: 404, message: 'Not Found' })
	})

module.exports = router