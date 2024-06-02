import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.149.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.149.0/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b2447);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 600);
const container = document.getElementById("three-container");
container.appendChild(renderer.domElement);

camera.aspect = 800 / 600;
camera.updateProjectionMatrix();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;

camera.position.set(0, 0, 15);
controls.update();

const light = new THREE.AmbientLight("white", 2); // Soft white light
scene.add(light);

const geometry = new THREE.SphereGeometry(5, 64, 32, 0, 6.3, 0, 6.3);
const texture = new THREE.TextureLoader().load(
  "/demo/img/cropped_image (3).png"
);
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(6, 6);
const material = new THREE.MeshLambertMaterial({ map: texture });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener("resize", function () {
  renderer.setSize(800, 600);
  camera.aspect = 800 / 600;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
});

animate();

// listen for mouseenter and mouseleave events on the canvas
const canvas = renderer.domElement;
canvas.addEventListener("mouseenter", () => {
  controls.enableZoom = true;
});
canvas.addEventListener("mouseleave", () => {
  controls.enableZoom = false;
});
