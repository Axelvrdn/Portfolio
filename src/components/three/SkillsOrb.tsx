import { useRef } from 'react'
import type { Mesh } from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useAdaptive3D } from '../../hooks/useAdaptive3D'

type OrbMeshProps = {
  isLite: boolean
}

function OrbMesh({ isLite }: OrbMeshProps) {
  const sphereRef = useRef<Mesh | null>(null)
  const ringRef = useRef<Mesh | null>(null)

  useFrame((_state, delta) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x += delta * 0.16
      sphereRef.current.rotation.y += delta * 0.24
    }
    if (ringRef.current) {
      ringRef.current.rotation.y -= delta * 0.22
      ringRef.current.rotation.x += delta * 0.1
    }
  })

  return (
    <Float speed={1.2} floatIntensity={0.8} rotationIntensity={0.8}>
      <mesh ref={sphereRef} position={[0.8, 0.2, -0.3]}>
        <sphereGeometry args={[1.35, isLite ? 18 : 32, isLite ? 18 : 32]} />
        <meshStandardMaterial
          color="#f8fafc"
          wireframe
          emissive="#cbd5e1"
          emissiveIntensity={0.18}
          transparent
          opacity={0.34}
        />
      </mesh>
      <mesh ref={ringRef} position={[0.8, 0.2, -0.3]}>
        <torusGeometry args={[1.6, 0.04, isLite ? 12 : 20, isLite ? 68 : 120]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.45} roughness={0.25} transparent opacity={0.6} />
      </mesh>
    </Float>
  )
}

export default function SkillsOrb() {
  const { isLite, dpr } = useAdaptive3D()

  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 40 }} dpr={dpr} gl={{ alpha: true }}>
      <ambientLight intensity={0.42} />
      <pointLight position={[2, 2, 2]} color="#93c5fd" intensity={0.7} />
      <OrbMesh isLite={isLite} />
    </Canvas>
  )
}
