var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 15;


var geometry = new THREE.BoxGeometry(1,1,1);
var cube;

var socket = io();

socket.on('welcome message', function(data){
	var col = Math.random() * 0xffffff;
	var material = new THREE.MeshBasicMaterial({color:col, wireframe:true});
	cube = new THREE.Mesh(geometry, material);
	cube.position.x = Math.random() * 10;
	cube.position.y = Math.random() * 10;
	cube.position.z = Math.random() * 10;
	scene.add(cube);
})

function onOrientationChange(data){
	var latestOData = {
		'oAlpha' : data.alpha, 
		'oBeta' : data.beta,
		'oGamma': data.gamma
	}
	socket.emit('incoming oData', latestOData);
}


if(window.DeviceOrientationEvent){
	window.addEventListener('deviceorientation', onOrientationChange, false);
} else {
	window.alert("ERROR, cannot detect orientation event");
}

function onDeviceMotion(data){
	var latestAccelData = {
		'accelX' : data.acceleration.x,
		'accelY' : data.acceleration.y,
		'accelZ' : data.acceleration.z
	}
	socket.emit('incoming accelData', latestAccelData);
}

if(window.DeviceMotionEvent){
	window.addEventListener('devicemotion', onDeviceMotion, false);
} else {
	console.log("ERROR, cannot detect device motion");
}

scene.add(camera);
// cube.position.set(0,0,0);
function render(){
	requestAnimationFrame(render);

	socket.on('orientationMsg', function(data){
		if(data.x != null){
			cube.rotation.x = data.x * 0.05;
			cube.rotation.y = data.y * 0.05;
			cube.rotation.z = data.z * 0.05;

		}
	})
	socket.on('accelMsg', function(data){
		if(data.x !=null){
			if(data.x > 0.3 || data.x < 0.3){
				cube.position.x = data.x;
			}
			if(data.y > 0.3 || data.y < 0.3){
				cube.position.y = data.y;
			}
			if(data.z > 0.3 || data.z < 0.3){
				cube.position.z = data.z;
			}
		}
	})

	renderer.render(scene, camera);
}

render();
