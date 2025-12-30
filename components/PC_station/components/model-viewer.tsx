"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import * as THREE from "three"

type Vec3 = [number, number, number]

function Model({ position = [0, 0, 0] as Vec3, rotation = [0, 0, 0] as Vec3, scale = [1, 1, 1] as Vec3, modelPath }: { position?: Vec3; rotation?: Vec3; scale?: Vec3; modelPath: string }) {
  const { scene } = useGLTF(modelPath)
  const groupRef = useRef(null)

  useEffect(() => {
    // Hide loading overlay when model is loaded
    const loadingOverlay = document.getElementById("loading-overlay")
    if (loadingOverlay) {
      loadingOverlay.style.opacity = "0"
      loadingOverlay.style.pointerEvents = "none"
      loadingOverlay.style.transition = "opacity 0.5s ease-out"
    }

    const silverMaterial = new THREE.MeshStandardMaterial({
      color: 0xC0C0C0, // Silver color
      metalness: 0.7,
      roughness: 0.3,
    })

    scene.traverse((node) => {
      const mesh = node as THREE.Mesh
      if (mesh.isMesh) {
        mesh.castShadow = true
        mesh.receiveShadow = true

        // Apply silver color to CPU, keyboard, and table
        const nodeName = mesh.name?.toLowerCase() ?? ""
        if (
          nodeName.includes("cpu") ||
          nodeName.includes("keyboard") ||
          nodeName.includes("table") ||
          nodeName.includes("desk") ||
          nodeName.includes("key")
        ) {
          mesh.material = silverMaterial.clone()
        }

        // Ensure materials are properly rendered (handle single material or array)
        if (mesh.material) {
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
          materials.forEach((m) => {
            const mat = m as THREE.Material
            if (mat) mat.side = THREE.DoubleSide
          })
        }
      }
    })
  }, [scene])

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  )
}

export function ModelViewer({ modelPath = "/model/laptop.glb", scale = [1, 1, 1] }: { modelPath?: string; scale?: Vec3 }) {
  // Default values - no controls needed
  const position: Vec3 = [1, -1.9, -1.4]
  const rotation: Vec3 = [-0.04, -0.64, 0]

  const [camera, setCamera] = useState<{ position: Vec3; fov: number }>({ position: [6, 4, 9], fov: 50 })

  useEffect(() => {
    function updateCamera() {
      const w = window.innerWidth
      if (w < 640) {
        setCamera({ position: [3.5, 2.5, 6], fov: 45 })
      } else if (w < 1024) {
        setCamera({ position: [5, 3.5, 8], fov: 48 })
      } else {
        setCamera({ position: [6, 4, 9], fov: 50 })
      }
    }

    updateCamera()
    window.addEventListener("resize", updateCamera)
    return () => window.removeEventListener("resize", updateCamera)
  }, [])

  return (
    <div className="w-full h-64 md:h-80 lg:h-96 bg-black/20 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 relative flex items-center justify-center">
      <Canvas
        className="w-full h-full"
        camera={{ position: camera.position, fov: camera.fov }}
        gl={{
          antialias: true,
          preserveDrawingBuffer: true,
          alpha: false,
        }}
        shadows
      >
        {/* Ambient light for overall brightness */}
        <ambientLight intensity={1.5} />

        {/* Hemisphere light for natural lighting from all directions */}
        <hemisphereLight intensity={1.2} />

        {/* Key light from top */}
        <directionalLight
          position={[0, 15, 5]}
          intensity={2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* Fill lights from multiple directions */}
        <pointLight position={[15, 10, 10]} intensity={1.2} />
        <pointLight position={[-15, 10, 10]} intensity={1.2} />
        <pointLight position={[0, 10, 15]} intensity={1} />
        <pointLight position={[0, 10, -15]} intensity={1} />

        {/* Bottom fill light */}
        <pointLight position={[0, -5, 0]} intensity={0.6} />

        <Suspense fallback={null}>
          <Model position={position} rotation={rotation} scale={scale} modelPath={modelPath} />
        </Suspense>
        <OrbitControls
          autoRotate={false}
          autoRotateSpeed={3}
          enableZoom={true}
          enablePan={true}
        />
      </Canvas>

      {/* Loading indicator */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none" id="loading-overlay">
        <div className="text-white text-xl font-semibold">Loading 3D Model...</div>
      </div>
    </div>
  )
}
