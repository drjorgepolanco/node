$(document).ready(function () {
  alert('Welcome to The Chat Room!');
  var server = io.connect('http://localhost:3000'),
      inputField = $('#field'),
      chatArea = $('#chatArea'),
      getName,
      messageText;

  server.on('connect', function (data) {
    getName = function () {
      nickname = prompt("What's your nickname?");
      if (nickname == "") {
        getName();
      }
      else {
        server.emit('join', nickname);
        chatArea.append('<p id="welcome">Hi ' + nickname + 
                        '! Welcome to The Chat Room!</p>');
        console.log(nickname + ' joined the chat!');
        setTimeout(function () {
          chatArea.find('#welcome').fadeOut(2000);
        }, 2000);
      }
    }
    getName();
  });

  server.on('message', function (data) {
    console.log(data.nickname + " says: '" + data.message + "'");
    if (data) {
      chatArea.append(data.nickname + ": " + data.message + "<br>");
    }
    else {
      console.log('This is not working, my friend:', data);
    }
  });

  $('form').on('submit', function (event) {
    event.preventDefault();
    messageText = inputField.val();
    server.emit('send', { 
      nickname: nickname, 
      message: messageText 
    });
    inputField.val('');
  });
});
