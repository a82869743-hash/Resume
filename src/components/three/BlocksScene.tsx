import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider, BallCollider, type RapierRigidBody } from "@react-three/rapier";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import * as THREE from "three";

type Block = { label: string; kind: "tool" | "report" | "lang" };

/** Text-faced material, drawn on a 2D canvas (no font download needed). */
const useLabelMaterial = (label: string, kind: Block["kind"], w: number, h: number) =>
  useMemo(() => {
    const scale = 128;
    const c = document.createElement("canvas");
    c.width = w * scale;
    c.height = h * scale;
    const g = c.getContext("2d")!;
    const bg = kind === "tool" ? "#111111" : kind === "lang" ? "#d4d4d4" : "#ffffff";
    const fg = kind === "tool" ? "#ffffff" : "#111111";
    g.fillStyle = bg;
    g.fillRect(0, 0, c.width, c.height);
    g.strokeStyle = kind === "tool" ? "rgba(255,255,255,.35)" : "rgba(0,0,0,.35)";
    g.lineWidth = 6;
    g.strokeRect(10, 10, c.width - 20, c.height - 20);
    let size = c.height * 0.38;
    g.font = `800 ${size}px Archivo, Manrope, sans-serif`;
    while (g.measureText(label).width > c.width * 0.84) {
      size -= 2;
      g.font = `800 ${size}px Archivo, Manrope, sans-serif`;
    }
    g.fillStyle = fg;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText(label, c.width / 2, c.height / 2 + size * 0.04);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    const face = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.55, metalness: 0.05 });
    const side = new THREE.MeshStandardMaterial({ color: bg, roughness: 0.6 });
    // box face order: +x, -x, +y, -y, +z (front), -z
    return [side, side, side, side, face, face];
  }, [label, kind, w, h]);

const BlockBody = ({ b, i }: { b: Block; i: number }) => {
  const w = b.kind === "tool" ? Math.max(1.8, b.label.length * 0.16) : b.kind === "lang" ? 1.7 : 1.25;
  const h = b.kind === "tool" ? 0.7 : 0.56;
  const d = 0.56;
  const mat = useLabelMaterial(b.label, b.kind, w, h);
  const spawn = useMemo(
    () => ({
      x: (((i % 5) / 4) * 2 - 1) * 2.4 + (Math.random() - 0.5) * 0.5,
      rz: (Math.random() - 0.5) * 0.8,
    }),
    [i]
  );
  return (
    <RigidBody
      colliders="cuboid"
      position={[spawn.x, 3.2 + Math.floor(i / 5) * 1.1 + (i % 5) * 0.15, 0]}
      rotation={[0, 0, spawn.rz]}
      restitution={0.25}
      friction={0.8}
      linearDamping={0.3}
      angularDamping={0.4}
      enabledTranslations={[true, true, false]}
      enabledRotations={[false, false, true]}
    >
      <mesh material={mat} castShadow>
        <boxGeometry args={[w, h, d]} />
      </mesh>
    </RigidBody>
  );
};

/** Invisible ball that follows the pointer and shoves the blocks. */
const Pointer = () => {
  const ref = useRef<RapierRigidBody>(null);
  const vec = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ pointer, viewport }) => {
    vec.set((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0);
    ref.current?.setNextKinematicTranslation(vec);
  });
  return (
    <RigidBody type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[0.7]} />
    </RigidBody>
  );
};

const Bounds = () => {
  const { viewport } = useThree();
  const hw = viewport.width / 2;
  const hh = viewport.height / 2;
  return (
    <RigidBody type="fixed" colliders={false}>
      <CuboidCollider args={[hw + 2, 0.5, 2]} position={[0, -hh - 0.5, 0]} />
      <CuboidCollider args={[0.5, hh + 20, 2]} position={[-hw - 0.5, 10, 0]} />
      <CuboidCollider args={[0.5, hh + 20, 2]} position={[hw + 0.5, 10, 0]} />
    </RigidBody>
  );
};

const BlocksScene = ({ blocks, active }: { blocks: Block[]; active: boolean }) => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (active) {
      // don't hold the drop hostage to webfonts; they are almost always ready by now
      const t = window.setTimeout(() => setReady(true), 400);
      document.fonts?.ready.then(() => setReady(true));
      return () => window.clearTimeout(t);
    }
  }, [active, setReady]);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 12], fov: 30 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={1.4} />
      <directionalLight position={[4, 8, 10]} intensity={1.8} />
      {ready ? (
        <Physics gravity={[0, -14, 0]}>
          <Bounds />
          <Pointer />
          {blocks.map((b, i) => (
            <BlockBody key={b.label} b={b} i={i} />
          ))}
        </Physics>
      ) : null}
      <EffectComposer multisampling={0}>
        <N8AO halfRes aoRadius={1.2} intensity={2.2} distanceFalloff={0.6} color="#2a2a2a" />
      </EffectComposer>
    </Canvas>
  );
};

export default BlocksScene;
