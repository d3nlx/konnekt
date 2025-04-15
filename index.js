// index.js
const http = require('http');

const server = http.createServer((req, res) => {
  // Указываем правильную кодировку
  res.writeHead(200, {
    'Content-Type': 'text/plain; charset=utf-8'
  });

  res.end('Сервер работает! Привет от Node.js 👋');
});

server.listen(3000, () => {
  console.log('Сервер запущен на http://localhost:3000');
});

