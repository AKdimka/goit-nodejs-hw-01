const authService = require('../../services/auth');
const { HTTP_STATUS } = require('../../libs/constants');

const signup = async (req, res) => {
	const user = await authService.create(req.body)
	console.log(user);
	return res.status(HTTP_STATUS.CREATED).json({
		status: 'success',
		code: HTTP_STATUS.CREATED,
		data: { ...user },
	})
}


module.exports = signup