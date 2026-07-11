import { Canvas, useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import { TOOLS } from "./toolConfig";
import { ToolMesh } from "./ToolMesh";

function Responsive() {
  const { size, camera } = useThree();
  useEffect(() => {
    // Frame ~10 units on the smaller viewport axis
    const aspect = size.width / size.height;
    const cam = camera as import("three").OrthographicCamera;
    const frame = 6.5;
    if (aspect >= 1) {
      cam.top = frame;
      cam.bottom = -frame;
      cam.left = -frame * aspect;
      cam.right = frame * aspect;
    } else {
      cam.left = -frame;
      cam.right = frame;
      cam.top = frame / aspect;
      cam.bottom = -frame / aspect;
    }
    cam.updateProjectionMatrix();
  }, [size, camera]);
  return null;
}

type Props = {
  progressRef: React.MutableRefObject<number>;
  assembledRef: React.MutableRefObject<boolean>;
};

export function FlatLayScene({ progressRef, assembledRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  return (
    <Canvas
      ref={canvasRef}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <OrthographicCamera makeDefault position={[0, 0, 10]} near={0.1} far={100} />
      <Responsive />
      <Suspense fallback={null}>
        {TOOLS.map((tool) => (
          <ToolMesh
            key={tool.id}
            tool={tool}
            progressRef={progressRef}
            assembledRef={assembledRef}
          />
        ))}
      </Suspense>
    </Canvas>
  );
}
