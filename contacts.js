const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

//-------Get all contacts------------------------
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

//-------Get contact by id------------------------
async function getContactById(contactId) {
  const id = String(contactId);
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === id);
  return result || null;
}

//-------Add contact-----------------------------
async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const contactsList = [...contacts, newContact];
  //contacts.push(newContact);
  await updateContacts(contactsList);
  return newContact;
}

//-------Delete contact by id------------------------
async function removeContact(contactId) {
  const id = String(contactId);
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
