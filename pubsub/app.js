'use strict';

var express = require('express');
var app = express();
var badges = require('./controllers/badges');

// Middleware: Every request pass through here that parse every incoming request body
app.use(express.json()); // It parses incoming JSON data

app.post('/', badges.save, badges.send, function(req, res) {
  res.send('\ndone\n\n');
});

app.listen(8000);