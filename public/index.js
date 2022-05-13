var socket = io('http://localhost:3000'); 

function renderMessage(message){
    $('.messages').append('<div class="message"><b>'+ message.author +': </b> '  + message.message +'</div>')
}

socket.on('previousMessages', function(messages){
    for (message of messages){
        renderMessage(message);
    }
});

socket.on('receivedMessage', function(message){
    renderMessage(message);
})

$('#chat').submit(function(event){
    event.preventDefault();
    var author = $('input[name=username]').val();
    var message = $('input[name=message]').val();


    if(author.length && message.length){
        var messageObject = {
            author: author,
            message: message,
        };

        renderMessage(messageObject);

        socket.emit('sendMessage', messageObject);

        //Limpar campo de mensagem após envio da mensagem:
        $('input[name=message]').val('');

    }
})