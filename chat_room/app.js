var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    port = 3000,
    nickname,
    messages = [],
    redis = require('redis'),
    redisClient = redis.createClient(),
    storeMessage;

// Storing without database
// ========================
// var storeMessage = function (nickname, message) {
//   messages.push({ 
//     nickname: nickname, 
//     message: message 
//   });
//   if (messages.length > 10) {
//     messages.shift();
//   }
// }

storeMessage = function (nickname, message) {
  var data = JSON.stringify({
    nickname: nickname,
    message: message
  });
  redisClient.lpush('messages', data, function (err, response) {
    redisClient.ltrim('messages', 0, 9);
  });
}

app.set('views', __dirname + '/tpl');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.get('/', function (req, res) {
  res.render('index');
});

app.use(express.static(__dirname + '/public'));

io.sockets.on('connection', function (client) {
  console.log('Client connected...');

  // Emiting without database
  // ========================
  // client.on('join', function (name) {
  //   client.nickname = name;
  //   messages.forEach(function (data) {
  //     client.emit('message', data);
  //     console.log(data);
  //   });
  // });

  client.on('join', function (name) {
    client.nickname = name;
    redisClient.lrange('messages', 0, -1, function (error, messages) {
      messages = messages.reverse();
      messages.forEach(function (message) {
        message = JSON.parse(message);
        client.emit('message', message);
      });
    });
  });

  client.on('send', function (data) {
    nickname = client.nickname;
    console.log(data.nickname + " says: '" + data.message + "'");
    storeMessage(data.nickname, data.message);
    io.sockets.emit('message', data);
  });
});

server.listen(port);