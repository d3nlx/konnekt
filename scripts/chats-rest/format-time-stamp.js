// Функция, которая преобразует дату/время в удобный формат
export function formatTimestamp(timestamp) {
  const date = new Date(timestamp); // Создаем объект даты из строки
  const now = new Date(); // Получаем текущую дату и время

  // Проверяем, совпадает ли день, месяц и год — т.е. сообщение отправлено сегодня
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  // Возвращаем либо только время (если сегодня), либо полную дату
  return isToday
    ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : date.toLocaleDateString();
}