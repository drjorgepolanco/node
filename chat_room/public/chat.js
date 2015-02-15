$(document).ready(function() {
  // alert('Welcome to The Chat Room!');
  var server = io.connect('http://localhost:3000');
  var inputField = $('#field');
  var chatArea = $('#chatArea');

  server.on('connect', function (data) {
    chatArea.append('Hi! Welcome to The Chat Room!<br>');
    nickname = prompt("What's your nickname?");
    server.emit('join', nickname);
  });

  server.on('message', function (data) {
    console.log(data.nickname + " says: '" + data.message + "'");
    if (data) {
      chatArea.append(data.nickname + ": " + data.message + '<br>');
    }
    else {
      console.log('This is not working, my friend:', data);
    }
  });

  $('form').on('submit', function (e) {
    e.preventDefault();
    var messageText = inputField.val();
    server.emit('send', { nickname: nickname, message: messageText });
    console.log(messageText);
    inputField.val('');
  });
});
