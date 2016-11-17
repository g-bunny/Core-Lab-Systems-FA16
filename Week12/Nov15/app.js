var express = require('express');
var app = express();
var server = require('http').Server(app);
var port = process.env.PORT || 9000;
var io = require('socket.io')(server);

app.use('/', express.static(__dirname + '/public'));

function serverUpCallBack(){
	console.log("listening on port: " + port);
}

function incomingSocket(socket){
	console.log('user connected');
	io.emit('welcome message', {'start' : 'generateCube'});
	socket.on('incoming oData', function(data){
		var dataFromServer = {
			'x' : data.oAlpha,
			'y' : data.oBeta,
			'z' : data.oGamma
		};
		console.log("Orientation: ");
		console.log(dataFromServer);
		io.emit("orientationMsg", dataFromServer);
	})

	socket.on('incoming accelData', function(data){
		var dataFromServer = {
			'x': data.accelX,
			'y': data.accelY,
			'z': data.accelZ
		};
		console.log("Accel: ");
		console.log(dataFromServer);
		io.emit("accelMsg", dataFromServer);
	})
}

io.on('connection', incomingSocket);

server.listen(port, serverUpCallBack);