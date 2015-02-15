$(document).ready(function() {
  alert('Welcome to The Chat Room!');
  var socket = io.connect('http://localhost:3000');
  var inputField = $('#field');
  var chatArea = $('#chatArea');

  socket.on('message', function (data) {
    console.log(data.message);
    if (data) {
      chatArea.append(data.message + '<br>');
    }
    else {
      console.log('This is not working, my friend:', data);
    }
  });

  $('form').on('submit', function (e) {
    e.preventDefault();
    var messageText = inputField.val();
    socket.emit('send', {message: messageText});
    console.log(messageText);
    inputField.val('');
  });
});
