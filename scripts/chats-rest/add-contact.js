// Функция добавления нового контакта по введенному номеру
import { renderContacts } from './render-contacts.js';

export function addContactByInput(currentUser, contactsKey) {
  const inputNumber = document.querySelector('.search-contact-input-js').value.trim();

  if (inputNumber === currentUser.number) {
    alert("You cannot add yourself to contacts.");
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => user.number === inputNumber);

  if (user) {
    const savedContacts = JSON.parse(localStorage.getItem(contactsKey)) || [];

    const alreadyAdded = savedContacts.some(contact => contact.number === user.number);
    if (alreadyAdded) {
      alert("Contact already added!");
      return;
    }

    savedContacts.push(user);
    localStorage.setItem(contactsKey, JSON.stringify(savedContacts));

    renderContacts(currentUser, contactsKey); // Обновляем список
    document.querySelector('.search-contact-input-js').value = '';
  } else {
    alert("User not found.");
  }
}
