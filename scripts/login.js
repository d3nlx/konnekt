document.querySelector('.js-log-in-button').addEventListener('click', () => {
  login();
});

document.addEventListener('DOMContentLoaded', () => {
  const number = localStorage.getItem('number');
  const password = localStorage.getItem('password');

  document.querySelector('.js-user-number').textContent = number;
  document.querySelector('.js-password').textContent = password;
});

function login () {
  const loginNumber = document.querySelector('.js-number-input-login').value
  const loginPassword = document.querySelector('.js-password-input-login').value
  const loginError = document.querySelector('.login-error');
  
  if (loginNumber === '' || loginPassword === '') {
    loginError.innerHTML = 'Заполните все поля';
    return;
  }

  let users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => user.number === loginNumber && user.password === loginPassword);

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'user-page.html';
  } else {
    loginError.innerHTML = 'Ошибка входа: неправильный номер или пароль';
  }
 } 

document.querySelector('.js-sign-up-button').addEventListener('click', () => {
  window.location.href = 'registration.html';
});
