var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    port = 3000,
    nickname;

app.set('views', __dirname + '/tpl');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.get('/', function (req, res) {
  res.render('index');
});

app.use(express.static(__dirname + '/public'));

io.sockets.on('connection', function (client) {
  console.log('Client connected...');

  client.on('join', function (name) {
    client.nickname = name;
  });

  client.on('send', function (data) {
    nickname = client.nickname;
    console.log(data.nickname + " says: '" + data.message + "'");
    io.sockets.emit('message', data);
  });
});

server.listen(port);