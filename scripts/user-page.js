import {changeNumber} from "./user-page-rest/change-number.js";
import {changePassword} from "./user-page-rest/change-password.js";
import {changeName} from "./user-page-rest/change-name.js"
import {changeLastName} from "./user-page-rest/change-last-name.js"

document.addEventListener('DOMContentLoaded', () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

  document.querySelector('.js-user-first-name').textContent = currentUser.firstName;
  document.querySelector('.js-user-last-name').textContent = currentUser.lastName;
  document.querySelector('.js-user-number').textContent = currentUser.number;
  document.querySelector('.js-password').textContent = currentUser.password;
});

changeNumber();
changePassword();
changeName();
changeLastName();

document.querySelector('.js-log-out-button').addEventListener('click', () => {
  window.location.href = 'login.html';
});

document.querySelector('.js-open-chats-button').addEventListener('click', () => {
  window.location.href = 'chats.html';
})