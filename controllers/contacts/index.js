const contactRepository = require('../../repository/contacts');
const { HTTP_STATUS } = require('../../libs/constants')

const listContacts = async (req, res, next) => {
	const contacts = await contactRepository.listContacts()
	res.json({
		status: 'success',
		code: HTTP_STATUS.OK,
		payload: { contacts }
	})
}

const getContactById = async (req, res, next) => {
	const contact = await contactRepository.getContactById(req.params.contactId)
	if (contact) {
		return res.json({
			status: 'success',
			code: HTTP_STATUS.OK,
			payload: { contact }
		})
	}
	return res
		.status(HTTP_STATUS.NOT_FOUND)
		.json({
			status: 'error',
			code: HTTP_STATUS.NOT_FOUND,
			message: 'Not Found'
		})
}

const addContact = async (req, res, next) => {
	const contact = await contactRepository.addContact(req.body)
	res.status(HTTP_STATUS.CREATED).json({
		status: 'success',
		code: HTTP_STATUS.CREATED,
		payload: { contact }
	})
}

const removeContact = async (req, res, next) => {
	try {
		const contact = await contactRepository.removeContact(req.params.contactId)
		if (contact) {
			return res.json({
				status: 'success',
				code: HTTP_STATUS.OK,
				message: "contact deleted",
				payload: { contact }
			})
		}
		return res
			.status(HTTP_STATUS.NOT_FOUND)
			.json({
				status: 'error',
				code: HTTP_STATUS.NOT_FOUND,
				message: 'Not Found'
			})
	} catch (err) {
		next(err)
	}
}

const updateContact = async (req, res, next) => {
	const contact = await contactRepository.updateContact(req.params.contactId, req.body)
	if (contact) {
		return res.json({
			status: 'success',
			code: HTTP_STATUS.OK,
			payload: { contact }
		})
	}
	return res
		.status(HTTP_STATUS.NOT_FOUND)
		.json({
			status: 'error',
			code: HTTP_STATUS.NOT_FOUND,
			message: 'Not Found'
		})
}

module.exports = {
	listContacts,
	getContactById,
	addContact,
	removeContact,
	updateContact
}