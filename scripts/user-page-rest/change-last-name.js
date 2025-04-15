export function changeLastName () {
  document.querySelector('.js-user-change-last-name-button').addEventListener('click', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const newLastName = document.querySelector('.js-user-change-last-name-input').value.trim();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (!newLastName) {
      alert('Поле фамилии не может быть пустым!');
      return;
    }

    if (currentUser.lastName === newLastName) {
      alert('Новая фамилия не может совпадать с текущей!');
      return;
    }

    const userIndex = users.findIndex(user => user.number === currentUser.number);
    if (userIndex !== -1) {
      users[userIndex].lastName = newLastName;
    }

    currentUser.lastName = newLastName;

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    document.querySelector('.js-user-last-name').textContent = newLastName;
    document.querySelector('.js-user-change-last-name-input').value = '';
    alert('Фамилия успешно изменена!');
  });
}