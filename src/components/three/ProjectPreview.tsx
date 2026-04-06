import { useMemo, useRef, useState } from 'react'
import type { Group } from 'three'
import { Box3, Color, MathUtils, Vector3 } from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, useGLTF } from '@react-three/drei'
import laptopModelUrl from '../../assets/models/Macbook Pro 13 2020.glb?url'
import phoneModelUrl from '../../assets/models/iPhone 16 Pro Max 3D Model.glb?url'
import { useAdaptive3D } from '../../hooks/useAdaptive3D'

type ProjectPreviewProps = {
  accent?: string
  variant?: 'phone' | 'laptop'
  scrollProgress?: number
}

type DeviceProps = {
  accent: string
  isLite: boolean
  scrollProgress: number
}

function useFittedModel(modelUrl: string, targetSize: number) {
  const { scene } = useGLTF(modelUrl)

  return useMemo(() => {
    const model = scene.clone(true)
    model.updateMatrixWorld(true)

    const box = new Box3().setFromObject(model)
    const size = new Vector3()
    const center = new Vector3()
    box.getSize(size)
    box.getCenter(center)

    const maxAxis = Math.max(size.x, size.y, size.z) || 1
    const scale = targetSize / maxAxis

    model.position.sub(center)
    model.scale.multiplyScalar(scale)

    model.traverse((object) => {
      if (!('isMesh' in object) || !object.isMesh) return
      object.frustumCulled = false
    })

    return model
  }, [scene, targetSize])
}

function PhoneDevice({ accent, isLite, scrollProgress }: DeviceProps) {
  const groupRef = useRef<Group | null>(null)
  const [hovered, setHovered] = useState(false)
  const model = useFittedModel(phoneModelUrl, isLite ? 2.2 : 2.4)

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const progress = Number.isFinite(scrollProgress) ? MathUtils.clamp(scrollProgress, 0, 1) : 0
    const scrollLift = MathUtils.lerp(-0.16, 0.06, progress)
    const targetX = hovered ? 0.16 + state.pointer.y * 0.2 : 0.1 - progress * 0.06
    const targetY = hovered ? 0.22 + state.pointer.x * 0.3 : 0.18 + progress * 0.2
    const targetZ = hovered ? 0.03 : -0.03 + progress * 0.03

    groupRef.current.position.y = MathUtils.lerp(groupRef.current.position.y, scrollLift, delta * 2.2)
    groupRef.current.position.z = MathUtils.lerp(groupRef.current.position.z, targetZ, delta * 2.2)
    groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, targetX, delta * 3)
    groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, targetY, delta * 2.7)
  })

  return (
    <group
      ref={groupRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      position={[0, -0.08, -0.02]}
    >
      <primitive object={model} rotation={[0, Math.PI, 0]} />
      <mesh position={[0, -0.68, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.82, 64]} />
        <meshStandardMaterial color={new Color(accent)} transparent opacity={0.14} />
      </mesh>
    </group>
  )
}

function LaptopDevice({ accent, isLite, scrollProgress }: DeviceProps) {
  const groupRef = useRef<Group | null>(null)
  const [hovered, setHovered] = useState(false)
  const model = useFittedModel(laptopModelUrl, isLite ? 2.35 : 2.7)

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const progress = Number.isFinite(scrollProgress) ? MathUtils.clamp(scrollProgress, 0, 1) : 0
    const reveal = MathUtils.smoothstep(progress, 0.05, 0.9)
    const targetX = hovered ? 0.1 + state.pointer.y * 0.16 : 0.06 - reveal * 0.1
    const targetY = hovered ? state.pointer.x * 0.3 : -0.45 + reveal * 0.34
    const targetZ = hovered ? 0.05 : -0.09 + reveal * 0.06
    const targetYPos = -0.16 + reveal * 0.08

    groupRef.current.position.y = MathUtils.lerp(groupRef.current.position.y, targetYPos, delta * 2.2)
    groupRef.current.position.z = MathUtils.lerp(groupRef.current.position.z, targetZ, delta * 2.2)
    groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, targetX, delta * 2.7)
    groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, targetY, delta * 2.7)
  })

  return (
    <group
      ref={groupRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      position={[0, -0.16, -0.08]}
    >
      <primitive object={model} rotation={[0, Math.PI * 0.86, 0]} />
      <mesh position={[0, -0.74, 0.02]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.24, 72]} />
        <meshStandardMaterial color={new Color(accent)} transparent opacity={0.15} />
      </mesh>
    </group>
  )
}

export default function ProjectPreview({
  accent = '#2563eb',
  variant = 'phone',
  scrollProgress = 0,
}: ProjectPreviewProps) {
  const { isLite, dpr } = useAdaptive3D()
  const isLaptop = variant === 'laptop'

  const camera = useMemo(
    () =>
      isLaptop
        ? {
            position: [0, 0.02, 3.3] as [number, number, number],
            fov: 35,
            near: 0.01,
            far: 100,
          }
        : {
            position: [0, 0.03, 3.2] as [number, number, number],
            fov: 37,
            near: 0.01,
            far: 100,
          },
    [isLaptop],
  )

  return (
    <Canvas camera={camera} dpr={dpr} gl={{ alpha: true }}>
      <ambientLight intensity={0.76} />
      <hemisphereLight args={['#ffffff', '#dbeafe', 0.45]} />
      <directionalLight position={[2.2, 2.6, 3]} intensity={isLite ? 0.82 : 1.15} color="#ffffff" />
      <spotLight position={[-2.1, 1.6, 2.7]} intensity={isLite ? 0.46 : 0.72} color={accent} angle={0.48} />
      <pointLight position={[1.2, -0.8, 1.4]} intensity={isLite ? 0.14 : 0.28} color="#cbd5e1" />
      <Environment preset="city" />
      <mesh position={[0, -0.95, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.5, 64]} />
        <meshStandardMaterial color="#dbeafe" transparent opacity={0.28} />
      </mesh>
      {isLaptop ? (
        <LaptopDevice accent={accent} isLite={isLite} scrollProgress={scrollProgress} />
      ) : (
        <PhoneDevice accent={accent} isLite={isLite} scrollProgress={scrollProgress} />
      )}
    </Canvas>
  )
}

useGLTF.preload(phoneModelUrl)
useGLTF.preload(laptopModelUrl)
