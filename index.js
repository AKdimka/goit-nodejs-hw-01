const operations = require("./contacts.js");
const argv = require('yargs').argv;

async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case "list":
			const contactsList = await operations.listContacts();
			console.log(contactsList);
			break;

		case 'get':
			const contact = await contactOperations.getContactById(id);

			console.log(contact);
			break;

		case 'add':
			const newContact = await contactOperations.addContact(
				name,
				email,
				phone
			);

			console.log(newContact);
			break;

		case 'remove':
			const removeContact = await contactOperations.removeContact(id);

			console.log(removeContact);
			break;

		default:
			console.warn('\x1B[31m Unknown action type!');
	}
}
invokeAction({ action: "list" })