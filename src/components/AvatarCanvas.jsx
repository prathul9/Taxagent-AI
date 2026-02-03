import { Canvas } from "@react-three/fiber";
import { Avatar } from "./Avatar";
import { Suspense } from "react";

export default function AvatarCanvas() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{
          position: [0, 1.6, 2.2], // eye level, close
          fov: 28,                // cinematic zoom
        }}
      >
        {/* Soft studio lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 3, 2]} intensity={1.2} />
        <directionalLight position={[-2, 3, 2]} intensity={0.6} />

        <Suspense fallback={null}>
          {/* Push model down so face is centered */}
          <Avatar scale={3.5} position={[0, -1.4, 0]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
