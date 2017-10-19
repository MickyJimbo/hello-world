// Requirements
var THREE = require('three');
require('./three-orbit-controls.js')(THREE);
require('./myShader.js')(THREE);

// Scene
var scene = new THREE.Scene();

// Renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var worldUpVector = new THREE.Vector3(0, 0, 1);

// Camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 10000);
camera.up = worldUpVector;
camera.position.set(4, 4, 4);

// Camera controls
var controls = new THREE.OrbitControls(camera, renderer.domElement)

// Grid
var grid = new THREE.GridHelper(25, 25);
grid.rotation.x = 90 * (Math.PI/180);
scene.add(grid);

//Materials
//var material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 });

var material = new THREE.ShaderMaterial({
  uniforms: THREE.MyShader.uniforms,
  vertexShader: THREE.MyShader.vertexShader,
  fragmentShader: THREE.MyShader.fragmentShader
});

// Geometry
var geometry = new THREE.SphereBufferGeometry(1, 20, 20);
var sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0, 0, 2);
scene.add(sphere);

var displacement = new Float32Array(geometry.attributes.position.count)

geometry.addAttribute('displacement', new THREE.BufferAttribute(displacement, 1));

camera.lookAt(sphere.position);

// Lighting
var pointLight = new THREE.PointLight(0xffffff, 1, 100, 2);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

var ambLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambLight);

// Screen resize
onWindowResize = () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);

//Render loop
var counter = 0
render = ()=> {
  requestAnimationFrame(render);

  // Scene changes
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;

  counter++;
  if(counter % 10 == 0){
    for(var i = 0; i < displacement.length; i++){
      displacement[i] = Math.random() * 0.2;
    }
  }
  sphere.geometry.attributes.displacement.needsUpdate = true;

  renderer.render(scene, camera);
}

render();
