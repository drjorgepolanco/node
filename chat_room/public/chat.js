$(document).ready(function() {
  alert('Welcome to The Chat Room!');
  var server = io.connect('http://localhost:3000');
  var inputField = $('#field');
  var chatArea = $('#chatArea');

  server.on('connect', function (data) {
    var getName = function() {
      nickname = prompt("What's your nickname?");
      if (nickname == "") {
        getName();
      }
      else {
        server.emit('join', nickname);
        chatArea.append('<p id="welcome">Hi ' + nickname + 
                        '! Welcome to The Chat Room!</p>');
        setTimeout(function() {
          chatArea.find('#welcome').fadeOut(2000);
        }, 2000);
      }
    }
    getName();
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
