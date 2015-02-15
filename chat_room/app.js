var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = 3000;

app.set('views', __dirname + '/tpl');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.get('/', function (req, res) {
  res.render('index');
});

app.use(express.static(__dirname + '/public'))

io.sockets.on('connection', function (socket) {
  console.log('Client connected...');
  socket.emit('message', { message: 'Welcome to the chat' });
  socket.on('send', function (data) {
    console.log(data);
    io.sockets.emit('message', data);
  });
});

server.listen(port);