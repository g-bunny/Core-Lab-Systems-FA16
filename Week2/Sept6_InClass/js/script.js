var img;
var colorArray = [];

var sumR = 0;
var sumG = 0;
var sumB = 0;

var averageR = 0;
var averageG = 0;
var averageB = 0;

var offset = 0;
var circleScale = 0;

var redSize = 0;
var greenSize = 0;
var blueSize = 0;

var aveRfill = 255;
var aveGfill = 255;
var aveBfill = 255;

function preload(){
 	img = loadImage("assets/piet_small.jpg");
 	//img = loadImage("assets/blue.png");
 	//img = createCapture(VIDEO);
 	//img.size(400,400);
}

function setup(){
	createCanvas(400,800);

	offset = height/2;

	image(img, 0, 0);
	loadPixels();
	updatePixels();
	println(pixels[0]);
	println(pixels[1]);
	println(pixels[2]);
	println(pixels[3]);

	for (var i = 0; i <pixels.length/2; i+=4){
		colorArray.push(
		{
			r: pixels[i],
			g: pixels[i+1],
			b: pixels[i+2],
			a: pixels [i+3]
		});
	}

	for (var i =0; i < colorArray.length; i++){
		sumR += colorArray[i].r;
		sumG += colorArray[i].g;
		sumB += colorArray[i].b;
	}

	averageR = sumR/colorArray.length;
	averageG = sumG/colorArray.length;
	averageB = sumB/colorArray.length;

	println("averageR : " + averageR);

	//localStorage.clear();
	//localStorage.setItem("arrayOfColors", JSON.stringify(colorArray));
	//console.log(localStorage.arrayOfColors);

	ellipseMode(CORNER);
	noStroke();
	circleScale = img.height / (averageR + averageG + averageB);
}

function draw(){
	background(255);
	image(img, 0, 0);
	// println(pixels[0]);
	// println(pixels[1]);
	// println(pixels[2]);

	if(redSize < averageR * circleScale){
		redSize++;
	}
	if (greenSize < averageG * circleScale){
		greenSize++;
	}
	if (blueSize < averageB * circleScale){
		blueSize ++
	}

	if(aveRfill > averageR){
		aveRfill--;
	}
	if(aveGfill > averageG){
		aveGfill--;
	}
	if(aveBfill > averageB){
		aveBfill--;
	}		
	// redSize = averageR * circleScale;
	// greenSize = averageG * circleScale;
	// blueSize = averageB * circleScale;

	fill(aveRfill, aveGfill, aveBfill);
	ellipse(0,offset,offset,offset);
	fill(255,0,0);
	ellipse(0,offset,redSize,redSize);
	fill(0,255,0);
	ellipse(redSize,offset +redSize, greenSize,greenSize);
	fill(0,0,255);
	ellipse(redSize + greenSize,offset +redSize + greenSize, blueSize, blueSize);
	println(blueSize);
}

function mouseClicked(){
	redSize = 0;
	greenSize = 0;
	blueSize =0;
	aveRfill = 255;
	aveGfill = 255;
	aveBfill = 255;
}