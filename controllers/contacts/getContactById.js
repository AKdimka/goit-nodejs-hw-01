const { HTTP_STATUS } = require('../../libs/constants')
const contactsService = require('../../services/contacts')

const getContactById = async (req, res) => {
	const contact = await contactsService.getById(req.params.contactId, req.user)

	return res.json({ status: 'success', code: HTTP_STATUS.OK, data: { contact } })
}

module.exports = getContactById