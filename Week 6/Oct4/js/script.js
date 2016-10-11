document.addEventListener("DOMContentLoaded",function(event){

console.log("I'm working!");
var x = document.getElementById("loc");

navigator.geolocation.getCurrentPosition(showPosition, showError);

function showPosition(position){
	console.log("My position is: " + position.coords.latitude, position.coords.longitude);
	x.innerHTML = "Latitude: " + position.coords.latitude + "<br> Longitude: " + position.coords.longitude;
}

function showError(error){
	console.log("ERROR: " + error.message);
}

});