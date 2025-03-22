document.querySelector('.js-sign-up-button').addEventListener('click', () => {
  registration();
});

function registration() {
  const firstName = document.querySelector('.js-first-name').value;
  const lastName = document.querySelector('.js-last-name').value;
  const number = document.querySelector('.js-number').value;
  const password = document.querySelector('.js-password-input').value;
  const registrationError = document.querySelector('.registration-error');

  const phonePattern = /^\d{10,11}$/;
  if (!phonePattern.test(number)) {
    registrationError.innerHTML = 'Номер должен содержать 10-11 цифр!';
    return;
  }

  if (firstName === '' || lastName === '' || number === '' || password === '') {
    registrationError.innerHTML = 'Заполните все поля';
    return;
  }
  
  let users = JSON.parse(localStorage.getItem('users')) || [];
  const userExists = users.some(user => user.number === number);

  if (userExists) {
    registrationError.innerHTML = 'Такой номер уже зарегистрирован';
    return;
  }

  const newUser = { firstName, lastName, number, password };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(newUser));

  document.querySelector('.js-first-name').value = '';
  document.querySelector('.js-last-name').value = '';
  document.querySelector('.js-number').value = '';
  document.querySelector('.js-password-input').value = '';

  window.location.href = 'user-page.html';
}

document.querySelector('.js-log-in-button').addEventListener('click', () => {
  window.location.href = 'login.html';
});