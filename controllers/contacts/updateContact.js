const { HTTP_STATUS } = require('../../libs/constants')
const contactsService = require('../../services/contacts')

const updateContact = async (req, res) => {
	const contact = await contactsService.update(req.params.contactId, req.body, req.user)
	return res.json({ status: 'success', code: HTTP_STATUS.OK, data: { contact } })
}

module.exports = updateContact