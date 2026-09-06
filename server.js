const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const crypto = require('crypto');

const PORT = process.env.PORT || 3001;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

const COMPRESSIBLE = new Set([
  'text/html; charset=utf-8',
  'text/css; charset=utf-8',
  'text/javascript; charset=utf-8',
  'application/json; charset=utf-8',
  'application/manifest+json; charset=utf-8',
  'image/svg+xml',
  'application/xml; charset=utf-8',
  'text/plain; charset=utf-8'
]);

const server = http.createServer((req, res) => {
  let safeUrl = req.url.split('?')[0];
  let filePath = path.join(PUBLIC_DIR, safeUrl === '/' ? 'index.html' : safeUrl);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.readFile(path.join(PUBLIC_DIR, 'index.html'), (err2, fallback) => {
          if (err2) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 Not Found');
          } else {
            sendResponse(req, res, 200, 'text/html; charset=utf-8', fallback, false);
          }
        });
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      const isStaticAsset = ext !== '.html' && ext !== '.xml' && ext !== '.txt';
      sendResponse(req, res, 200, contentType, content, isStaticAsset);
    }
  });
});

function sendResponse(req, res, status, contentType, content, isStaticAsset) {
  // Generate ETag for high-efficiency client-side validation
  const etag = `"${crypto.createHash('md5').update(content).digest('base64').substring(0, 27)}"`;

  const headers = {
    'Content-Type': contentType,
    'ETag': etag,
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  };

  if (isStaticAsset) {
    headers['Cache-Control'] = 'public, max-age=31536000, immutable';
  } else {
    headers['Cache-Control'] = 'public, max-age=0, must-revalidate';
  }

  // 304 Not Modified check
  const ifNoneMatch = req.headers['if-none-match'];
  if (ifNoneMatch && ifNoneMatch === etag) {
    res.writeHead(304, headers);
    res.end();
    return;
  }

  const acceptEncoding = req.headers['accept-encoding'] || '';

  if (COMPRESSIBLE.has(contentType) && acceptEncoding.includes('gzip')) {
    zlib.gzip(content, (err, compressed) => {
      if (err) {
        headers['Content-Length'] = Buffer.byteLength(content);
        res.writeHead(status, headers);
        res.end(content);
      } else {
        headers['Content-Encoding'] = 'gzip';
        headers['Content-Length'] = Buffer.byteLength(compressed);
        headers['Vary'] = 'Accept-Encoding';
        res.writeHead(status, headers);
        res.end(compressed);
      }
    });
  } else {
    headers['Content-Length'] = Buffer.byteLength(content);
    res.writeHead(status, headers);
    res.end(content);
  }
}

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
