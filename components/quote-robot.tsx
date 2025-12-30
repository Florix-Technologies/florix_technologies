'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, Environment, Html } from '@react-three/drei'
import * as THREE from 'three'

function QuoteRobotModel({ scale = 1 }: { scale?: number }) {
    const group = useRef<THREE.Group>(null)
    const { nodes, materials, animations } = useGLTF('/model/robot2.glb') as any
    const { actions, names } = useAnimations(animations, group)

    // Animation State
    const [animationIndex, setAnimationIndex] = useState(0)

    // Cycle animations every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationIndex((prev) => (prev + 1) % 4)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    const rightHandRef = useRef<THREE.Group>(null)
    const leftHandRef = useRef<THREE.Group>(null)
    const mouthRef = useRef<THREE.Group>(null)

    // Manual Animation Logic
    useFrame((state) => {
        const t = state.clock.elapsedTime

        if (group.current) {
            // Base rotation
            const baseRot = 0 // Face forward (user)
            let tgtRotY = baseRot
            let tgtRotZ = 0
            let tgtRotX = 0
            let tgtPosX = 0
            let tgtPosY = 0 // Base Y position

            // 4 Different Animations (Celebrating/Interactive)
            switch (animationIndex) {
                case 0: // 1. Excited Bounce & Wave
                    tgtPosY = 0 + Math.abs(Math.sin(t * 5)) * 0.3
                    tgtRotY = baseRot + Math.sin(t * 2) * 0.2
                    break;
                case 1: // 2. 360 Spin (Celebration)
                    tgtRotY = baseRot + t * 3
                    tgtPosY = 0 + Math.sin(t * 2) * 0.1
                    break;
                case 2: // 3. Side to Side Sway (Happy)
                    tgtRotZ = Math.sin(t * 4) * 0.15
                    tgtPosY = 0
                    break;
                case 3: // 4. Figure 8 Hover
                    tgtPosX = Math.cos(t * 2) * 0.3
                    tgtPosY = 0 + Math.sin(t * 4) * 0.1
                    break;
            }

            // Smooth Interpolation
            const DAMPING = 0.1
            group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, tgtRotX, DAMPING)
            group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, tgtRotY, DAMPING)
            group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, tgtRotZ, DAMPING)

            group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, tgtPosX, DAMPING)
            group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, tgtPosY, DAMPING)
        }

        // Hand Animations (Celebrating)
        if (rightHandRef.current) {
            // Raise hands occasionally or based on animation
            const raise = animationIndex === 0 || animationIndex === 1
            const targetX = raise ? -2.5 : Math.sin(t * 3) * 0.5
            rightHandRef.current.rotation.x = THREE.MathUtils.lerp(rightHandRef.current.rotation.x, targetX, 0.1)
            rightHandRef.current.rotation.z = THREE.MathUtils.lerp(rightHandRef.current.rotation.z, 0.2, 0.1)
        }
        if (leftHandRef.current) {
            const raise = animationIndex === 0 || animationIndex === 1
            const targetX = raise ? -2.5 : Math.sin(t * 3 + Math.PI) * 0.5
            leftHandRef.current.rotation.x = THREE.MathUtils.lerp(leftHandRef.current.rotation.x, targetX, 0.1)
            leftHandRef.current.rotation.z = THREE.MathUtils.lerp(leftHandRef.current.rotation.z, -Math.PI - 0.4, 0.1)
        }

        // Happy Smile
        if (mouthRef.current) {
            const smile = animationIndex === 0 || animationIndex === 2
            const targetZ = smile ? 3.5 : 2.881
            mouthRef.current.scale.z = THREE.MathUtils.lerp(mouthRef.current.scale.z, targetZ, 0.1)
        }
    })

    return (
        <group ref={group} scale={scale} dispose={null}>
            <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.246}>
                <group
                    name="a45b6f53b9cc462a82863bb5898bf730fbx"
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={0.01}>
                    <group name="Object_2">
                        <group name="RootNode">
                            <group
                                name="Robot_Origin"
                                position={[0, 9.763, 0]}
                                rotation={[-Math.PI / 2, 0, 0]}
                                scale={100}>
                                <group name="Robot" position={[0, 0, 0.051]}>
                                    <mesh
                                        name="Robot_White_Glossy_0"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Robot_White_Glossy_0.geometry}
                                        material={materials.White_Glossy}
                                    />
                                    <mesh
                                        name="Robot_Blue_Light_0"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Robot_Blue_Light_0.geometry}
                                        material={materials.Blue_Light}
                                    />
                                    <mesh
                                        name="Robot_Black_Matt_0"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Robot_Black_Matt_0.geometry}
                                        material={materials.Black_Matt}
                                    />
                                </group>
                                <group ref={mouthRef} name="Mouth" position={[0, -0.504, 2.573]} scale={[1, 1, 2.881]}>
                                    <mesh
                                        name="Mouth_Blue_Light_0"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Mouth_Blue_Light_0.geometry}
                                        material={materials.Blue_Light}
                                    />
                                </group>

                                <group name="Wave" position={[0, 0, 0.113]} scale={[1, 1, 0.186]}>
                                    <mesh
                                        name="Wave_Blue_Light_0"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Wave_Blue_Light_0.geometry}
                                        material={materials.Blue_Light}
                                    />
                                </group>
                                <group name="Wave002" position={[0, 0, 0.879]} scale={[1, 1, 0.889]}>
                                    <mesh
                                        name="Wave002_Blue_Light_0"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Wave002_Blue_Light_0.geometry}
                                        material={materials.Blue_Light}
                                    />
                                </group>
                                <group name="Wave001" position={[0, 0, -0.089]} scale={[1, 1, 0.001]}>
                                    <mesh
                                        name="Wave001_Blue_Light_0"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Wave001_Blue_Light_0.geometry}
                                        material={materials.Blue_Light}
                                    />
                                </group>
                                <group name="Wave003" position={[0, 0, 0.511]} scale={[1, 1, 0.552]}>
                                    <mesh
                                        name="Wave003_Blue_Light_0"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Wave003_Blue_Light_0.geometry}
                                        material={materials.Blue_Light}
                                    />
                                </group>
                                <group name="Waves" position={[0, 0, 1]} scale={[1, 1, 0.747]} />

                                <group name="Ears" position={[0, 0, 2.967]}>
                                    <mesh
                                        name="Ears_Black_Matt_0"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Ears_Black_Matt_0.geometry}
                                        material={materials.Black_Matt}
                                    />
                                </group>
                                <group name="Empty" position={[0, -0.06, 2.786]}>
                                    <group name="Eyes" position={[0, -0.431, 0.076]}>
                                        <mesh
                                            name="Eyes_Blue_Light_0"
                                            castShadow
                                            receiveShadow
                                            geometry={nodes.Eyes_Blue_Light_0.geometry}
                                            material={materials.Blue_Light}
                                        />
                                    </group>
                                </group>
                                <group ref={rightHandRef} name="Hand_origin" position={[0.723, 0, 2.015]} rotation={[0, -0.064, 0]}>
                                    <group name="hANDS" position={[-0.723, 0, -1.963]}>

                                        <mesh
                                            name="hANDS_White_Glossy_0"
                                            castShadow
                                            receiveShadow
                                            geometry={nodes.hANDS_White_Glossy_0.geometry}
                                            material={materials.White_Glossy}
                                        />
                                    </group>
                                </group>
                                <group
                                    ref={leftHandRef}
                                    name="Hand_origin002"
                                    position={[-0.723, 0, 2.015]}
                                    rotation={[0, 0.064, -Math.PI]}>
                                    <group name="hANDS002" position={[-0.723, 0, -1.963]}>
                                        <mesh
                                            name="hANDS002_White_Glossy_0"
                                            castShadow
                                            receiveShadow
                                            geometry={nodes.hANDS002_White_Glossy_0.geometry}
                                            material={materials.White_Glossy}
                                        />
                                    </group>
                                </group>
                            </group>
                        </group>
                    </group>
                </group>
            </group>
        </group>
    )
}

export default function QuoteRobot() {
    return (
        <div className="w-full h-full min-h-[500px] relative">
            <Canvas
                shadows
                camera={{ position: [0, 0, 6], fov: 45 }}
                gl={{ alpha: true, antialias: true }}
            >
                <ambientLight intensity={2.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={3} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={2} />
                <Environment preset="studio" />
                <QuoteRobotModel scale={2.3} />
            </Canvas>
        </div>
    )
}
