import { renderContacts } from './chats-rest/render-contacts.js';
import { formatTimestamp } from './chats-rest/format-time-stamp.js';
import { addContactByInput } from './chats-rest/add-contact.js';

// Получаем объект текущего пользователя из localStorage
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Формируем уникальный ключ для хранения контактов именно этого пользователя
const contactsKey = `contacts_${currentUser.number}`;

// Функция, которая преобразует дату/время в удобный формат
formatTimestamp();

// Отображаем контакты при загрузке страницы
renderContacts(currentUser, contactsKey); // Без поиска

// Поиск в реальном времени
document.querySelector('.search-contact-input-js').addEventListener('input', (event) => {
  renderContacts(currentUser, contactsKey, event.target.value.trim()); // С параметрами
});

// Кнопка "add kontakt"
document.querySelector('.add-contact-button-js').addEventListener('click', () => {
  addContactByInput(currentUser, contactsKey);
});

// Enter
document.querySelector('.search-contact-input-js').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addContactByInput(currentUser, contactsKey);
  }
});

document.querySelector('.back-to-user-page-button-js').addEventListener('click', () => {
  window.location.href = 'user-page.html';
})