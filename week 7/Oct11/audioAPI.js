var audioCtx = new (window.AudioContext || window.webkitAudioContext)();


//toggle oscillator on/off
//var oscillator = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();
//toggle dealy on/off
var delayNode = audioCtx.createDelay(5.0);
var htmlAudio= document.querySelector('audio');
var source = audioCtx.createMediaElementSource(htmlAudio);

source.connect(delayNode);
//oscillator.connect(delayNode);
delayNode.connect(gainNode);
gainNode.connect(audioCtx.destination);

// oscillator.type= 'sine';
// oscillator.frequency.value = 2000;
// oscillator.start(0);

var currentX = 0;
var currentY = 0;
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

function updateSound(e){
	if(window.Event){
		currentX = e.pageX;
		currentY = e.pageY;
	}

	//oscillator.frequency.value = (currentX/WIDTH) * 2000;
	gainNode.gain.value = (currentX/WIDTH) * 0.1;
	delayNode.delayTime.value = (currentY/HEIGHT) *0.03;
}

document.onmousemove = updateSound;