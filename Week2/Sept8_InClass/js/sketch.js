
function setup() {

	createCanvas(1000,1000);
	noLoop();
}

var parsedData = [];

var filePath = "https://data.cityofnewyork.us/api/views/25th-nujf/rows.csv";

var callbackFunction = function(data){
	//text("DATA LOAD SUCCESS!!!", 20,20);
	// console.log("This is the data we got:");
	// console.log(data);

	console.log("This is the first element of our data: ");
	console.log(data[0]);

	var objectFromRow = function(headerRow,dataRow){
		var headersArray = headerRow.split(",");
		var dataArray = dataRow.split(",");

		var dataObj = {};

		for (var i= 0; i<headersArray.length; i++){
			var key = headersArray[i]; //header for this column
			var value = dataArray[i]; //data for this column in this row

			dataObj[key] = value;
		}

		// console.log("Data object created!");
		// console.log(dataObj);

		return dataObj;
	};

	for (var row=1; row<data.length;row++){
		//console.log(data[row].split(","));

		var hRow = data[0];
		var dRow = data[row];
		parsedData.push(objectFromRow(hRow,dRow));


		//sumOfNames += data[row].count;
	}

	var sortFunction = function(a,b){
		return b.CNT - a.CNT;
	}

	parsedData.sort(sortFunction);

	//console.log(parsedData);

	for (var r in parsedData){

		var txt = "";
		for (var key in parsedData[r]){
			txt += parsedData[r][key] + " ";
		}

		text(txt, 20,20*r);
	}

	var displayObject = makeDisplayObject(parsedData);
}

var errorFunction = function(error){
	console.log("There was an error!");
	console.log(error);
}



var makeDisplayObject = function(data){

	var dObj = {};

	for (var r in data){
		var babyName = data[r].NM;
		var nameCount = +data[r].CNT;

		if (!(babyName in dObj)){
			dObj[babyName] = +nameCount;
		} else {
			dObj[babyName] += +nameCount;
		}
		
	}

console.log("Data object is: ");
	console.log(dObj);
	return dObj;
}

function draw() {
	
	loadStrings(filePath,callbackFunction,errorFunction);

	
	
}

