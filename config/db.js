const mongoose = require('mongoose');

const uri = process.env.URI_DB;

const db = mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
	console.log('===============Conected from DB===============');
});

mongoose.connection.on('error', (err) => {
	console.log(`===============Mongoose connection error: ${err}===============`);
});

mongoose.connection.on('disconnected', () => {
	console.log('===============Disconected from DB===============');
});

process.on('SIGINT', async () => {
	mongoose.connection.close(() => {
		console.log('Disconected from DB');
		process.exit(1);
	});
});

module.exports = db;