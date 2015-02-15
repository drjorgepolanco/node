$(document).ready(function() {
  var socket = io.connect('http://localhost:8080');

  socket.on('messages', function (data) {
    console.log(data.message);
  });

  $('form').on('submit', function(event) {
    event.preventDefault();
    var text = $('#field').val();
    socket.emit('send', text);
    $('#field').val('');
    // logs to the browser console
    console.log(text);
  });
});


