document.addEventListener('DOMContentLoaded', () => {
  const firstName = localStorage.getItem('firstName') || '';
  const lastName = localStorage.getItem('lastName') || '';
  const number = localStorage.getItem('number') || '';
  const password = localStorage.getItem('password') || '';

  document.querySelector('.js-user-first-name').textContent = firstName;
  document.querySelector('.js-user-last-name').textContent = lastName;
  document.querySelector('.js-user-number').textContent = number;
  document.querySelector('.js-password').textContent = password;
});

document.querySelector('.js-log-out-button').addEventListener('click', () => {
  window.location.href = 'login.html';
});