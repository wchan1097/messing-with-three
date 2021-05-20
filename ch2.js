var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var step = 0;

/* ---------------------------- Functions ---------------------------- */

function initStats(){
  var stats = new Stats();
  stats.setMode(0);
  stats.domElement.style.position = "absolute";
  stats.domElement.left = "0";
  stats.domElement.top = "0";
  $("#stats").append(stats.domElement);
  return stats;
}

function render(){
  stats.update();
  let regex = new RegExp('^cube-[\d]*');
  scene.traverse((element) => {
    if (regex.test(element.name)){
      element.rotation.x += controls.rotationSpeed;
      element.rotation.y += controls.rotationSpeed;
      element.rotation.z += controls.rotationSpeed;
    }
  })
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

/* ------------------------------ Scene ------------------------------ */

/**
 * Scene initialized. 
 */

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, screenWidth / screenHeight, .1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color("rgb(200, 200, 200)"));
renderer.setSize(screenWidth, screenHeight);
renderer.shadowMap.enabled = true;

var axis = new THREE.AxesHelper(20);

/**
 * Plane element initialized. 
 */

var planeGeometry = new THREE.PlaneGeometry(60, 30, 1, 1);
var planeMaterial = new THREE.MeshLambertMaterial(new THREE.Color("rgb(255, 255, 255)"));
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;

plane.rotation.x = -.5 * Math.PI;
plane.position.x = 12;
plane.position.y = 0;
plane.position.z = 0;

/**
 * Spot light element initialized. 
 */

 var spotLight = new THREE.SpotLight(0xffffff);
 spotLight.position.set(-40, 40, -10);
 spotLight.castShadow = true;

 var ambientLight = new THREE.AmbientLight(new THREE.Color("rgb(50,50,50)"));

/**
 * Adding elements to scene. 
 */

scene.add(plane);
scene.add(axis);
scene.add(spotLight);
scene.add(ambientLight);

/**
 * Camera element initialized. 
 */

camera.position.x = -50;
camera.position.y = 60;
camera.position.z= 50;

camera.lookAt(scene.position);
var stats = initStats();

var controls = new function(){
  this.numberOfObjects = scene.children.length;
  this.rotationSpeed = .02;
  this.maxSize = 3;
  this.addCube = function(){
    var cubeSize = Math.ceil(Math.random() * this.maxSize);
    var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    var cubeColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
    var cubeMaterial = new THREE.MeshLambertMaterial(
      {color: new THREE.Color(cubeColor)}
    );
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    cube.castShadow = true;
    cube.name = "cube-" + scene.children.length;
    cube.position.x = -20 + Math.round(Math.random() * planeGeometry.parameters.width);
    cube.position.y = (cubeSize / 2) + Math.round(Math.random() * 5);
    cube.position.z = -20 + Math.round(Math.random() * planeGeometry.parameters.height);
    scene.add(cube);
    this.numberOfObjects = scene.children.length;
  }
  this.removeCube = function(){
    var allChildren = scene.children;
    var lastObject = allChildren[allChildren.length - 1];
    if (lastObject instanceof THREE.Mesh){
      scene.remove(lastObject);
      this.numberOfObjects = scene.children.length;
    }
  }
}

var gui = new dat.GUI();
gui.add(controls, "rotationSpeed", 0, .5);
gui.add(controls, "addCube");
gui.add(controls, "removeCube");
gui.add(controls, "numberOfObjects").listen();
gui.add(controls, "maxSize", 3, 8);

/**
 * Render.
 */

$("#webgl").append(renderer.domElement);
render();
