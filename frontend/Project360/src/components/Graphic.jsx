import react from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Graphic() {

    return (
        <div className="flex flex-row basis-full overflow-hidden flex-grow">
            <div className="z-1 absolute top-15 left-0 flex-grow"> 
                Hello
            </div>
            <Canvas camera={{ position: [0, 5, 10] }}>
                <ambientLight intensity={0.3} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <mesh>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial color={"grey"} />
                </mesh>
                <OrbitControls/>
            </Canvas>
        </div>
    );
}

export default Graphic;
