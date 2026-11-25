const http = require('http');
const fs = require('fs');
const path = require('path');

const root = process.cwd();

http.createServer((req, res) => {
  const file = path.join(root, decodeURIComponent(req.url.split('?')[0].split('#')[0]).replace(/^\/+/, '') || 'index.html');

  if (!file.startsWith(root + path.sep) && file !== path.join(root, 'index.html')) {
    res.writeHead(403);
    return res.end('Acesso negado');
  }

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end('Arquivo não encontrado');
    }

    const ext = path.extname(file);
    const types = {
      '.html': 'text/html; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.js': 'application/javascript; charset=utf-8',
      '.json': 'application/json; charset=utf-8',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.svg': 'image/svg+xml'
    };

    res.writeHead(200, {
      'Content-Type': types[ext] || 'application/octet-stream'
    });
    res.end(data);
  });
}).listen(8080, '127.0.0.1', () => {
  console.log('Site disponível em http://localhost:8080');
});