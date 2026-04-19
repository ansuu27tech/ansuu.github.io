"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

function Crystal({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const outerRef = useRef<THREE.Mesh>(null);
    const targetRotation = useRef<[number, number]>([0, 0]);

    useFrame((state) => {
        if (!meshRef.current || !outerRef.current) return;
        const t = state.clock.elapsedTime;

        targetRotation.current[0] = THREE.MathUtils.lerp(
            targetRotation.current[0],
            mouse.current[1] * 0.5,
            0.05
        );
        targetRotation.current[1] = THREE.MathUtils.lerp(
            targetRotation.current[1],
            mouse.current[0] * 0.5,
            0.05
        );

        meshRef.current.rotation.x = THREE.MathUtils.lerp(
            meshRef.current.rotation.x,
            t * 0.08 + targetRotation.current[0],
            0.03
        );
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
            meshRef.current.rotation.y,
            t * 0.12 + targetRotation.current[1],
            0.03
        );

        outerRef.current.rotation.x = THREE.MathUtils.lerp(
            outerRef.current.rotation.x,
            -t * 0.06,
            0.03
        );
        outerRef.current.rotation.y = THREE.MathUtils.lerp(
            outerRef.current.rotation.y,
            -t * 0.09,
            0.03
        );
    });

    return (
        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
            {/* Crystal body — deep violet base that picks up coloured lights */}
            <Icosahedron ref={meshRef} args={[1.4, 1]}>
                <MeshDistortMaterial
                    color="#9C7FFF"
                    emissive="#1a0a2e"
                    metalness={0.9}
                    roughness={0.05}
                    distort={0.15}
                    speed={1}
                    transparent
                    opacity={0.82}
                />
            </Icosahedron>
            {/* Wireframe shell — electric blue */}
            <Icosahedron ref={outerRef} args={[1.9, 1]}>
                <meshBasicMaterial color="#4FC3F7" wireframe transparent opacity={0.1} />
            </Icosahedron>
            {/* Coloured inner glow lights matching the orb palette */}
            <pointLight color="#4FC3F7" intensity={2} distance={5} />
            <pointLight position={[1, -1, 1]} color="#FF8A65" intensity={1.5} distance={4} />
        </Float>
    );
}

export default function HeroScene() {
    const mouse = useRef<[number, number]>([0, 0]);

    const handleMouseMove = (e: React.MouseEvent) => {
        mouse.current = [
            (e.clientX / window.innerWidth - 0.5) * 2,
            -(e.clientY / window.innerHeight - 0.5) * 2,
        ];
    };

    return (
        <div
            className="absolute inset-0 z-[5]"
            onMouseMove={handleMouseMove}
            style={{ pointerEvents: "none" }}
        >
            <Canvas
                camera={{ position: [0, 0, 5], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
                dpr={[1, 1.5]}
            >
                <ambientLight intensity={0.3} />
                <directionalLight position={[5, 5, 5]} intensity={0.6} color="#ffffff" />
                {/* Multi-colour lights matching the Scene3D orb */}
                <pointLight position={[4, 3, 3]} intensity={2} color="#4FC3F7" />
                <pointLight position={[-4, -2, 2]} intensity={1.5} color="#FF8A65" />
                <pointLight position={[0, -4, 3]} intensity={1.2} color="#CE93D8" />
                <pointLight position={[-2, 4, -1]} intensity={1} color="#F48FB1" />
                <Crystal mouse={mouse} />
            </Canvas>
        </div>
    );
}
