export function changePassword () {
  document.querySelector('.js-user-change-password').addEventListener('click', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const newPassword = document.querySelector('.js-user-change-password-input').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (!newPassword) {
      alert('Поле пароля не может быть пустым!');
      return;
    }
  
    if (currentUser.password === newPassword) {
      alert('Новый пароль не может совпадать с текущим!');
      return;
    }
    
    const userIndex = users.findIndex(user => user.number === currentUser.number);
    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
    }
  
    currentUser.password = newPassword;
  
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  
    document.querySelector('.js-password').textContent = newPassword;
    document.querySelector('.js-user-change-password-input').value = '';
    alert('Пароль успешно обновлён!');
  })
}