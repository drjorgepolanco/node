'use strict';

var express = require('express');
var app = express();
var badges = require('./controllers/badges');

// Middleware: Every request pass through here that parse every incoming request body
app.use(express.json()); // It parses incoming JSON data

app.post('/', badges.save, badges.send);

app.get('/badges', badges.get);

app.listen(8000, function() {
  console.log('Server is listening on port %d', 8000);
});