import { useGLTF, Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function Avatar(props) {
  const { scene } = useGLTF("/models/64f1a714fe61576b46f27ca2.glb");
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      // breathing
      ref.current.position.y =
        props.position[1] + Math.sin(state.clock.elapsedTime) * 0.05;

      // look at camera
      ref.current.lookAt(0, 1.6, 4);

      // move while speaking
      if (document.body.classList.contains("talking")) {
        ref.current.rotation.y =
          Math.sin(state.clock.elapsedTime * 10) * 0.05;
      }
    }
  });

  return (
    <Center>
      <primitive ref={ref} object={scene} {...props} />
    </Center>
  );
}

useGLTF.preload("/models/64f1a714fe61576b46f27ca2.glb");
