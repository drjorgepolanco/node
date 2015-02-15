var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.set('views', __dirname + '/tpl');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.get('/', function (req, res) {
  res.render('index');
});

// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/index.jade');
// });
app.use(express.static(__dirname + '/public'))

io.on('connection', function (client) {
  console.log('Client connected...');

  // emit the messages event on the client
  client.emit('messages', { message: "Welcome to the chat!" });

  client.on('send', function (data) {
    client.broadcast.emit('messages', data);
    // logs to the terminal console
    console.log(data);
  });
});

server.listen(8080);