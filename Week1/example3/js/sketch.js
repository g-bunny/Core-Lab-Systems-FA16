var mic;
var points = [];
var storedTime = 0;
var timeStarted = false;
var timeStamp = 0; //time tracking part
var timeStampX = 0; //time tracking part
var secStamp = 0; //time tracking part
var storedSec = 0;
var graphY; //do this later

var xIncrement = 5;

//SHOULD WE CLEAR LOCALSTORAGE?
var lsClear = true;

//quick custom functions
var store = function(data) {
    return JSON.stringify(data);
};

var unStore = function(data) {
    return JSON.parse(data);
}

Math.map = function(varToMap, varMin, varMax, mapToMin, mapToMax, clamp) {
    var mappedValue = mapToMin + (mapToMax - mapToMin) * ((varToMap - varMin) / (varMax - varMin));

    // if (clamp) {
    //     var runClamp = function(min, max) {
    //         if (mappedValue < min) {
    //             mappedValue = min;
    //         } else if (mappedValue > max) {
    //             mappedValue = max;
    //         }
    //     };
    //     //Does claming differently if second map range is reversed
    //     if (mapToMin > mapToMax) {
    //         runClamp(mapToMax, mapToMin);
    //     } else {
    //         runClamp(mapToMin, MapToMax);
    //     }

    // } 
    return mappedValue;
    //}
};

function setup() {
    //background(255,0,0);
    mic = new p5.AudioIn();
    mic.start();

    //CHANGE THIS!!
    createCanvas(1800, 255);

    text = createP(name);
    text.id("milk");
    text.position(400, 500);

    //CLEAR LOCALSTORAGE IF BOOL SET
    if (lsClear) {
        localStorage.clear();
    }
    //THIS PULLS THE EXISTING VALUE OF LOCAL STORAGE BEFORE WE OVERWRITE IT
    else if ("storedPoints" in localStorage) {
        //points = JSON.parse(localStorage.storedPoints);
        points = unStore(localStorage.storedPoints);
    }

    // xIncrement = 5;


}

function draw() {
    background(255);

    storedTime = timeStamp;
    timeStamp = minute();

    storedSec = secStamp;
    secStamp = second();

    micLevel = mic.getLevel();
    println(constrain(height - micLevel * height * 5, 0, height));
    if (mouseIsPressed) {
        fill(255);

    } else {
        fill(0);
    }

    graphY = constrain(height - micLevel * height * 5, 0, height);

    points.push({
        x: millis() * .1,
        y: graphY,
        time: Date.now()
    });

    //JSON.stringify
    //JSON.parse
    // localStorage.setItem("storedPoints", JSON.stringify(points));
    localStorage.setItem("storedPoints", store(points));
    console.log("Stored Points: ");
    console.log(localStorage.storedPoints);

    var p = JSON.parse(localStorage.storedPoints);

    //p = points;

    //println(graphY);
    //ellipse(millis() / 100, graphY, 4, 4);
    var l = p.length;
    var ptsMax = window.width/xIncrement;

    for (var i = 1; i < l; i++) {

       //var lastPt = p[l - 1];

        var lFromEnd = l-i;

        if (lFromEnd < ptsMax) {



        // if ((l - i) < width / xIncrement) { //(millis()*.1);

            // var x1 = Math.map(p[i - 1].time, p[0].time, p[p.length - 1].time, 0, 1);
            // x1 = x1 * width;

            // var x2 = Math.map(p[i].time, p[0].time, p[p.length - 1].time, 0, 1);
            // x2 = x2 * width;


            // line(p[i - 1].x, p[i - 1].y, p[i].x, p[i].y);
            //line(x1, p[i - 1].y, x2, p[i].y);
            line(xIncrement * (ptsMax - lFromEnd -1), p[i - 1].y, xIncrement * (ptsMax - lFromEnd), p[i].y);
        }
    }
    // if(points[i-1].y<=50){
    // 	stroke(0);
    // } else {
    // 	stroke(50,0,0);
    // }
    stroke(0, 0, 0);

    if ((storedTime != timeStamp && secStamp == 0) || timeStarted == false) {
        println(timeStamp);
        text = createP(timeStamp);
        //text.class("coffee");
        text.position(millis() / 100, 260);
        //timeStampX += 600;
        timeStarted = true;
    }
    if (keyIsPressed === true) {
        fill(0, 0, 255);
        println("KEY");
        stroke(0, 0, 255);

    } else {
        //fill(0);
    }
}