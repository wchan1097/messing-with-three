var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

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
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;

/**
 * Cube element initialized. 
 */

var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.castShadow = true;

cube.position.x = -4;
cube.position.y = 3;
cube.position.z = 0;

/**
 * Sphere element initialized. 
 */

var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true;

sphere.position.x = 20;
sphere.position.y = 4;
sphere.position.z = 2;

/**
 * Camera element initialized. 
 */

 var spotLight = new THREE.SpotLight(0xffffff);
 spotLight.position.set(-40, 60, -10);
 spotLight.castShadow = true;

/**
 * Adding elements to scene. 
 */

scene.add(plane);
scene.add(sphere);
scene.add(cube);
scene.add(axis);
scene.add(spotLight);

/**
 * Camera element initialized. 
 */

camera.position.x = -30;
camera.position.y = 40;
camera.position.z= 30;

camera.lookAt(scene.position);

/**
 * Render.
 */

$("#webgl").append(renderer.domElement);
renderer.render(scene, camera);
