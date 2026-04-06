import { Suspense, useMemo, useRef } from 'react'
import type { Points as PointsType } from 'three'
import { AdditiveBlending } from 'three'
import type { Mesh } from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Points, PointMaterial } from '@react-three/drei'
import { useAdaptive3D } from '../../hooks/useAdaptive3D'

function noise(seed: number) {
  const raw = Math.sin(seed * 127.1) * 43758.5453123
  return raw - Math.floor(raw)
}

type CrystalProps = {
  isLite: boolean
}

function Crystal({ isLite }: CrystalProps) {
  const meshRef = useRef<Mesh | null>(null)

  useFrame((state, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += delta * 0.14
    meshRef.current.rotation.y += delta * 0.2
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.09
  })

  return (
    <Float speed={0.8} rotationIntensity={0.55} floatIntensity={0.9}>
      <mesh ref={meshRef} position={[1.75, 0.35, -0.6]}>
        <icosahedronGeometry args={[1.35, isLite ? 0 : 1]} />
        <meshStandardMaterial
          color="#f8fafc"
          emissive="#cbd5e1"
          emissiveIntensity={0.25}
          wireframe
          metalness={0.24}
          roughness={0.45}
          transparent
          opacity={0.65}
        />
      </mesh>
    </Float>
  )
}

type ParticlesProps = {
  count: number
}

function Particles({ count }: ParticlesProps) {
  const pointsRef = useRef<PointsType | null>(null)

  const positions = useMemo(() => {
    const data = new Float32Array(count * 3)
    for (let i = 0; i < data.length; i += 3) {
      data[i] = (noise(i + 1) - 0.5) * 8
      data[i + 1] = (noise(i + 2) - 0.5) * 6
      data[i + 2] = (noise(i + 3) - 0.5) * 8
    }
    return data
  }, [count])

  useFrame((_state, delta) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += delta * 0.035
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        color="#bfdbfe"
        blending={AdditiveBlending}
      />
    </Points>
  )
}

export default function HeroScene() {
  const { isLite, dpr } = useAdaptive3D()

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={dpr} gl={{ alpha: true }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 3, 2]} intensity={1.1} color="#dbeafe" />
      <pointLight position={[-2, -1, 1.5]} intensity={1.4} color="#93c5fd" />
      <Suspense fallback={null}>
        <Crystal isLite={isLite} />
        <Particles count={isLite ? 360 : 1300} />
      </Suspense>
    </Canvas>
  )
}
