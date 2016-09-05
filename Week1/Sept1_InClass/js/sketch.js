// JAVASCRIPT BASICS
// var myString = 'Someone said "String"'

// var myFloat = +1.25

// var myNewVar = myFloat

// var myBool = false

// var myArray = [
// 2,4,6,8,10
// ];

// var myJavascript = {
// 	key1: "value1",
// 	"key2": "value2",
// 	'key3': "value3"
// };

// var mySubwayTrain = {
// 	speed: 65.9,
// 	capacity: 110,
// 	direction: [70,32]
// };

// var mySleep = {
// 	time: 8,
// 	humidity: 98.6,
// 	quality: "good"
// };

// var mySleepArray = [];
// mySleepArray.push(mySleep);

// // mySleep.time;

// // mySleepArray[0].time;


// var myFunction = function(){
// 	console.log("Function called!");
// };

// myFunction();

// // function secondFunction() {};

// var createSleepData = function(t,h,q){
// 	return {
// 		time: t,
// 		humidity: h,
// 		quality: q,
		// clearSleepDataFunction: function(){
		// 	console.log("I want to delete my sleep data");
		// }
// 	};
// };

// mySleepDataObject.Monday.clearSleepDataFunction();

// localStorage.clear()

// var mySleepDataObject = {
// 	'Wednesday': createSleepData(10,.7,"awesome")
// };

// mySleepDataObject['Monday'] = mySleep;
// mySleepDataObject['Tuesday'] = createSleepData(7,0,"poor");

// mySleepDataObject[Date.getDay()] = createSleepData(1,2,"yeah");


// {
// 	time: 7,
// 	humidity: 0,
// 	quality: "poor"
// };

// console.log(mySleepDataObject);

// // mySleepDataObject.Monday.quality;
// // mySleepDataObject.Monday.quality;




// console.log(mySubwayTrain);

// console.log(mySubwayTrain.speed);

// console.log(mySubwayTrain['speed']);

// console.log(mySubwayTrain["speed"]);



// var mult = myArray[2]*myArray[4];







//END BASICS

var mic;
//var micLevel;
var ellipseY;
var arrayOfCircles = [];

var clearLocalStorage = false;

function setup() {

	if (clearLocalStorage){
		localStorage.clear();
	}

	createCanvas(1000,200);
	background(0);
	text = createP("Hello my name is Miri");
	text.class("coffee");
	text.position(100,200);

	mic = new p5.AudioIn();
	mic.start();


	console.log("The HTML5 localStorage object is: ");// + localStorage);
	console.log(localStorage);

	//localStorage.clear();
	if ("ptsArray" in localStorage){
		arrayOfCircles = JSON.parse(localStorage.ptsArray);
	}

	// if ("storedString" in localStorage){
	// 	//don't mess with stored string
	// 	localStorage.setItem("storedString","");
	// } else {
	// 	//create a property "storedString" with value "text"
	// //localStorage.setItem("storedString","text");
	// }
}

function draw() {
	//background(0);
	fill(255);
	stroke(255);
	micLevel = mic.getLevel();
	//println(micLevel);
	ellipseY = constrain(height - height * micLevel *5, 0, height);
	//println(ellipseY);
	ellipse(millis()/100,ellipseY, 2, 2);
	
	arrayOfCircles.push(
		{
			x: millis()/100,
			y: ellipseY,
			time: Date.now()
		}
		);

	//add to the existing value of storedstring
	//localStorage.setItem("storedString",localStorage.storedString+"text");
	

	localStorage.setItem("ptsArray",JSON.stringify(arrayOfCircles));

	console.log(localStorage);

	var p = JSON.parse(localStorage.ptsArray);

	var t = "Local Storage Data: <br />";
	for (var i=0; i < p.length; i++){
		t += "X: " + p[i].x + ", Y: " + p[i].y + "<br />";
	};

	document.getElementById("data").innerHTML = t;

	console.log(t);
	

	for(var i = 1; i < p.length; i++){
		if (i==p.length-1){
			//console.log("X is: " + arrayOfCircles[i]['x']);
		}
		line(p[i-1].x, p[i-1].y, p[i].x, p[i].y);
	}

	//console.log(arrayOfCircles);
	
}