const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function updateContacts(contacts) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (err) {
    console.error(err.message);
  }
}

//-------Get all contacts------------------------
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (err) {
    console.error(err.message);
  }
}

//-------Get contact by id------------------------
async function getContactById(contactId) {
  try {
    const id = String(contactId);
    const contacts = await listContacts();
    const result = contacts.find((contact) => contact.id === id);
    return result || null;
  } catch (err) {
    console.error(err.message);
  }
}

//-------Add contact-----------------------------
async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const contactsList = [...contacts, newContact];
    await updateContacts(contactsList);
    return newContact;
  } catch (err) {
    console.error(err.message);
  }
}

//-------Delete contact by id------------------------
async function removeContact(contactId) {
  try {
    const id = String(contactId);
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === id);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
