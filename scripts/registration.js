document.querySelector('.js-sign-up-button').addEventListener('click', () => {
  registration();
});

async function registration() {
  const firstName = document.querySelector('.js-first-name').value.trim();
  const lastName = document.querySelector('.js-last-name').value.trim();
  const number = document.querySelector('.js-number').value.trim();
  const password = document.querySelector('.js-password-input').value.trim();
  const registrationError = document.querySelector('.registration-error');

  // Очищаем старые ошибки
  registrationError.innerHTML = '';

  // Проверка заполненности всех полей
  if (!firstName || !lastName || !number || !password) {
    registrationError.innerHTML = 'Заполните все поля!';
    return;
  }

  // Проверка формата номера
  const phonePattern = /^\d{10,11}$/;
  if (!phonePattern.test(number)) {
    registrationError.innerHTML = 'Номер должен содержать 10-11 цифр!';
    return;
  }

  try {
    // Отправляем данные на сервер
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, number, password }),
    });

    if (response.ok) {
      // Успешная регистрация
      const newUser = await response.json();
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      window.location.href = 'user-page.html';
    } else if (response.status === 409) {
      // Если номер уже зарегистрирован
      registrationError.innerHTML = 'Такой номер уже зарегистрирован!';
    } else {
      // Любые другие ошибки
      registrationError.innerHTML = 'Ошибка регистрации. Попробуйте снова.';
    }
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    registrationError.innerHTML = 'Сервер недоступен. Попробуйте позже.';
  }
}

// Кнопка "Логин"
document.querySelector('.js-log-in-button').addEventListener('click', () => {
  window.location.href = 'login.html';
});
