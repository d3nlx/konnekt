export function changeName () {
  document.querySelector('.js-user-change-name-button').addEventListener('click', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const newName = document.querySelector('.js-user-change-name-input').value.trim();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (!newName) {
      alert('Поле имени не может быть пустым!');
      return;
    }

    if (currentUser.firstName === newName) {
      alert('Новое имя не может совпадать с текущим!');
      return;
    }

    const userIndex = users.findIndex(user => user.number === currentUser.number);
    if (userIndex !== -1) {
      users[userIndex].firstName = newName;
    }

    currentUser.firstName = newName;

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    document.querySelector('.js-user-first-name').textContent = newName;
    document.querySelector('.js-user-change-name-input').value = '';
    alert('Имя успешно изменено!');
  });
}