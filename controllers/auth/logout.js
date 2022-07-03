const authService = require('../../services/auth');
const { HTTP_STATUS } = require('../../libs/constants');

const logout = async (req, res) => {
	await authService.logout(req.user.id)
	return res.status(HTTP_STATUS.NO_CONTENT).json()
}

module.exports = logout