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
app.use(express.static(__dirname + '/public'))

io.on('connection', function (client) {
  console.log('Client connected...');

  client.emit('messages', { message: "Welcome to the chat!" });
});

server.listen(8080);