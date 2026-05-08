"use client";

import React, {
  useRef,
  useState,
  useCallback,
  Suspense,
  useMemo,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  ContactShadows,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

type ReferenceModelKey = "P89" | "P63" | "P65C" | "P65P" | "P68";

function resolveReferenceKey(productName: string): ReferenceModelKey {
  const lowerName = productName.toLowerCase();

  if (lowerName.includes("p63")) return "P63";
  if (lowerName.includes("note") || lowerName.includes("p65c")) return "P65C";
  if (lowerName.includes("enjoy") || lowerName.includes("p65p")) return "P65P";
  if (lowerName.includes("tab") || lowerName.includes("p68")) return "P68";

  return "P89";
}

function resolveModelPath(productName: string) {
  return `/model3D/${resolveReferenceKey(productName)}/P89.glb`;
}

/* ─── Types ─── */
interface Product3DViewerProps {
  /** Path to the product image (e.g., "/images/products/p63-hero-premium.png") */
  productImage: string;
  /** Brand accent color for the phone body */
  accentColor: string;
  /** Secondary/darker color for the phone frame */
  frameColor?: string;
  /** Display name for the product (for accessibility) */
  productName: string;
}

function GLBPhoneModel({ productName }: { productName: string }) {
  const modelPath = useMemo(() => resolveModelPath(productName), [productName]);
  const gltf = useGLTF(modelPath);
  const modelScene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  return (
    <primitive object={modelScene} scale={12.0} position={[0, 0.4, 0]} />
  );
}

[
  "/model3D/P89/P89.glb",
  "/model3D/P63/P89.glb",
  "/model3D/P65C/P89.glb",
  "/model3D/P65P/P89.glb",
  "/model3D/P68/P89.glb",
].forEach((path) => useGLTF.preload(path));

/* ─── Animated Wrapper with Auto-rotate ─── */
function AnimatedPhone({
  autoRotate,
  productName,
}: {
  autoRotate: boolean;
  productName: string;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <GLBPhoneModel productName={productName} />
    </group>
  );
}

/* ─── Loading Fallback ─── */
function LoadingSpinner({ accentColor }: { accentColor: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
      <div
        className="h-10 w-10 animate-spin rounded-full border-3 border-current border-t-transparent"
        style={{ color: accentColor }}
      />
      <p className="text-sm font-medium text-gray-500">
        กำลังโหลดโมเดล 3D...
      </p>
    </div>
  );
}

/* ─── Preset View Buttons ─── */
import { PRESET_VIEWS } from "@/constants";

/* ─── Main Component ─── */
export function Product3DViewer({
  productImage: _productImage,
  accentColor,
  frameColor: _frameColor,
  productName,
}: Product3DViewerProps) {
  const [autoRotate, setAutoRotate] = useState(true);
  const controlsRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePresetView = useCallback(
    (rotation: readonly [number, number, number]) => {
      if (controlsRef.current) {
        setAutoRotate(false);
        const controls = controlsRef.current;
        // Animate to preset position
        const azimuthal = rotation[1];
        const polar = Math.PI / 2 + rotation[0];
        controls.setAzimuthalAngle(azimuthal);
        controls.setPolarAngle(polar);
        controls.update();
      }
    },
    []
  );



  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden bg-black"
    >


      {/* 3D Canvas */}
      <div className="relative h-[400px] w-full sm:h-[500px] lg:h-[600px]">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
          style={{ backgroundColor: accentColor }}
        />
        <Suspense fallback={<LoadingSpinner accentColor={accentColor} />}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 35 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
          >
            <color attach="background" args={["#000000"]} />

            {/* Lighting */}
            <ambientLight intensity={0.7} />
            <directionalLight
              position={[5, 8, 5]}
              intensity={1.7}
              castShadow
              shadow-mapSize={[1024, 1024]}
            />
            <directionalLight position={[-3, 4, -2]} intensity={1.6} color="#ffd0a3" />
            <directionalLight position={[3, 2.5, -5]} intensity={1.15} color="#ffb66d" />
            <spotLight
              position={[0, 8, -4]}
              intensity={1.3}
              angle={0.6}
              penumbra={1}
            />

            {/* Hemisphere + fill lights for reflections (no external HDR needed) */}
            <hemisphereLight
              color="#fff1df"
              groundColor="#1d1410"
              intensity={0.74}
            />
            <directionalLight position={[-5, 3, 5]} intensity={0.3} color="#ffeedd" />
            <pointLight position={[0, -3, 3]} intensity={0.24} color="#ffc08a" />
            <pointLight position={[2.8, 0.8, 2.8]} intensity={0.55} color="#ff9d4a" />
            <pointLight position={[-2.4, 1.2, -3.2]} intensity={1.6} color="#ff9d4a" />

            {/* Phone Model */}
            <AnimatedPhone
              autoRotate={autoRotate}
              productName={productName}
            />

            {/* Floor shadow */}
            <ContactShadows
              position={[0, -2.2, 0]}
              opacity={0.42}
              scale={15}
              blur={2.5}
              far={4}
              color="#000000"
            />

            {/* OrbitControls */}
            <OrbitControls
              ref={controlsRef}
              enablePan={false}
              enableZoom={false}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI - Math.PI / 6}
              autoRotate={false}
              onStart={() => setAutoRotate(false)}
            />
          </Canvas>
        </Suspense>

        {/* Auto-rotate button moved here */}
        <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`flex h-10 items-center gap-2 rounded-full border px-5 text-[12px] font-bold transition-all backdrop-blur-md shadow-[0_14px_40px_rgba(0,0,0,0.35)] ${
              autoRotate
                ? "border-transparent text-black"
                : "border-white/20 bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
            }`}
            style={
              autoRotate
                ? { backgroundColor: accentColor }
                : {}
            }
            title={autoRotate ? "หยุดหมุน" : "หมุนอัตโนมัติ"}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={autoRotate ? "animate-spin" : ""}
              style={autoRotate ? { animationDuration: "3s" } : {}}
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            {autoRotate ? "หมุนอยู่" : "หมุนอัตโนมัติ"}
          </button>
        </div>
      </div>

      <div className="relative z-20 flex flex-wrap items-stretch justify-center gap-4 bg-black px-4 pb-10 pt-2 sm:gap-5 sm:px-8">
        {/* Color Selector Card */}
        <div className="flex flex-col justify-center rounded-[1.35rem] bg-white/10 p-4 shadow-[0_22px_60px_rgba(0,0,0,0.35)] sm:p-5">
          <div className="flex items-center gap-3">
            {[
              "#424260",
              "#b8d7ec",
              "#3b3b3d",
              "#f2f2f2",
              "#b4b4b8",
              "#ead8cd",
            ].map((color, index) => (
              <button
                key={color}
                type="button"
                aria-label={`เลือกสีที่ ${index + 1}`}
                className={`h-5 w-5 rounded-full border transition-transform hover:scale-110 sm:h-6 sm:w-6 ${
                  index === 0
                    ? "border-[#1683ff] ring-2 ring-[#1683ff]/70 ring-offset-2 ring-offset-[#1d1d1f]"
                    : "border-white/25"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <p className="mt-3 text-[10px] font-semibold text-white sm:mt-4 sm:text-sm">
            Cobalt Violet
          </p>
        </div>

        {/* Preset Buttons Grid (2 Rows) */}
        <div className="grid grid-flow-col grid-rows-2 gap-2 sm:gap-3">
          {PRESET_VIEWS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => handlePresetView(preset.rotation)}
              className="flex h-10 min-w-[100px] items-center justify-between gap-3 rounded-full bg-white/10 px-4 text-[10px] font-semibold text-white shadow-[0_18px_48px_rgba(0,0,0,0.34)] transition-all hover:bg-white/15 active:scale-95 sm:h-[52px] sm:min-w-[140px] sm:px-5 sm:text-sm"
            >
              <span>{preset.label}</span>
              <span className="text-base font-light leading-none text-white/86 sm:text-xl">+</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
