import { useMemo, useRef, useState } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import type { ToolConfig } from "./toolConfig";

// Simple procedural soft-shadow texture (radial fade).
function useShadowTexture() {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(
      size / 2,
      size / 2,
      size * 0.05,
      size / 2,
      size / 2,
      size / 2,
    );
    grad.addColorStop(0, "rgba(0,0,0,0.55)");
    grad.addColorStop(0.5, "rgba(0,0,0,0.25)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

type Props = {
  tool: ToolConfig;
  progressRef: React.MutableRefObject<number>;
  assembledRef: React.MutableRefObject<boolean>;
};

// Back.out easing helper (matches GSAP back.out)
const backOut = (t: number, overshoot: number) => {
  const s = overshoot;
  const t1 = t - 1;
  return t1 * t1 * ((s + 1) * t1 + s) + 1;
};

// Local progress within this tool's window
function localProgress(p: number, delay: number, span = 0.55) {
  const start = delay;
  const end = Math.min(1, start + span);
  if (p <= start) return 0;
  if (p >= end) return 1;
  return (p - start) / (end - start);
}

export function ToolMesh({ tool, progressRef, assembledRef }: Props) {
  const texture = useTexture(tool.src);
  const shadowTex = useShadowTexture();
  const group = useRef<THREE.Group>(null!);
  const shadow = useRef<THREE.Mesh>(null!);
  const mesh = useRef<THREE.Mesh>(null!);
  const [hover, setHover] = useState(false);
  const hoverScale = useRef(1);
  const hoverShadow = useRef(1);

  // Match aspect using image
  const [w, h] = useMemo(() => {
    const img = texture.image as HTMLImageElement | undefined;
    const a = img && img.width ? img.width / img.height : tool.aspect;
    const long = tool.size;
    return a >= 1 ? [long, long / a] : [long * a, long];
  }, [texture, tool]);

  useFrame((_, dt) => {
    const p = progressRef.current;
    const lp = localProgress(p, tool.delay);
    const eased = backOut(lp, tool.overshoot);
    const x = tool.scatter.x + (tool.target.x - tool.scatter.x) * eased;
    const y = tool.scatter.y + (tool.target.y - tool.scatter.y) * eased;
    const r = tool.scatter.rotation + (tool.target.rotation - tool.scatter.rotation) * eased;

    // Hover only after assembly
    const canHover = assembledRef.current && hover;
    const targetScale = canHover ? 1.03 : 1;
    const targetShadowOpacity = canHover ? 0.28 : 0.2;
    const targetShadowScale = canHover ? 1.15 : 1;

    hoverScale.current += (targetScale - hoverScale.current) * Math.min(1, dt * 10);
    hoverShadow.current += (targetShadowScale - hoverShadow.current) * Math.min(1, dt * 10);

    if (group.current) {
      group.current.position.set(x, y, 0);
      group.current.rotation.z = r;
      group.current.scale.setScalar(hoverScale.current);
    }
    if (shadow.current) {
      shadow.current.position.set(0.12, -0.12, -0.01);
      shadow.current.scale.set(hoverShadow.current, hoverShadow.current, 1);
      const mat = shadow.current.material as THREE.MeshBasicMaterial;
      mat.opacity = gsap.utils.interpolate(mat.opacity, targetShadowOpacity, Math.min(1, dt * 10));
    }
  });

  return (
    <group ref={group}>
      {/* soft shadow */}
      <mesh ref={shadow}>
        <planeGeometry args={[w * 1.15, h * 1.15]} />
        <meshBasicMaterial
          map={shadowTex}
          transparent
          opacity={0.2}
          depthWrite={false}
        />
      </mesh>
      {/* tool */}
      <mesh
        ref={mesh}
        onPointerOver={(e) => {
          e.stopPropagation();
          if (assembledRef.current) {
            setHover(true);
            document.body.style.cursor = "pointer";
          }
        }}
        onPointerOut={() => {
          setHover(false);
          document.body.style.cursor = "";
        }}
      >
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial map={texture} transparent depthWrite={false} />
      </mesh>
    </group>
  );
}
