
console.log("Hi i am working");

window.addEventListener('deviceorientation', 
	function(orientation){
		console.log("ORIENTATION UPDATE: ");
		console.log(orientation);
	}, 
	false);


navigator.geolocation.getCurrentPosition(function(position) {

	//if (error){
		
	//}

  console.log("My Position is: " + position.coords.latitude, position.coords.longitude);


},function(error){
	console.log("ERROR " + error.message);
});