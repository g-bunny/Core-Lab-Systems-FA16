Math.map = function(valueToMap,min,max,minToMap,maxToMap){
	var mappedValue = minToMap + (maxToMap - minToMap) * ((valueToMap - min) / (max - min));
	return mappedValue;
};



function setup() {

	createCanvas(1000,1000);
	noLoop();

	//console.log(Math);
}

var parsedData = [];

var finalData = {};

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

	console.log(parsedData);

	var testVar = [002,021,015,006,000,008,117,012];

	var sortFunction = function(a,b){
		var firstBabyNameRowObject = a;
		var secondBabyNameRowObject = b;

		var rankOfFirst = firstBabyNameRowObject.RNK; //TWO different syntaxes for getting an object property's value
		var rankOfSecond = secondBabyNameRowObject["RNK"];
		return rankOfFirst-rankOfSecond;
	};

	//testVar.sort(sortFunction);
	parsedData.sort(sortFunction);

	var indexCount = 0;

	for (var row in parsedData){
		var thisRow = parsedData[row];

		var babyName = thisRow.NM.toUpperCase();

		if (thisRow.ETHCTY == "HISPANIC" && thisRow.GNDR == "FEMALE"){
			if (babyName in finalData){
				//ignore
				//finalData[babyName].CNT += +thisRow.CNT;
			} else {
				thisRow.nameIndex = indexCount;
				finalData[babyName] = thisRow;

				indexCount++;
			}
		}


	}



	console.log(finalData);

	var getBabyDataByIndex = function(i){
		for (var name in finalData){
			if (finalData[name].nameIndex === i){
				return finalData[name];
			}
		}
	};

	var maxBabyCount = getBabyDataByIndex(0).CNT;

	console.log("The babyData object Count at index 0 is: ");
	console.log(maxBabyCount);


	for (var name in finalData){
		var babyCount = finalData[name].CNT;

		var mappedBabyCount = map(babyCount,0,maxBabyCount,400,10);
		// ellipse(finalData[name].nameIndex*10,mappedBabyCount,10,10);
		ellipse(finalData[name].nameIndex*20,mappedBabyCount,babyCount,babyCount);
	}



	//parsedData.sort();

	
	// var txt = "";
	// //this is looping through an array:
	// for (var rowIndex in parsedData){
	// 	//txt = "";
	// 	// var txt = "";
	// 	txt += '<div class="dRow">';

	// 	var dataRow = parsedData[rowIndex];

	// 	//this is looping through an object:
	// 	for (var objectKey in dataRow){
	// 		txt += dataRow[objectKey] + " ";
	// 	};

	// 	txt += "</div>";
	// 	//txt += "\n";

	// 	// text(txt,20,20*rowIndex);
	// }

	// document.getElementById("data").innerHTML = txt;
	//text(txt,20,20);

}

var errorFunction = function(error){
	console.log("There was an error!");
	console.log(error);
}

function draw() {
	
	loadStrings(filePath,callbackFunction,errorFunction);

	//document.getElementById("defaultCanvas0").className = "redCanvas";

	//$('#defaultCanvas0').addClass('redCanva'anotherClass').rems').addClass(oveClass('existingClass');

	//ellipse(50,50,50,50);	
	
}

