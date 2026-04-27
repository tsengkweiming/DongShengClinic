import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

// Mirror netlify.toml redirects for local dev
const REWRITES = [
  { from: /^\/$/, to: '/src/index.html' },
  { from: /^\/blog\.html$/, to: '/src/blog.html' },
  { from: /^\/blog\/(.+)$/, to: (m) => `/src/blog/${m[1]}` },
  { from: /^\/admin(\/.*)?$/, to: '/src/admin/index.html' },
  { from: /^\/appointment\.html$/, to: '/src/appointment.html' },
];

http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  for (const rule of REWRITES) {
    const m = urlPath.match(rule.from);
    if (m) { urlPath = typeof rule.to === 'function' ? rule.to(m) : rule.to; break; }
  }

  const filePath = path.join(__dirname, urlPath);
  const ext = path.extname(filePath).toLowerCase();

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // try index.html in directory
      const indexPath = path.join(filePath, 'index.html');
      fs.readFile(indexPath, (err2, data2) => {
        if (err2) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(data2);
        }
      });
    } else {
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      res.end(data);
    }
  });
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
