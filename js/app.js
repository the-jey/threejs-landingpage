// Variables for setup
let container;
let camera;
let renderer;
let scene;
let house;
let animated = false;
let idAnimationFrame;

function init() {
  container = document.querySelector(".scene");

  // Create scene
  scene = new THREE.Scene();

  // Camera set up
  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 1000;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 2, 24);

  const ambient = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(10, -10, 50);
  scene.add(light);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  // Load model
  let loader = new THREE.GLTFLoader();
  loader.load("../house/scene.gltf", function (gltf) {
    scene.add(gltf.scene);
    house = gltf.scene.children[0];

    renderer.render(scene, camera);
  });
}

function startAnimate() {
  idAnimationFrame = requestAnimationFrame(startAnimate);
  house.rotation.z += 0.005;
  renderer.render(scene, camera);
  animated = true;
}

function stopAnimate() {
  cancelAnimationFrame(idAnimationFrame);
  renderer.render(scene, camera);
  animated = false;
}

init();

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    animated === true ? stopAnimate() : startAnimate();
  }
});
