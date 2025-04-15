// Получаем текущего пользователя
let currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Получаем данные собеседника из URL
const urlParams = new URLSearchParams(window.location.search);
const firstName = urlParams.get('firstName');
const lastName = urlParams.get('lastName');
const number = urlParams.get('number');

// Формируем уникальный ключ для хранения сообщений, одинаковый для обоих участников
let chatKey = [currentUser.number, number].sort().join('_');

// Проверяем, что данные собеседника пришли
if (firstName && lastName && number) {
  document.querySelector('.user-info-js').innerHTML = `
      <p>${firstName}</p>
      <p>${lastName}</p>
      <p>${number}</p>
  `;
} else {
  console.log("Ошибка: данные собеседника не найдены.");
}

// Создаём контейнер для сообщений
const messagesContainer = document.createElement('div');
messagesContainer.classList.add('messages-container');
document.body.appendChild(messagesContainer);

// Функция для отображения сообщений из localStorage
function renderMessages() {
  messagesContainer.innerHTML = "";

  let chatMessages = JSON.parse(localStorage.getItem(chatKey)) || [];

  chatMessages.forEach((msg, index) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    if (msg.sender === currentUser.number) {
      messageElement.classList.add('my-message');
    } else {
      messageElement.classList.add('interlocutor-message');
    }

    const messageDate = new Date(msg.timestamp);
    const today = new Date();
    const isToday = messageDate.toDateString() === today.toDateString();
    const formattedTime = isToday
      ? messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : messageDate.toLocaleDateString();

    messageElement.innerHTML = `
        <p>${msg.message}</p>
        <span>${formattedTime}</span>
        <button class="delete-button-js" data-index="${index}">delete message</button>
    `;

    messagesContainer.appendChild(messageElement);
  });

  document.querySelectorAll('.delete-button-js').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      let chatMessages = JSON.parse(localStorage.getItem(chatKey)) || [];
      chatMessages.splice(index, 1);
      localStorage.setItem(chatKey, JSON.stringify(chatMessages));
      renderMessages();
    });
  });
}

// Отображаем сообщения при загрузке страницы
renderMessages();

// Обработчик клика по кнопке отправки сообщения
document.querySelector('.send-message-button-js').addEventListener('click', () => {
  let messageInput = document.querySelector('.message-input-js');
  let messageText = messageInput.value.trim();

  if (messageText === "") return;

  let messageObject = {
    sender: currentUser.number,
    message: messageText,
    timestamp: new Date().toISOString()
  };

  let chatMessages = JSON.parse(localStorage.getItem(chatKey)) || [];
  chatMessages.push(messageObject);
  localStorage.setItem(chatKey, JSON.stringify(chatMessages));

  renderMessages();
  messageInput.value = "";
});