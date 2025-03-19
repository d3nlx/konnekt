document.querySelector('.js-sign-up-button').addEventListener('click', () => {
  registration();
});

function registration() {
  const firstName = document.querySelector('.js-first-name').value;
  const lastName = document.querySelector('.js-last-name').value;
  const number = document.querySelector('.js-number').value;
  const password = document.querySelector('.js-password-input').value;

  const registrationError = document.querySelector('.registration-error');

  if (firstName === '' || lastName === '' || number === '' || password === '') {
    registrationError.innerHTML = 'заполни поля даными';
    return;
  }

  localStorage.setItem('firstName', firstName);
  localStorage.setItem('lastName', lastName);
  localStorage.setItem('number', number);
  localStorage.setItem('password', password);

  document.querySelector('.js-first-name').value = '';
  document.querySelector('.js-last-name').value = '';
  document.querySelector('.js-number').value = '';
  document.querySelector('.js-password-input').value = '';

  window.location.href = 'user-page.html';
}

document.querySelector('.js-log-in-button').addEventListener('click', () => {
  window.location.href = 'login.html';
});