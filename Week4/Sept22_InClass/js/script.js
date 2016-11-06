var viewAngle = 75;
var aspectRatio = window.innerWidth / window.innerHeight;
var near = 10;
var far = 2500;
var camera = new THREE.PerspectiveCamera(viewAngle, aspectRatio, near, far);
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
var cube;
var group;
var sphere;
var pointLight = new THREE.PointLight(0xFFFFFF);
var mouseX = 0;
var mouseY = 0;

var cameraOrbit = false;

var skyColor = new THREE.Color(0.8,0.9,1.0);
renderer.setClearColor(skyColor, 1);

var Vec3 = function(x,y,z){
	return new THREE.Vector3(x,y,z);
};

//THIS IS LIKE YOUR SETUP FUNCTION
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
	camera.position.y = 500;
	camera.position.z = 1500;
	//camera.up = new THREE.Vector3(0,)
	camera.lookAt(Vec3(0,0,0));
	scene.add(camera);
}

var cityWidth = 2000;//*Math.sin(Date.now());
var maxBldgHeight = 500;
var buildingsAcross = 10;
var bldgIncrement = 1/buildingsAcross;
//console.log(bldgIncrement);

function createCube(){

	var setBuildingSize = function(bldgHeight,bldgWidth){
		var newGeo = new THREE.BoxGeometry(bldgWidth,bldgHeight,bldgWidth);
		return newGeo;
	};
	// for(var i = 0; i < geometry.faces.length; i +=2){
	// 	var hex = Math.random() * 0xffffff;
	// 	geometry.faces[i].color.setHex(hex);
	// 	geometry.faces[i+1].color.setHex(hex);
	// }
	
	var material = new THREE.MeshStandardMaterial(
	{
		vertexColors: THREE.FaceColors,
		wireframe: false
	});
	group = new THREE.Group();

	for (var zSpacing=0; zSpacing<1; zSpacing+=bldgIncrement){

		for(var xSpacing =0; xSpacing<1; xSpacing+=bldgIncrement){

			var buildingHeight = maxBldgHeight*Math.random();

			var thisCubeGeo = setBuildingSize(buildingHeight,100);

			cube = new THREE.Mesh(thisCubeGeo,material);//setBuildingSize(300,100), material);
			cube.position.x = xSpacing*cityWidth - (cityWidth*0.5);//Math.random() * cityWidth - (cityWidth*0.5);
			cube.position.y = buildingHeight*0.5;//Math.random() * cityWidth - (cityWidth*0.5);
			cube.position.z = zSpacing*cityWidth - (cityWidth*0.5);;//*cityWidth - (cityWidth*0.5);;//Math.random() * cityWidth - (cityWidth*0.5);

			cube.rotation.x = 0;//Math.random() * 2 *Math.PI;
			cube.rotation.y = 0;//Math.random() * 2 * Math.PI;

			cube.updateMatrix();
			group.add(cube);
		}
	}

	//console.log(group);
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

//MAKE YOUR OWN FRAMECOUNT VARIABLE JUST LIKE IN PROCESSING
var frameCount = 0;

//THIS IS LIKE YOUR DRAW LOOP
function animatedRender(){
	requestAnimationFrame(animatedRender);
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	renderer.render(scene,camera);
	//console.log("mouseX: " + mouseX);
	//console.log("mouseY: " + mouseY);

	if (cameraOrbit){
		var camDistance = 2000;
		var camPosX = camDistance*Math.sin(frameCount*0.005);
		var camPosY = maxBldgHeight;
		var camPosZ = camDistance*Math.cos(frameCount*0.005);

		camera.position.set(camPosX,camPosY,camPosZ);

		camera.lookAt(Vec3(0,0,0));//maxBldgHeight,0));


	}

	var skyR = 0.8;
	var skyG = 0.7+Math.sin(frameCount*0.01)*0.2;
	var skyB = 0.8+Math.sin(frameCount*0.01)*0.2;
	skyColor = new THREE.Color(skyR,skyG,skyB);
	renderer.setClearColor(skyColor,1);

	 //camera.position.x += (mouseX - camera.position.x) * 0.01;
	//camera.position.z += (-mouseY - camera.position.y) * 0.01;

	frameCount++;
	console.log(frameCount);
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