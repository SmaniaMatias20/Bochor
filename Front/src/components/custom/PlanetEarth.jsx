// PlanetEarth.js
import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const PlanetEarth = () => {
    const earthRef = useRef();

    // Animación de rotación automática
    useEffect(() => {
        const animate = () => {
            if (earthRef.current) {
                earthRef.current.rotation.x += 0.005; // Rota el planeta sobre su eje Y
            }
            requestAnimationFrame(animate); // Llama la función recursivamente
        };
        animate(); // Inicia la animación
    }, []);

    return (
        <Canvas
            style={{ width: '100%', height: '100vh' }}
            camera={{ position: [0, 0, 3], fov: 75 }}
        >
            {/* Luces */}
            <ambientLight intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            {/* Tierra */}
            <mesh ref={earthRef}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial
                    map={new THREE.TextureLoader().load('/textures/textures/download/8k_earth_daymap.jpg')}
                />
            </mesh>

            {/* Controles de órbita con zoom deshabilitado */}
            <OrbitControls enableZoom={false} />
        </Canvas>
    );
};

export default PlanetEarth;
