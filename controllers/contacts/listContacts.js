const { HTTP_STATUS } = require('../../libs/constants')
const contactsService = require('../../services/contacts')

const listContacts = async (req, res) => {
	const contacts = await contactsService.getAll(req.query, req.user)
	res.json({
		status: 'success',
		code: HTTP_STATUS.OK,
		data: { contacts },
	})
}

module.exports = listContacts