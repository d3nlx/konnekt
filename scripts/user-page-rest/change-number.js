export function changeNumber () {
  document.querySelector('.js-user-change-number').addEventListener('click', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const newNumber = document.querySelector('.js-user-change-number-input').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const phonePattern = /^\d{10,11}$/;
    if (!phonePattern.test(newNumber)) {
      alert('Номер должен содержать 10-11 цифр!');
      return;
    }

    if (!newNumber) {
      alert('Поле номера не может быть пустым!');
      return;
    }
  
    if (currentUser.number === newNumber) {
      alert('Новый номер не может совпадать с текущим!');
      return;
    }
  
    const numberExists = users.some(user => user.number === newNumber);
    
    if (numberExists) {
      alert('Этот номер уже зарегистрирован!');
      return;
    }
  
    const userIndex = users.findIndex(user => user.number === currentUser.number);
    if (userIndex !== -1) { 
      users[userIndex].number = newNumber;
      // проверяет пользователь найден или нет индекс не найденого -1 типа если индекс определеного пользователя 2 то это значит что он существует и он не как не может быть равным -1;
    }
  
    currentUser.number = newNumber
  
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  
    document.querySelector('.js-user-number').textContent = newNumber;
    document.querySelector('.js-user-change-number-input').value = '';
    alert('Номер успешно обновлён!');
  });
}