// Scene
var scene = new THREE.Scene();

// Camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 10000);
camera.position.z = 5;

// Geometry
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Lighting
var pointLight = new THREE.PointLight(0xffffff, 1, 100, 2);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

var ambLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambLight);

// Renderer
var renderer  = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function render() {
  requestAnimationFrame(render);

  // Scene changes
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

render();
