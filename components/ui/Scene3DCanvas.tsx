"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment, Torus, Sphere } from "@react-three/drei";
import * as THREE from "three";

function GlassOrb({ mobile }: { mobile: boolean }) {
    const ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!ref.current) return;
        ref.current.rotation.y = THREE.MathUtils.lerp(
            ref.current.rotation.y,
            state.clock.elapsedTime * 0.15,
            0.05
        );
        ref.current.rotation.x = THREE.MathUtils.lerp(
            ref.current.rotation.x,
            Math.sin(state.clock.elapsedTime * 0.1) * 0.15,
            0.05
        );
    });

    return (
        <Float speed={1.0} floatIntensity={0.4} rotationIntensity={0.15}>
            <Sphere ref={ref} args={[1.2, mobile ? 32 : 64, mobile ? 32 : 64]}>
                {mobile ? (
                    // Simple cheap material on mobile
                    <meshStandardMaterial
                        color="#9C7FFF"
                        metalness={0.8}
                        roughness={0.1}
                        transparent
                        opacity={0.85}
                    />
                ) : (
                    <MeshTransmissionMaterial
                        backside
                        samples={4}
                        thickness={0.6}
                        chromaticAberration={0.05}
                        anisotropy={0.5}
                        distortion={0.2}
                        distortionScale={0.2}
                        temporalDistortion={0.04}
                        iridescence={1}
                        iridescenceIOR={1.3}
                        iridescenceThicknessRange={[100, 800]}
                        roughness={0}
                        metalness={0.1}
                    />
                )}
            </Sphere>
        </Float>
    );
}

function Rings() {
    const r1 = useRef<THREE.Mesh>(null);
    const r2 = useRef<THREE.Mesh>(null);
    const r3 = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (r1.current) {
            r1.current.rotation.x = THREE.MathUtils.lerp(r1.current.rotation.x, t * 0.2, 0.04);
            r1.current.rotation.z = THREE.MathUtils.lerp(r1.current.rotation.z, t * 0.1, 0.04);
        }
        if (r2.current) {
            r2.current.rotation.y = THREE.MathUtils.lerp(r2.current.rotation.y, t * 0.08, 0.04);
            r2.current.rotation.x = THREE.MathUtils.lerp(r2.current.rotation.x, t * 0.05, 0.04);
        }
        if (r3.current) {
            r3.current.rotation.z = THREE.MathUtils.lerp(r3.current.rotation.z, -t * 0.12, 0.04);
        }
    });

    return (
        <group>
            {/* Electric blue ring */}
            <Torus ref={r1} args={[2.2, 0.02, 8, 64]}>
                <meshBasicMaterial color="#4FC3F7" transparent opacity={0.25} />
            </Torus>
            {/* Soft rose ring */}
            <Torus ref={r2} args={[2.8, 0.015, 8, 64]} rotation={[Math.PI / 3, 0, 0]}>
                <meshBasicMaterial color="#F48FB1" transparent opacity={0.18} />
            </Torus>
            {/* Violet ring */}
            <Torus ref={r3} args={[3.2, 0.01, 8, 64]} rotation={[0, Math.PI / 4, Math.PI / 6]}>
                <meshBasicMaterial color="#9C7FFF" transparent opacity={0.14} />
            </Torus>
        </group>
    );
}

export default function Scene3DCanvas() {
    const [mobile, setMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
            style={{ background: "transparent", width: "100%", height: "100%" }}
            dpr={mobile ? [1, 1] : [1, 1.5]}
        >
            <ambientLight intensity={0.4} color="#ffffff" />
            <pointLight position={[4, 3, 3]} intensity={3} color="#4FC3F7" />
            <pointLight position={[-4, -2, 2]} intensity={2.5} color="#FF8A65" />
            {!mobile && <pointLight position={[0, -4, 3]} intensity={2} color="#CE93D8" />}
            {!mobile && <pointLight position={[-2, 4, -1]} intensity={1.5} color="#F48FB1" />}
            {!mobile && <Environment preset="night" />}
            <GlassOrb mobile={mobile} />
            <Rings />
        </Canvas>
    );
}
