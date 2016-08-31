var mic;
//var micLevel;
var ellipseY;
var arrayOfCircles = [];
function setup() {
	createCanvas(1000,200);
	background(0);
	text = createP("Hello my name is Miri");
	text.class("coffee");
	text.position(100,200);

	mic = new p5.AudioIn();
	mic.start();
}

function draw() {
	//background(0);
	fill(255);
	stroke(255);
	micLevel = mic.getLevel();
	//println(micLevel);
	ellipseY = constrain(height - height * micLevel *5, 0, height);
	println(ellipseY);
	ellipse(millis()/100,ellipseY, 2, 2);
	arrayOfCircles.push(
		{x: millis()/100,
		y: ellipseY}
		);

	for(var i = 1; i < arrayOfCircles.length; i++){
		console.log(arrayOfCircles[i]);
		line(arrayOfCircles[i-1].x, arrayOfCircles[i-1].y, arrayOfCircles[i].x, arrayOfCircles[i].y);
	}

	console.log(arrayOfCircles);
	
}