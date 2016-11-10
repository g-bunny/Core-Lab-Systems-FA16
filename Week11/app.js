
var express = require('express');
var app = express();
var server = require('http').Server(app);
var port = 9000;
var io = require('socket.io')(server);

// function mainReqHandler(req, res){
// 	//res.send("Hello World");
// 	res.sendFile(__dirname + '/public/index.html');
// }

//app.get('/', mainReqHandler);

app.use('/', express.static(__dirname + '/public'));

function serverUpCallback(){
	console.log("listening on port: " + port);
}

function incomingSocketHandler(socket){
	console.log('a user has connected');
	console.log(socket);
	console.log(socket.handshake.headers['user-agent']);
	console.log(socket.conn.server.clientsCount);

	socket.on('disconnect', function(){
		console.log("User has disconnected");
	});

	socket.userName = "User " + socket.conn.server.clientsCount;

	socket.emit("welcome message", "Welcome user!");
	socket.on('chat message', function(dataFromClient){
		console.log(dataFromClient);
		var dataFromServer = {
			'userName' : socket.userName,
			'message': dataFromClient.msgText
		}
		console.log(dataFromServer);
		io.emit('latest message', dataFromServer);
		socket.emit('message confirmation', {'text' : "Your message was sent"});
	});

}

io.on('connection', incomingSocketHandler);

server.listen(port, serverUpCallback);