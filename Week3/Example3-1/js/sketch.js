// var data;
var parsedData = [];

// function preload(){
// 		data = loadStrings("https://data.cityofnewyork.us/api/views/25th-nujf/rows.csv",dataCallback);

// }

function setup() {
	createCanvas(1000,1000);
	noLoop();
}

function draw() {

	//loadStrings(filePath,callback,errorCallback);
	loadStrings("https://data.cityofnewyork.us/api/views/25th-nujf/rows.csv",dataCallback);
	
	//dataCallback(data);
}

var dataCallback = function(data){
	text("LOADSTRINGS SUCCESS!",20,20);



	var objectFromRow = function(headerRow,dataRow){
		var headersArray = headerRow.split(',');
		var dataArray = dataRow.split(',');

		var objToReturn = {};

		for (var i = 0; i<headersArray.length; i++){
			var key = headersArray[i];
			var value = dataArray[i];
			objToReturn[key]=value;
		}

		console.log("Data object created: ");
		console.log(objToReturn);

		return objToReturn;
	};

	

	for (var row = 1; row < data.length; row++)
	{
		//text(data[row],20,20*(row+2));
		var headerIndex = 0;
		var rowObject = objectFromRow(data[headerIndex],data[row]);
		parsedData.push(rowObject);
		text(rowObject.NM,20,20*(1+row));
		text(rowObject.CNT,100,20*(1+row));
	
	}

	// for (var d in parsedData){
	// 	text(parsedData[d].NM,20,20*(1+row));
	// 	text(parsedData[d].CNT,100,20*(1+row));
	// }
}


//===============================================


var demoFunction = function (path, callback, errorCallback) {
  var ret = [];
  var req = new XMLHttpRequest();
  //var decrementPreload = p5._getDecrementPreload.apply(this, arguments);

  req.addEventListener('error', function (resp) {
    if (errorCallback) {
      errorCallback(resp);
    } else {
      console.log(resp.responseText);
    }
  });

  req.open('GET', path, true);
  //this tracks status of XML request
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      if (req.status === 200) {
      	//this is a regular expression that says "Find any text that isn't a \r or \n, and store it in an array as a string, and keep doing that for everything. It skips the line breaks."
        var arr = req.responseText.match(/[^\r\n]+/g);

        //this passes the array of ROWS we just created into an array variable to be returned.
        for (var k in arr) {
          ret[k] = arr[k];
        }

        //this calls a callback function if there is one... *FOR EXAMPLE THE FUNCTION TO PARSE THE DATA
        //BUT you could also just say "myDataArray = loadStrings(etc)..."
        if (typeof callback !== 'undefined') {
          callback(ret);
        }

        //this is for if loadStrings is called in the P5 Preload function
        if (decrementPreload && (callback !== decrementPreload)) {
          decrementPreload();
        }

        //this executes an error callback if we've passed one in
      } else {
        if (errorCallback) {
          errorCallback(req);
        } else {
          console.log(req.statusText);
        }
        //p5._friendlyFileLoadError(3, path);
      }
    }
  };
  req.send(null);
  return ret;
};