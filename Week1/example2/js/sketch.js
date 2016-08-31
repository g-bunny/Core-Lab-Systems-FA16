var mic;
var points = [];
var storedTime = 0;
var timeStarted = false;
var timeStamp = 0; //time tracking part
var timeStampX =0; //time tracking part
var secStamp = 0; //time tracking part
var storedSec = 0;
var graphY; //do this later
function setup() {
	//background(255,0,0);
	mic = new p5.AudioIn();
	mic.start();

	createCanvas(8000,255);

	text = createP(name);
	text.id("milk");
	text.position(400,500);
}

function draw() {
	storedTime = timeStamp;
	timeStamp = minute();

	storedSec = secStamp;
	secStamp = second();

	micLevel = mic.getLevel();
	println(constrain(height - micLevel*height*5,0,height));
 	if(mouseIsPressed){
 		fill(255);
 
 	}else {
 		fill(0);
 	} 

 		graphY = constrain(height-micLevel * height * 5,0,height);

 	points.push(
 		{x: millis()/100, 
 		y: graphY}
 		);
 	//println(graphY);
 	ellipse(millis()/100,graphY,4,4);
 	for(var i=1; i < points.length;i++){
 		line(points[i-1].x,points[i-1].y,points[i].x,points[i].y);
 	}
 	// if(points[i-1].y<=50){
 	// 	stroke(0);
 	// } else {
 	// 	stroke(50,0,0);
 	// }
 	stroke(0, 0, 0);

 	if((storedTime != timeStamp && secStamp == 0) || timeStarted ==false){
		println(timeStamp);
		text = createP(timeStamp);
		//text.class("coffee");
		text.position(millis()/100,260);
		//timeStampX += 600;
		timeStarted = true;
	}
 	if(keyIsPressed===true){
 		fill(0,0,255);
 		println("KEY");
 		stroke(0,0,255);

 	} else {
 		//fill(0);
 	}
}