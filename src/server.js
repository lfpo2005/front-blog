const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');

const app = express();

const html404 = path.join(__dirname, 'dist/your-angular-app/404.html');

app.use(history({
  rewrites: [
    {
      from: /^\/404$/,
      to: function(context) {
        return '/404.html';
      }
    },
    {
      from: /\/[^]/,
      to: function(context) {
        return '/index.html';
      }
    }
  ]
}));

app.use(express.static(path.join(__dirname, 'dist/your-angular-app')));

app.listen(process.env['PORT'] || 8080);
