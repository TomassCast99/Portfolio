import "./index.css";
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);
//Torus
const geometry = new THREE.TorusGeometry(10, 3, 5, 6);
const material = new THREE.MeshStandardMaterial({
  color: 0x023047,
});
const torus = new THREE.Mesh(geometry, material);

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  renderer.render(scene, camera);
}
scene.add(torus);
//Luz
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(3, 3, 3);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);
//Icosahedro
function addIco() {
  const geometry = new THREE.IcosahedronGeometry(1, 0);
  const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
  const icosahedro = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  icosahedro.position.set(x, y, z);
  scene.add(icosahedro);
}

Array(200).fill().forEach(addIco);

const mountText = new THREE.TextureLoader().load("montaña.jpg");
scene.background = mountText;

// Yo
const tomiAvatar = new THREE.TextureLoader().load("tomi.jpg");
const avatar = new THREE.Mesh(
  new THREE.BoxGeometry(5, 6, 5),
  new THREE.MeshBasicMaterial({ map: tomiAvatar })
);
scene.add(avatar);

// Camera

function moveCamera() {
  const viewTop = document.body.getBoundingClientRect().top;
  avatar.rotation.y += 0.01;
  avatar.rotation.z += 0.01;

  camera.position.z = viewTop * -0.01;
  camera.position.x = viewTop * -0.0002;
  camera.position.y = viewTop * -0.0002;
}
document.body.onscroll = moveCamera;

animate();
