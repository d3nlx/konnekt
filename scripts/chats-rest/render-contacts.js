import { deleteContact } from './delete-contact.js';
import { formatTimestamp } from './format-time-stamp.js'; // Импортируем форматирование времени

// Главная функция для отображения всех контактов
export function renderContacts(currentUser, contactsKey, searchTerm = '') {
  const contactsList = document.querySelector('.contacts-list-js'); // Получаем блок списка контактов
  contactsList.innerHTML = ""; // Очищаем блок перед новой отрисовкой

  // Получаем сохранённые контакты текущего пользователя
  const savedContacts = JSON.parse(localStorage.getItem(contactsKey)) || [];

  // Фильтруем контакты по введённому значению (поиск)
  const filteredContacts = savedContacts.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.number.includes(searchTerm)
  );

  // Проходимся по каждому подходящему контакту и формируем его отображение
  filteredContacts.forEach(user => {
    const contactElement = document.createElement('div'); // Создаём обёртку-контакт
    contactElement.classList.add('contact'); // Добавляем класс
    contactElement.setAttribute('data-number', user.number); // Сохраняем номер

    // Создаём ключ чата между пользователями
    const chatKey = [currentUser.number, user.number].sort().join('_');
    const messages = JSON.parse(localStorage.getItem(chatKey)) || []; // Получаем сообщения

    // Берём последнее сообщение и его время (если есть)
    const lastMessage = messages.length > 0 ? messages[messages.length - 1].message : "No messages yet";
    const lastTime = messages.length > 0 ? formatTimestamp(messages[messages.length - 1].timestamp) : "";

    // Вставляем HTML для контакта
    contactElement.innerHTML = `
      <div class="contact-wrapper" data-number="${user.number}">
        <p>${user.firstName} ${user.lastName}</p>
        <p>${lastMessage}</p>
        <small>${lastTime}</small>
      </div>
    `;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', (e) => {
      e.stopPropagation(); // Чтобы не переходить в чат при удалении
      const confirmDelete = confirm('Удалить контакт и всю переписку?');
      if (confirmDelete) {
        deleteContact(currentUser, contactsKey, user.number);
        renderContacts(currentUser, contactsKey);
      }
    });

    contactElement.appendChild(deleteButton);

    // Переход в чат при клике
    contactElement.querySelector('.contact-wrapper').addEventListener('click', () => {
      window.location.href = `chat.html?firstName=${user.firstName}&lastName=${user.lastName}&number=${user.number}`;
    });

    contactsList.appendChild(contactElement); // Добавляем в DOM
  });
}