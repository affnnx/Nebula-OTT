import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function ThreeScene  () {
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    // Particle system
    const particleCount = 500;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 20; // X position
        positions[i + 1] = (Math.random() - 0.5) * 20; // Y position
        positions[i + 2] = (Math.random() - 0.5) * 20; // Z position
        
        velocities[i] = (Math.random() - 0.5) * 0.05; // X velocity
        velocities[i + 1] = (Math.random() - 0.5) * 0.05; // Y velocity
        velocities[i + 2] = (Math.random() - 0.5) * 0.05; // Z velocity
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    
    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
    const particleMesh = new THREE.Points(particles, material);
    scene.add(particleMesh);
    
    // Animation loop
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth camera movement
    
    function animate() {
        requestAnimationFrame(animate);
    
        // Update controls
        controls.update();
    
        const positions = particles.attributes.position.array;
        const velocities = particles.attributes.velocity.array;
        
        for (let i = 0; i < positions.length; i += 3) {
            positions[i] += velocities[i];
            positions[i + 1] += velocities[i + 1];
            positions[i + 2] += velocities[i + 2];
    
            if (positions[i] > 10 || positions[i] < -10) velocities[i] *= -1;
            if (positions[i + 1] > 10 || positions[i + 1] < -10) velocities[i + 1] *= -1;
            if (positions[i + 2] > 10 || positions[i + 2] < -10) velocities[i + 2] *= -1;
        }
        
        particles.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
    }
    
    
    animate();
    
    // Handle resizing
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
}    