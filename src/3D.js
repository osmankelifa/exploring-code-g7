import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0B2447);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const texture = new THREE.TextureLoader().load("SaveWater.png")
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 6 , 6 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls( camera, renderer.domElement );

camera.position.set( 0, 0, 5 );
controls.update();

//const geometry = new THREE.BoxGeometry(2,2,2);
const geometry = new THREE.SphereGeometry( 5, 64, 32, 0 , 6.3, 0, 6.3); 
//const geometry = new THREE.CircleGeometry( 5, 32 ); 
const material = new THREE.MeshLambertMaterial({ map: texture});

const cube = new THREE.Mesh(geometry, material);

//Light
const light = new THREE.AmbientLight( 'white', 2 ); // soft white light
const pointLight = new THREE.PointLight( "white", 600, 1000 );

pointLight.position.set( 11, 3, 8);

cube.position.x = 0

scene.add(cube, pointLight,light);

camera.position.z = 20;

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix()
}

//const sphereSize = 0.2;
//const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
//scene.add( pointLightHelper);

window.addEventListener('resize', resize)

function animate() {
    requestAnimationFrame(animate);

    //cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    controls.update();


    renderer.render(scene, camera);
}

//gsap.to(camera.position, {z: 5, ease: 'power2.out', duration:0.2, delay:1})

animate();