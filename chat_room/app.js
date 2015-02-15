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

io.sockets.on('connection', function (client) {
  console.log('Client connected...');
  // client.emit('message', { nickname: 'Hi! ', message: 'Welcome to the chat' });

  client.on('join', function (name) {
    client.nickname = name;
  });

  client.on('send', function (data) {
    var nickname = client.nickname;
    console.log(data.nickname + " says: '" + data.message + "'");
    io.sockets.emit('message', data);
  });
});

server.listen(port);