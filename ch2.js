var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var step = 0;
var rotationSpeed;
var controls = new function(){
  this.rotationSpeed = .02;
  this.addCube = function(){
    
  }
}

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
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

/* ------------------------------ Scene ------------------------------ */

var gui = new dat.GUI();
gui.add(controls, "rotationSpeed", 0, .5);
gui.add(controls, "addCube");

/**
 * Scene initialized. 
 */

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  45, screenWidth / screenHeight, .1, 1000
);
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
 spotLight.position.set(-40, 60, -10);
 spotLight.castShadow = true;

 var ambientLight = new THREE.AmbientLight(0x0c0c0c);

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

/**
 * Render.
 */

$("#webgl").append(renderer.domElement);
render();
