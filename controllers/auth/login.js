const authService = require('../../services/auth');
const { HTTP_STATUS } = require('../../libs/constants');

const login = async (req, res) => {
	const token = await authService.login(req.body)
	return res.status(HTTP_STATUS.OK).json({
		status: 'success',
		code: HTTP_STATUS.OK,
		data: { token },
	})
}

module.exports = login