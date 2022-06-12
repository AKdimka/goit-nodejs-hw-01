const fs = require('fs');
const path = require('path');
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "db/contacts.json")


async function listContacts() {
	const data = await fs.readFile(contactsPath);
	const contacts = JSON.parse(data);

	return contacts;
}

async function getContactById(contactId) {
	const contacts = await listContacts();
	const contactById = contacts.find((contact) => contact.id === contactId)

	return contactById;
}

async function removeContact(contactId) {
	const contacts = await listContacts();
	const index = contacts.findIndex((contact) => contact.id === contactId);

	const removeContact = contacts.splice(index, 1);
	await fs.write(contactsPath, JSON.stringify(contacts))

	return removeContact;
}

async function addContact(name, email, phone) {
	const contacts = await listContacts();
	const newContact = { id: nanoid(), name, email, phone };
	contacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts))

	return newContact;
}

console.log('The END');

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact
}