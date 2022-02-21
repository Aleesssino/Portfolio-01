import './style.css'

import * as THREE from 'three';


import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Sphere } from 'three';
//import { MirroredRepeatWrapping, TextureLoader } from 'three';
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#bg'),
});

// draw stuff 
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render( scene, camera );


// megaring/circle
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshBasicMaterial({color: 0xFF6347 , wireframe: true,
metalness: 0.95,
roughness: 0.18,
    
});
const torus = new THREE.Mesh( geometry, material );

scene.add(torus)

// light(bulb)
const pointlight = new THREE.PointLight(0xffffff)
pointlight.position.set(5, 5, 5)

const ambientlight = new THREE.AmbientLight(0xffffff)

scene.add(pointlight, ambientlight);

//helpers
//const lightHelper = new THREE.PointLightHelper(pointlight)
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper);



// first => import Orbitcontrols 
// then make "constrols"... then => we'll add update into aniloop
//const constrols = new OrbitControls(camera, renderer.domElement);


function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh( geometry, material );

    const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;


//avatar
// low quality -> fix it later!
const alesTexture = new THREE.TextureLoader()
.load('ales.png');

const ales = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial( { map: alesTexture })
);

scene.add(ales);



// moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial( {
        map: moonTexture,
        normalMap: normalTexture,
    } )
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);



ales.position.z = -5;
ales.position.x = 2;

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    ales.rotation.y += 0.01;
    ales.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();


// renderer.render( scene, camera );
// animation loop..
function animate() {
    requestAnimationFrame( animate );

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    moon.rotation.x += 0.005;

    //constrols.update();

    renderer.render( scene, camera );
}

animate();
