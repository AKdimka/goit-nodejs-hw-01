const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto")
const contactsPath = path.join(__dirname, "./db/contacts.json")

const listContacts = async () => {
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
	await fs.writeFile(contactsPath, JSON.stringify(contacts))

	return removeContact;
}

async function addContact(name, email, phone) {
	const contacts = await listContacts();
	const newContact = { id: randomUUID(), name, email, phone };
	contacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts))

	return newContact;
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact
}