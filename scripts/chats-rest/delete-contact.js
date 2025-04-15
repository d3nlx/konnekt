export function deleteContact(currentUser, contactsKey, userNumber) {
  const savedContacts = JSON.parse(localStorage.getItem(contactsKey)) || [];
  const updatedContacts = savedContacts.filter(contact => contact.number !== userNumber);
  localStorage.setItem(contactsKey, JSON.stringify(updatedContacts));

  // Удаление истории чата (ключ может быть в любом порядке)
  const chatKey1 = `${currentUser.number}_${userNumber}`;
  const chatKey2 = `${userNumber}_${currentUser.number}`;
  localStorage.removeItem(chatKey1);
  localStorage.removeItem(chatKey2);
} 