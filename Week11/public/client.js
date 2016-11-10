var socket = io();


//reading data from server
socket.on('welcome message', function(data){
	$('#messages').append($('<li>').text(data));
	console.log("welcome is working");
})

socket.on('latest message', function(data){
	$('#messages').append($('<li>').text(data.userName + ": " + data.message));
})

socket.on('message confirmation', function(data){
	window.alert(data.text);
})



//sending data to server
$('form').submit(submitFired);

function submitFired(){
	var dataFromClient = {
		'msgText' : $('#m').val()
	}
	socket.emit('chat message', dataFromClient);
	$('#m').val();
	return false;
}