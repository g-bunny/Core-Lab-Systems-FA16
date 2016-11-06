var filters = ['grayscale', 'sepia', 'blur', 'brightness', 'contrast', 'hue-rotate', 'saturate', 'invert', ''];
var index = 0;

function changeFilter(event){
	var eventList = event.target;
	eventList.className = '';
	var effect = filters[index++ % filters.length];
	eventList.classList.add(effect);
	console.log(effect);
}

var video = document.querySelector('video');

video.addEventListener('click', changeFilter, false);

var handleVideo = function(stream){
	video.src = window.URL.createObjectURL(stream);
}

function errorCallback(banana){
	console.log('User Rejected', banana);
}

function hasGetUserMedia(){
	return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia || navigator.msGetUserMedia);	
}


if(hasGetUserMedia()){
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia || navigator.msGetUserMedia;

	navigator.getUserMedia({audio: true, video: true}, handleVideo, errorCallback);




} else {
	alert('getUserMedia() is not supported in your browser');
	video.src = "testVid.mov";
}