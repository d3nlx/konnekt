document.querySelector('.js-log-in-button').addEventListener('click', () => {
  login();
});

document.addEventListener('DOMContentLoaded', () => {
  const firstName = localStorage.getItem('firstName');
  const password = localStorage.getItem('password');

  document.querySelector('.js-user-first-name').textContent = firstName;
  document.querySelector('.js-password').textContent = password;
});

function login () {
  const firstName = localStorage.getItem('firstName');
  const password = localStorage.getItem('password');
  
  const loginError = document.querySelector('.login-error');
  
  const loginName = document.querySelector('.js-first-name-login').value
  const loginPassword = document.querySelector('.js-password-input-login').value

  if (loginName === '' || loginPassword === '') {
    loginError.innerHTML = 'заполни поля даными';
    return;
  }

  if (loginName === firstName && loginPassword === password) {
      window.location.href = 'user-page.html';
    } else {
      loginError.innerHTML = 'ошибка при входе';
      console.log('ошибка при входе');
    }
 } 

document.querySelector('.js-sign-up-button').addEventListener('click', () => {
  window.location.href = 'registration.html';
});
