"use client";

import React, {
  useRef,
  useState,
  useCallback,
  Suspense,
  useMemo,
} from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  RoundedBox,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

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

function createP89ScreenTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 720;
  canvas.height = 1560;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  const background = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  background.addColorStop(0, "#15100f");
  background.addColorStop(0.46, "#050507");
  background.addColorStop(1, "#170805");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(238, 118, 44, 0.92)";
  ctx.lineWidth = 8;
  ctx.shadowColor = "rgba(255, 122, 45, 0.75)";
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.ellipse(500, 940, 300, 620, 0.62, 3.65, 5.82);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 178, 126, 0.35)";
  ctx.lineWidth = 5;
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.ellipse(250, 520, 220, 520, -0.72, 5.35, 1.1);
  ctx.stroke();

  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.font = "500 42px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Monday, September 9", canvas.width / 2, 430);
  ctx.font = "700 154px system-ui, sans-serif";
  ctx.fillText("9:41", canvas.width / 2, 600);

  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.font = "600 26px system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("09:41", 64, 58);
  ctx.textAlign = "right";
  ctx.fillText("5G", canvas.width - 112, 58);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/* ─── Phone 3D Model ─── */
function PhoneModel({
  productImage,
  accentColor,
  frameColor,
  productName,
}: {
  productImage: string;
  accentColor: string;
  frameColor: string;
  productName: string;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const isP89 = productName.toLowerCase().includes("p89");
  const bodyColor = isP89 ? "#e48a3a" : accentColor;
  const edgeColor = isP89 ? "#b85a20" : frameColor;
  const darkCopper = isP89 ? "#9b4516" : frameColor;
  const productTexture = useLoader(THREE.TextureLoader, productImage);
  const p89ScreenTexture = useMemo(createP89ScreenTexture, []);
  productTexture.colorSpace = THREE.SRGBColorSpace;
  const screenTexture = isP89 ? p89ScreenTexture : productTexture;

  // Phone dimensions (proportional to a real phone)
  const phoneWidth = 1.6;
  const phoneHeight = 3.2;
  const phoneDepth = isP89 ? 0.24 : 0.18;
  const borderRadius = isP89 ? 0.16 : 0.12;
  const screenInset = isP89 ? 0.08 : 0.06;
  const backZ = -(phoneDepth / 2 + 0.004);
  const frontZ = phoneDepth / 2 + 0.004;
  const cameraIslandDepth = isP89 ? 0.045 : 0.05;
  const cameraLensDepth = isP89 ? 0.028 : 0.04;

  const lensPositions: Array<[number, number]> = isP89
    ? [
        [-0.43, 0.26],
        [-0.43, -0.12],
        [-0.03, 0.08],
      ]
    : [
        [0.16, 0.16],
        [0.16, -0.16],
        [-0.14, 0],
      ];
  const sideButtons: Array<[number, number, number]> = isP89
    ? [
        [phoneWidth / 2 + 0.01, 0.52, 0.11],
        [phoneWidth / 2 + 0.01, 0.2, 0.22],
        [phoneWidth / 2 + 0.01, -0.72, 0.34],
        [-(phoneWidth / 2 + 0.01), 0.42, 0.14],
        [-(phoneWidth / 2 + 0.01), 0.1, 0.22],
        [-(phoneWidth / 2 + 0.01), -0.24, 0.22],
      ]
    : [
        [phoneWidth / 2 + 0.005, 0.5, 0.06],
        [phoneWidth / 2 + 0.005, 0.2, 0.12],
      ];

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Phone Body (Back & Sides) */}
      <RoundedBox
        args={[phoneWidth, phoneHeight, phoneDepth]}
        radius={borderRadius}
        smoothness={8}
      >
        <meshPhysicalMaterial
          color={bodyColor}
          metalness={isP89 ? 0.62 : 0.4}
          roughness={isP89 ? 0.24 : 0.28}
          clearcoat={isP89 ? 1 : 0.8}
          clearcoatRoughness={isP89 ? 0.08 : 0.12}
          reflectivity={isP89 ? 0.92 : 0.6}
          envMapIntensity={isP89 ? 1.9 : 1.2}
        />
      </RoundedBox>

      {/* Phone Frame (Edge) */}
      <RoundedBox
        args={[phoneWidth + 0.008, phoneHeight + 0.008, phoneDepth + 0.006]}
        radius={borderRadius + 0.004}
        smoothness={8}
      >
        <meshPhysicalMaterial
          color={edgeColor}
          metalness={0.9}
          roughness={isP89 ? 0.1 : 0.15}
          clearcoat={1}
          clearcoatRoughness={0.05}
          transparent
          opacity={isP89 ? 0.32 : 0.45}
        />
      </RoundedBox>

      {isP89 && (
        <>
          {/* Brushed copper grain from the reference photos. */}
          {Array.from({ length: 22 }).map((_, index) => (
            <mesh
              key={`p89-grain-${index}`}
              position={[-0.68 + index * 0.064, -0.2, backZ - 0.002]}
            >
              <planeGeometry args={[0.006, 2.15]} />
              <meshBasicMaterial
                color={index % 2 === 0 ? "#ffbd76" : "#a94c18"}
                transparent
                opacity={index % 2 === 0 ? 0.18 : 0.1}
                side={THREE.DoubleSide}
              />
            </mesh>
          ))}

          <RoundedBox
            args={[1.13, 1.58, 0.006]}
            radius={0.12}
            smoothness={8}
            position={[0, -0.56, backZ - 0.007]}
          >
            <meshPhysicalMaterial
              color="#f19945"
              metalness={0.55}
              roughness={0.28}
              clearcoat={0.65}
              transparent
              opacity={0.72}
            />
          </RoundedBox>
        </>
      )}

      {/* Screen (Front Face - Black Glossy) */}
      <mesh position={[0, 0, frontZ]}>
        <planeGeometry
          args={[phoneWidth - screenInset * 2, phoneHeight - screenInset * 2]}
        />
        <meshBasicMaterial color="#000000" />
      </mesh>

      <mesh position={[0, 0, frontZ + 0.002]}>
        <planeGeometry
          args={[
            phoneWidth - screenInset * 2 - 0.02,
            phoneHeight - screenInset * 2 - 0.02,
          ]}
        />
        {isP89 ? (
          <meshBasicMaterial map={screenTexture} color="#ffffff" />
        ) : (
          <meshStandardMaterial color="#050505" roughness={0.05} metalness={0.9} />
        )}
      </mesh>

      {/* Screen Glass reflection overlay */}
      <mesh position={[0, 0, frontZ + 0.004]}>
        <planeGeometry
          args={[phoneWidth - screenInset * 2, phoneHeight - screenInset * 2]}
        />
        <meshPhysicalMaterial
          transparent
          opacity={0.08}
          color="#ffffff"
          metalness={0}
          roughness={0}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </mesh>

      {isP89 && (
        <RoundedBox
          args={[0.46, 0.12, 0.014]}
          radius={0.055}
          smoothness={10}
          position={[0, 1.35, frontZ + 0.012]}
        >
          <meshPhysicalMaterial color="#050505" roughness={0.12} clearcoat={1} />
        </RoundedBox>
      )}

      {/* Camera Module (Back) - P89 Pro Max Style */}
      <group position={isP89 ? [0, 1.05, backZ - 0.018] : [-0.32, 0.85, -(phoneDepth / 2 + 0.01)]}>
        {/* Camera island/bump */}
        <RoundedBox
          args={isP89 ? [1.34, 0.78, cameraIslandDepth] : [0.65, 0.65, cameraIslandDepth]}
          radius={isP89 ? 0.15 : 0.12}
          smoothness={8}
        >
          <meshPhysicalMaterial
            color={bodyColor}
            metalness={isP89 ? 0.72 : 0.4}
            roughness={isP89 ? 0.18 : 0.2}
            clearcoat={isP89 ? 1 : 0.8}
            clearcoatRoughness={isP89 ? 0.08 : 0.1}
          />
        </RoundedBox>

        {lensPositions.map(([x, y], index) => (
          <group key={`lens-${index}`} position={[x, y, isP89 ? -0.032 : -0.055]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.14, 0.14, cameraLensDepth, 48]} />
              <meshPhysicalMaterial
                color={darkCopper}
                metalness={0.95}
                roughness={0.1}
                clearcoat={1}
              />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, isP89 ? -0.018 : -0.034]}>
              <cylinderGeometry args={[0.105, 0.105, isP89 ? 0.014 : 0.026, 48]} />
              <meshPhysicalMaterial
                color="#08090c"
                metalness={0.3}
                roughness={0.04}
                clearcoat={1}
              />
            </mesh>
            <mesh position={[0.035, 0.035, isP89 ? -0.032 : -0.053]}>
              <sphereGeometry args={[0.026, 16, 16]} />
              <meshBasicMaterial color="#345c9f" transparent opacity={0.65} />
            </mesh>
          </group>
        ))}

        {/* Flash and LiDAR/Sensor */}
        <mesh position={isP89 ? [0.42, 0.25, -0.033] : [-0.16, 0.2, -0.025]}>
          <sphereGeometry args={[isP89 ? 0.055 : 0.03, 20, 20]} />
          <meshBasicMaterial color="#fffff0" />
        </mesh>
        <mesh position={isP89 ? [0.45, -0.2, -0.033] : [-0.16, -0.2, -0.025]}>
          <sphereGeometry args={[isP89 ? 0.052 : 0.03, 20, 20]} />
          <meshBasicMaterial color="#222" />
        </mesh>
        {isP89 && (
          <mesh position={[0.42, 0.02, -0.033]}>
            <sphereGeometry args={[0.018, 14, 14]} />
            <meshBasicMaterial color="#140b07" />
          </mesh>
        )}
      </group>

      {/* Side buttons */}
      {sideButtons.map(([x, y, height], index) => (
        <RoundedBox
          key={`button-${index}`}
          args={isP89 ? [0.035, height, 0.035] : [0.02, height, 0.06]}
          radius={isP89 ? 0.018 : 0.006}
          smoothness={6}
          position={[x, y, 0]}
        >
          <meshPhysicalMaterial
            color={edgeColor}
            metalness={0.85}
            roughness={0.14}
            clearcoat={1}
          />
        </RoundedBox>
      ))}

      {isP89 && (
        <>
          <RoundedBox
            args={[0.28, 0.045, 0.035]}
            radius={0.018}
            smoothness={6}
            position={[0, -(phoneHeight / 2 + 0.01), 0.012]}
          >
            <meshPhysicalMaterial color="#160905" roughness={0.18} clearcoat={0.5} />
          </RoundedBox>
          {[-0.5, -0.42, -0.34, -0.26, 0.26, 0.34, 0.42, 0.5].map((x) => (
            <mesh
              key={`speaker-${x}`}
              rotation={[Math.PI / 2, 0, 0]}
              position={[x, -(phoneHeight / 2 + 0.012), 0.012]}
            >
              <cylinderGeometry args={[0.022, 0.022, 0.018, 18]} />
              <meshBasicMaterial color="#120806" />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
}

/* ─── Animated Wrapper with Auto-rotate ─── */
function AnimatedPhone({
  autoRotate,
  productImage,
  accentColor,
  frameColor,
  productName,
}: {
  autoRotate: boolean;
  productImage: string;
  accentColor: string;
  frameColor: string;
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
      <PhoneModel
        productImage={productImage}
        accentColor={accentColor}
        frameColor={frameColor}
        productName={productName}
      />
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
const PRESET_VIEWS = [
  { label: "ด้านหน้า", icon: "📱", rotation: [0, 0, 0] },
  { label: "ด้านหลัง", icon: "🔙", rotation: [0, Math.PI, 0] },
  { label: "ด้านซ้าย", icon: "◀", rotation: [0, -Math.PI / 2, 0] },
  { label: "ด้านขวา", icon: "▶", rotation: [0, Math.PI / 2, 0] },
  { label: "มุมเฉียง", icon: "↗", rotation: [-0.3, Math.PI / 4, 0] },
] as const;

/* ─── Main Component ─── */
export function Product3DViewer({
  productImage,
  accentColor,
  frameColor,
  productName,
}: Product3DViewerProps) {
  const [autoRotate, setAutoRotate] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const controlsRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const derivedFrameColor =
    frameColor ||
    (() => {
      // Darken the accent color for the frame
      const c = new THREE.Color(accentColor);
      c.multiplyScalar(0.5);
      return "#" + c.getHexString();
    })();

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

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      containerRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden bg-black"
    >
      {/* Header Bar */}
      <div className="relative z-20 flex items-center justify-end bg-black px-5 py-3">
        <div className="flex items-center gap-1.5">
          {/* Auto-rotate toggle */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`flex h-8 items-center gap-1.5 rounded-full border px-3 text-[11px] font-semibold transition-all ${
              autoRotate
                ? "border-transparent text-black shadow-[0_0_28px_rgba(255,255,255,0.16)]"
                : "border-white/10 bg-white/6 text-white/58 hover:bg-white/10 hover:text-white"
            }`}
            style={
              autoRotate
                ? { backgroundColor: accentColor }
                : {}
            }
            title={autoRotate ? "หยุดหมุน" : "หมุนอัตโนมัติ"}
          >
            <svg
              width="14"
              height="14"
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

          {/* Fullscreen toggle */}
          <button
            onClick={toggleFullscreen}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/58 transition-all hover:bg-white/10 hover:text-white"
            title="เต็มจอ"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          </button>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="relative h-[420px] w-full sm:h-[500px] lg:h-[540px]">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
          style={{ backgroundColor: accentColor }}
        />
        <Suspense fallback={<LoadingSpinner accentColor={accentColor} />}>
          <Canvas
            camera={{ position: [0, 0, 5.5], fov: 35 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
          >
            <color attach="background" args={["#000000"]} />

            {/* Lighting */}
            <ambientLight intensity={0.7} />
            <directionalLight
              position={[5, 8, 5]}
              intensity={2.1}
              castShadow
              shadow-mapSize={[1024, 1024]}
            />
            <directionalLight position={[-3, 4, -2]} intensity={0.9} />
            <spotLight
              position={[0, 10, 0]}
              intensity={0.8}
              angle={0.6}
              penumbra={1}
            />

            {/* Hemisphere + fill lights for reflections (no external HDR needed) */}
            <hemisphereLight
              color="#fff1df"
              groundColor="#1d1410"
              intensity={0.62}
            />
            <directionalLight position={[-5, 3, 5]} intensity={0.3} color="#ffeedd" />
            <pointLight position={[0, -3, 3]} intensity={0.28} color="#ffc08a" />
            <pointLight position={[2.8, 0.8, 2.8]} intensity={0.75} color="#ff9d4a" />

            {/* Phone Model */}
            <AnimatedPhone
              autoRotate={autoRotate}
              productImage={productImage}
              accentColor={accentColor}
              frameColor={derivedFrameColor}
              productName={productName}
            />

            {/* Floor shadow */}
            <ContactShadows
              position={[0, -1.8, 0]}
              opacity={0.42}
              scale={8}
              blur={2.5}
              far={4}
              color="#000000"
            />

            {/* OrbitControls */}
            <OrbitControls
              ref={controlsRef}
              enablePan={false}
              enableZoom={true}
              minDistance={3.5}
              maxDistance={8}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI - Math.PI / 6}
              autoRotate={false}
              onStart={() => setAutoRotate(false)}
            />
          </Canvas>
        </Suspense>

        {/* Drag hint overlay */}
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-[11px] font-medium text-white/45 backdrop-blur-md shadow-[0_14px_40px_rgba(0,0,0,0.35)]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 2v4m0 12v4m10-10h-4M6 12H2m15.07-7.07l-2.83 2.83M9.76 14.24l-2.83 2.83m12.14 0l-2.83-2.83M9.76 9.76L6.93 6.93" />
            </svg>
            ลากเพื่อหมุน • เลื่อนเพื่อซูม
          </div>
        </div>
      </div>

      <div className="relative z-20 flex flex-col gap-4 bg-black px-4 pb-8 pt-2 sm:px-6 lg:flex-row lg:items-end lg:justify-center lg:gap-5">
        <div className="rounded-[1.35rem] bg-white/10 p-4 shadow-[0_22px_60px_rgba(0,0,0,0.35)] sm:min-w-64 sm:p-5">
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
                className={`h-6 w-6 rounded-full border transition-transform hover:scale-110 ${
                  index === 0
                    ? "border-[#1683ff] ring-2 ring-[#1683ff]/70 ring-offset-2 ring-offset-[#1d1d1f]"
                    : "border-white/25"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <p className="mt-4 text-sm font-semibold text-white sm:text-base">
            Cobalt Violet
          </p>
        </div>

        {PRESET_VIEWS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => handlePresetView(preset.rotation)}
            className="flex h-14 min-w-32 items-center justify-between gap-4 rounded-full bg-white/10 px-5 text-sm font-semibold text-white shadow-[0_18px_48px_rgba(0,0,0,0.34)] transition-all hover:bg-white/15 active:scale-95 sm:min-w-36 sm:text-base"
          >
            <span>{preset.label}</span>
            <span className="text-2xl font-light leading-none text-white/86">+</span>
          </button>
        ))}
      </div>
    </div>
  );
}
