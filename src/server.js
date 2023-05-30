const express = require('express');
const path = require('path');
const historyApiFallback = require('connect-history-api-fallback');

const app = express();

app.use(historyApiFallback({
  rewrites: [
    { from: /\/404$/, to: '/404.html' }
  ]
}));

// Serve static files
app.use(express.static(__dirname + '/dist/your-angular-app'));

// Start the app by listening on the default Heroku port
app.listen(process.env['PORT'] || 8080);
