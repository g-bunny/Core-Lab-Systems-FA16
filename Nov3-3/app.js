//This is the main file for my Node app

//import minim

//#include "main.h"

var app = require('express')();
var http = require('http').Server(app);

var requestHandler = function(req,res){
	//res.send('<h1>I the server have definitely received your message</h1>');
		res.sendFile(__dirname + '/public/index.html');
};

var photoRequestHandler = function(req,res){
		res.sendFile(__dirname + '/public/photos.html');
}

//A way you might wrap the express app.get function to easily handle different file addresses
// var servePage = function(url){
// 	app.get(url, requestHandler)
// }

app.get('/', requestHandler);

app.get('/photos', photoRequestHandler);

// //console.log(http);

var port = 9000;

var serverUpCallback = function(){
	console.log("Server is running at port " + port);
}

http.listen(port,serverUpCallback);



// var requestHandler = function(req,res){
// 	//those stand for request and response
// 	console.log(req.url);

// 	if (req.url === "/comments"){
// 		res.end("You are in the comments section!");
// 	} else if (req.url === "/photos"){
// 		res.end("Check out these photos!");
// 	} else {
// 		res.end("I, the server, have received your message, client!");
// 	}
// };

// var server = http.createServer(requestHandler);

// server.listen(port,"127.0.0.1",serverUpCallback);