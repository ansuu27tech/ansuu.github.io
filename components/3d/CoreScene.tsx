"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Float, Icosahedron, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// ── GLSL Holographic Glass Shader ──────────────────────────────────────────
const HoloGlassMaterial = shaderMaterial(
  { uTime: 0, uOpacity: 0.75, uColor: new THREE.Color("#98ff98"), uExpanded: 0 },
  // vertex shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  `
    uniform float uTime;
    uniform float uOpacity;
    uniform vec3 uColor;
    uniform float uExpanded;
    varying vec2 vUv;
    varying vec3 vNormal;

    float scanline(vec2 uv, float speed, float density) {
      return sin((uv.y + uTime * speed) * density) * 0.5 + 0.5;
    }

    void main() {
      // Holographic scanlines
      float scan = scanline(vUv, 0.08, 60.0) * 0.15;
      float scan2 = scanline(vUv, -0.03, 180.0) * 0.06;

      // Edge Fresnel glow
      float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.2);

      // Grid pattern
      float grid = 0.0;
      float gx = abs(fract(vUv.x * 10.0) - 0.5) < 0.02 ? 1.0 : 0.0;
      float gy = abs(fract(vUv.y * 10.0) - 0.5) < 0.02 ? 1.0 : 0.0;
      grid = max(gx, gy) * 0.08;

      // Corner accent dots
      float corner = 0.0;
      vec2 c1 = abs(vUv - vec2(0.0, 0.0)); corner += step(length(c1), 0.04) * 0.6;
      vec2 c2 = abs(vUv - vec2(1.0, 0.0)); corner += step(length(c2), 0.04) * 0.6;
      vec2 c3 = abs(vUv - vec2(0.0, 1.0)); corner += step(length(c3), 0.04) * 0.6;
      vec2 c4 = abs(vUv - vec2(1.0, 1.0)); corner += step(length(c4), 0.04) * 0.6;

      vec3 col = uColor * (0.18 + scan + scan2 + grid + corner + fresnel * 0.5);
      float alpha = (0.08 + fresnel * 0.4 + scan * 0.15 + grid * 0.5 + corner) * uOpacity;
      alpha *= (1.0 - uExpanded * 0.85);

      gl_FragColor = vec4(col, alpha);
    }
  `
);
extend({ HoloGlassMaterial });

// Removed global declaration, handled via ts-expect-error below
// ── Face definitions ────────────────────────────────────────────────────────
const FACES = [
  { pos: [0, 0, 1] as [number,number,number], rot: [0, 0, 0] as [number,number,number] },
  { pos: [0, 0, -1] as [number,number,number], rot: [0, Math.PI, 0] as [number,number,number] },
  { pos: [0, 1, 0] as [number,number,number], rot: [-Math.PI/2, 0, 0] as [number,number,number] },
  { pos: [0, -1, 0] as [number,number,number], rot: [Math.PI/2, 0, 0] as [number,number,number] },
  { pos: [1, 0, 0] as [number,number,number], rot: [0, Math.PI/2, 0] as [number,number,number] },
  { pos: [-1, 0, 0] as [number,number,number], rot: [0, -Math.PI/2, 0] as [number,number,number] },
];

// ── Particle Cloud ──────────────────────────────────────────────────────────
function ParticleField({ isExpanded }: { isExpanded: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#98ff98"),
      new THREE.Color("#22d3ee"),
      new THREE.Color("#a78bfa"),
      new THREE.Color("#6ee7b7"),
    ];
    for (let i = 0; i < count; i++) {
      const r = 2.2 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i*3+2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i*3] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.04;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.025) * 0.12;
    const s = isExpanded ? 3 : 1;
    ref.current.scale.lerp(new THREE.Vector3(s, s, s), 0.04);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} vertexColors transparent opacity={0.65}
        sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

// ── Orbiting Rings ──────────────────────────────────────────────────────────
function OrbitalRings({ isHovered, isExpanded }: { isHovered: boolean; isExpanded: boolean }) {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    const s = isExpanded ? 0.2 : isHovered ? 2.2 : 0.8;
    if (r1.current) { r1.current.rotation.x += d*s; r1.current.rotation.z += d*s*0.4; }
    if (r2.current) { r2.current.rotation.y -= d*s*0.7; r2.current.rotation.x += d*s*0.3; }
    if (r3.current) { r3.current.rotation.z += d*s*0.5; r3.current.rotation.y += d*s*0.25; }
  });
  const ts = isExpanded ? 2.8 : 1;
  return (
    <group>
      <mesh ref={r1} scale={ts}><torusGeometry args={[1.65,0.010,16,120]}/><meshBasicMaterial color="#98ff98" transparent opacity={isExpanded?0.1:0.45} /></mesh>
      <mesh ref={r2} scale={ts}><torusGeometry args={[1.90,0.007,16,120]}/><meshBasicMaterial color="#22d3ee" transparent opacity={isExpanded?0.08:0.3} /></mesh>
      <mesh ref={r3} scale={ts}><torusGeometry args={[2.15,0.004,16,120]}/><meshBasicMaterial color="#a78bfa" transparent opacity={isExpanded?0.06:0.18} /></mesh>
    </group>
  );
}

// ── Core Cube + Shader Panels ───────────────────────────────────────────────
function HoloCore({ isHovered, isExpanded }: { isHovered: boolean; isExpanded: boolean }) {
  const group = useRef<THREE.Group>(null);
  const icoRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const fillRef = useRef<THREE.PointLight>(null);
  const matRefs = useRef<any[]>([]);

  useFrame((state, d) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const ys = isExpanded ? 0.12 : isHovered ? 1.6 : 0.45;
    const xs = isExpanded ? 0.06 : isHovered ? 0.8 : 0.22;
    group.current.rotation.y += d * ys;
    group.current.rotation.x += d * xs;

    // Update shader uniforms
    matRefs.current.forEach((m) => {
      if (m) {
        m.uTime = t;
        m.uOpacity = isExpanded ? 0.05 : isHovered ? 1.1 : 0.75;
        m.uExpanded = THREE.MathUtils.lerp(m.uExpanded ?? 0, isExpanded ? 1 : 0, 0.06);
      }
    });

    // Core breathing
    if (icoRef.current) {
      const breathe = 1 + Math.sin(t * 1.8) * 0.07;
      const ts = isExpanded ? breathe * 2.0 : isHovered ? breathe * 1.15 : breathe;
      icoRef.current.scale.setScalar(THREE.MathUtils.lerp(icoRef.current.scale.x, ts, 0.05));
    }

    // Dynamic glow — capped to avoid white blow-out
    if (glowRef.current) {
      const pulse = Math.sin(t * 2.5) * 0.5 + 0.5;
      const ti = isExpanded ? 1.2 + pulse * 0.6 : isHovered ? 0.9 + pulse * 0.3 : 0.3 + pulse * 0.15;
      glowRef.current.intensity = THREE.MathUtils.lerp(glowRef.current.intensity, ti, 0.07);
    }
    if (fillRef.current) {
      fillRef.current.intensity = THREE.MathUtils.lerp(fillRef.current.intensity, isHovered ? 0.5 : 0.15, 0.07);
    }
  });

  return (
    <group ref={group}>
      {/* Lights */}
      <pointLight ref={glowRef} color="#98ff98" intensity={1} distance={14} />
      <pointLight ref={fillRef} position={[2, 1.5, 2]} color="#22d3ee" intensity={0.4} distance={10} />
      <pointLight position={[-2,-1,-2]} color="#a78bfa" intensity={0.3} distance={8} />

      {/* Holographic glass panels */}
      {FACES.map((face, i) => (
        <mesh key={i} position={face.pos} rotation={face.rot}>
          <planeGeometry args={[2, 2, 1, 1]} />
          {/* @ts-expect-error: R3F dynamic material */}
          <holoGlassMaterial
            ref={(el: any) => (matRefs.current[i] = el)}
            uTime={0} uOpacity={0.75}
            uColor={new THREE.Color("#98ff98")}
            uExpanded={0}
            transparent depthWrite={false}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

// ── Main Export ─────────────────────────────────────────────────────────────
export default function CoreScene({ isHovered, isExpanded }: { isHovered: boolean; isExpanded: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 42 }}
      style={{ pointerEvents: "none", background: "transparent" }}
      gl={{ alpha: true, antialias: true, toneMapping: THREE.NoToneMapping }}
      dpr={[1, 2]}
    >
      {/* No Environment preset — hand-crafted colored lights only */}
      <ambientLight intensity={0.04} color="#050f05" />
      <pointLight position={[4, 4, 4]} intensity={0.35} color="#22d3ee" distance={18} />
      <pointLight position={[-4, -4, -4]} intensity={0.2} color="#a78bfa" distance={14} />

      <ParticleField isExpanded={isExpanded} />
      <OrbitalRings isHovered={isHovered} isExpanded={isExpanded} />

      <Float speed={isExpanded ? 0.2 : 1.8} rotationIntensity={0.25}
        floatIntensity={isExpanded ? 0.15 : 1.2} floatingRange={[-0.12, 0.12]}>
        <HoloCore isHovered={isHovered} isExpanded={isExpanded} />
      </Float>
    </Canvas>
  );
}
