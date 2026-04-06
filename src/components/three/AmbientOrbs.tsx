import { useRef } from 'react'
import type { Mesh } from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useAdaptive3D } from '../../hooks/useAdaptive3D'

function Orb({
  position,
  radius,
  speed,
  color,
}: {
  position: [number, number, number]
  radius: number
  speed: number
  color: string
}) {
  const ref = useRef<Mesh | null>(null)

  useFrame((_state, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * speed
    ref.current.rotation.y += delta * (speed * 1.2)
  })

  return (
    <Float speed={0.65} floatIntensity={0.5} rotationIntensity={0.35}>
      <mesh ref={ref} position={position}>
        <sphereGeometry args={[radius, 24, 24]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.22} />
      </mesh>
    </Float>
  )
}

export default function AmbientOrbs() {
  const { dpr } = useAdaptive3D()

  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 46 }} dpr={dpr} gl={{ alpha: true }}>
      <ambientLight intensity={0.35} />
      <pointLight position={[2.5, 2, 2]} intensity={0.6} color="#93c5fd" />
      <Orb position={[-2.2, 0.85, -1.5]} radius={1.05} speed={0.08} color="#94a3b8" />
      <Orb position={[1.8, -0.6, -1]} radius={0.9} speed={0.06} color="#cbd5e1" />
      <Orb position={[0.2, 1.1, -2.1]} radius={0.7} speed={0.1} color="#bfdbfe" />
    </Canvas>
  )
}
