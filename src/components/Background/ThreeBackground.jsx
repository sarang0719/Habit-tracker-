import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = () => {
    const count = 200;
    const mesh = useRef();

    // Create random positions for particles
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 20;
            const y = (Math.random() - 0.5) * 20;
            const z = (Math.random() - 0.5) * 10 - 5;
            temp.push({ x, y, z, speed: Math.random() * 0.02 });
        }
        return temp;
    }, []);

    useFrame((state) => {
        if (!mesh.current) return;
        // Slight rotation of the entire group
        mesh.current.rotation.y += 0.001;
        mesh.current.rotation.x += 0.0005;
    });

    return (
        <group ref={mesh}>
            {particles.map((pos, i) => (
                <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <mesh position={[pos.x, pos.y, pos.z]}>
                        <sphereGeometry args={[0.05, 16, 16]} />
                        <meshStandardMaterial
                            color={i % 2 === 0 ? "#d946ef" : "#8b5cf6"}
                            emissive={i % 2 === 0 ? "#d946ef" : "#8b5cf6"}
                            emissiveIntensity={2}
                            transparent
                            opacity={0.6}
                        />
                    </mesh>
                </Float>
            ))}
        </group>
    );
};

const ThreeBackground = () => {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: 'none',
            background: 'radial-gradient(circle at 50% 50%, #1a1a2e 0%, #000000 100%)'
        }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                {/* Objects */}
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <ParticleField />

                {/* Fog for depth */}
                <fog attach="fog" args={['#000', 5, 20]} />
            </Canvas>
        </div>
    );
};

export default ThreeBackground;
