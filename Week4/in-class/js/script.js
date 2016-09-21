var viewAngle = 75;
var aspectRatio = window.innerWidth / window.innerHeight;
var near = 0.1;
var far = 1000;
var camera = new THREE.PerspectiveCamera(viewAngle, aspectRatio, near, far);
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
var cube;
var group;
var sphere;
var pointLight = new THREE.PointLight(0xFFFFFF);
var mouseX = 0;
var mouseY = 0;

function init(){

	document.addEventListener('mousemove', onDocumentMouseMove, false);
	window.addEventListener('resize', onWindowResize, false);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	pointLight.position.x = 10;
	pointLight.position.y = 50;
	pointLight.position.z = 130;

	createCube();
	createSphere();

	scene.add(group);
	scene.add(sphere);
	scene.add(pointLight);
	camera.position.z = 300;
	scene.add(camera);
}

function createCube(){
	var geometry = new THREE.BoxGeometry(100,100,100);
	for(var i = 0; i < geometry.faces.length; i +=2){
		var hex = Math.random() * 0xffffff;
		geometry.faces[i].color.setHex(hex);
		geometry.faces[i+1].color.setHex(hex);
	}
	var material = new THREE.MeshStandardMaterial(
	{
		vertexColors: THREE.FaceColors,
		wireframe: false
	});
	group = new THREE.Group();
	for(var i =0; i<100; i++){
		cube = new THREE.Mesh(geometry, material);
		cube.position.x = Math.random() * 2000 - 1000;
		cube.position.y = Math.random() * 2000 - 1000;
		cube.position.z = Math.random() * 2000 - 1000;

		cube.rotation.x = Math.random() * 2 *Math.PI;
		cube.rotation.y = Math.random() * 2 * Math.PI;

		cube.updateMatrix();
		group.add(cube);
	}

	console.log(group);
}

function createSphere(){
	var radius = 50;
	var segments = 4;
	var rings = 4;
	var sphereMaterial = new THREE.MeshLambertMaterial(
	{
		color: 0xFF0000,
		wireframe: false
	});
	var sphereGeometry = new THREE.SphereGeometry(radius, segments, rings);
	sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	sphere.position.x = 200;
}

function animatedRender(){
	requestAnimationFrame(animatedRender);
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	renderer.render(scene,camera);
	console.log("mouseX: " + mouseX);
	console.log("mouseY: " + mouseY);
	camera.position.x += (mouseX - camera.position.x) * 0.01;
	camera.position.y += (-mouseY - camera.position.y) * 0.01;
}

function onDocumentMouseMove(event){
	mouseX = (event.clientX - window.innerWidth/2);
	mouseY = (event.clientY -window.innerHeight/2);
}

function onWindowResize(){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
animatedRender();