import { useMemo, useRef, useState } from 'react'
import type { Group } from 'three'
import { Box3, MathUtils, SRGBColorSpace, Vector3 } from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, useGLTF, useTexture } from '@react-three/drei'
import appScreenImage from '../../assets/hero.png'
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

function PhoneDevice({ isLite, scrollProgress }: Omit<DeviceProps, 'accent'>) {
  const baseYaw = Math.PI
  const groupRef = useRef<Group | null>(null)
  const [hovered, setHovered] = useState(false)
  const model = useFittedModel(phoneModelUrl, isLite ? 2.2 : 2.4)
  const appTexture = useTexture(appScreenImage, (texture) => {
    texture.colorSpace = SRGBColorSpace
    texture.needsUpdate = true
  })

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const progress = Number.isFinite(scrollProgress) ? MathUtils.clamp(scrollProgress, 0, 1) : 0
    const reveal = MathUtils.smoothstep(progress, 0.12, 0.62)
    const cinematicReveal = 1 - Math.pow(1 - reveal, 3)
    const isLocked = reveal > 0.84
    const overshootPhase = MathUtils.smoothstep(cinematicReveal, 0.72, 0.94)
    const overshoot = Math.sin(overshootPhase * Math.PI) * (1 - overshootPhase) * 0.14

    const lockedXPos = 0.74
    const lockedYPos = -0.06
    const lockedZPos = 0.04
    const lockedRotX = 0
    const lockedRotY = baseYaw
    const lockedRotZ = 0

    if (isLocked) {
      groupRef.current.position.x = MathUtils.lerp(groupRef.current.position.x, lockedXPos, delta * 4)
      groupRef.current.position.y = MathUtils.lerp(groupRef.current.position.y, lockedYPos, delta * 4)
      groupRef.current.position.z = MathUtils.lerp(groupRef.current.position.z, lockedZPos, delta * 4)
      groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, lockedRotX, delta * 4)
      groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, lockedRotY, delta * 4)
      groupRef.current.rotation.z = MathUtils.lerp(groupRef.current.rotation.z, lockedRotZ, delta * 4)
      return
    }

    const targetXPos = MathUtils.lerp(5.4, 0.74 - overshoot, cinematicReveal)
    const targetYPos = MathUtils.lerp(0.42, -0.06 + overshoot * 0.32, cinematicReveal)
    const targetZPos = MathUtils.lerp(0.54, 0.04 - overshoot * 0.26, cinematicReveal)

    const targetX = hovered ? 0.05 + state.pointer.y * 0.1 : 0.02 - overshoot * 0.06
    const targetY = hovered
      ? baseYaw - 0.16 + state.pointer.x * 0.22
      : baseYaw + reveal * 0.02 - 0.02 + overshoot * 0.08
    const targetZ = hovered ? 0.03 : -0.01

    groupRef.current.position.x = MathUtils.lerp(groupRef.current.position.x, targetXPos, delta * 1.8)
    groupRef.current.position.y = MathUtils.lerp(groupRef.current.position.y, targetYPos, delta * 1.8)
    groupRef.current.position.z = MathUtils.lerp(groupRef.current.position.z, targetZPos + targetZ, delta * 1.8)
    groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, targetX, delta * 2.6)
    groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, targetY, delta * 2.6)
    groupRef.current.rotation.z = MathUtils.lerp(groupRef.current.rotation.z, targetZ, delta * 2.6)
  })

  return (
    <group
      ref={groupRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      position={[5.4, 0.42, 0.54]}
    >
      <primitive object={model} rotation={[0, Math.PI, 0]} />
      <mesh position={[0.03, 0.07, 0.086]}>
        <planeGeometry args={[0.66, 1.38]} />
        <meshStandardMaterial map={appTexture} transparent toneMapped={false} />
      </mesh>
    </group>
  )
}

function LaptopDevice({ isLite, scrollProgress }: Omit<DeviceProps, 'accent'>) {
  const baseYaw = Math.PI
  const groupRef = useRef<Group | null>(null)
  const [hovered, setHovered] = useState(false)
  const model = useFittedModel(laptopModelUrl, isLite ? 2.35 : 2.7)

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const progress = Number.isFinite(scrollProgress) ? MathUtils.clamp(scrollProgress, 0, 1) : 0
    const reveal = MathUtils.smoothstep(progress, 0.12, 0.64)
    const cinematicReveal = 1 - Math.pow(1 - reveal, 3)
    const isLocked = reveal > 0.86
    const overshootPhase = MathUtils.smoothstep(cinematicReveal, 0.72, 0.95)
    const overshoot = Math.sin(overshootPhase * Math.PI) * (1 - overshootPhase) * 0.18

    const lockedXPos = -0.82
    const lockedYPos = -0.08
    const lockedZPos = 0.06
    const lockedRotX = 0
    const lockedRotY = baseYaw
    const lockedRotZ = 0

    if (isLocked) {
      groupRef.current.position.x = MathUtils.lerp(groupRef.current.position.x, lockedXPos, delta * 4)
      groupRef.current.position.y = MathUtils.lerp(groupRef.current.position.y, lockedYPos, delta * 4)
      groupRef.current.position.z = MathUtils.lerp(groupRef.current.position.z, lockedZPos, delta * 4)
      groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, lockedRotX, delta * 4)
      groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, lockedRotY, delta * 4)
      groupRef.current.rotation.z = MathUtils.lerp(groupRef.current.rotation.z, lockedRotZ, delta * 4)
      return
    }

    const targetXPos = MathUtils.lerp(-5.8, -0.82 + overshoot, cinematicReveal)
    const targetYPos = MathUtils.lerp(0.58, -0.08 + overshoot * 0.36, cinematicReveal)
    const targetZPos = MathUtils.lerp(0.72, 0.06 - overshoot * 0.3, cinematicReveal)

    const openRotationX = MathUtils.lerp(0.72, 0.05 + overshoot * 0.1, cinematicReveal)
    const openRotationY = MathUtils.lerp(baseYaw + 1.02, baseYaw - overshoot * 0.14, cinematicReveal)
    const openRotationZ = MathUtils.lerp(-0.2, 0 + overshoot * 0.06, cinematicReveal)

    const pointerX = hovered ? state.pointer.y * 0.08 : 0
    const pointerY = hovered ? state.pointer.x * 0.12 : 0

    groupRef.current.position.x = MathUtils.lerp(groupRef.current.position.x, targetXPos, delta * 1.7)
    groupRef.current.position.y = MathUtils.lerp(groupRef.current.position.y, targetYPos, delta * 1.7)
    groupRef.current.position.z = MathUtils.lerp(groupRef.current.position.z, targetZPos, delta * 1.7)
    groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, openRotationX + pointerX, delta * 2.2)
    groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, openRotationY + pointerY, delta * 2.2)
    groupRef.current.rotation.z = MathUtils.lerp(groupRef.current.rotation.z, openRotationZ, delta * 2.2)
  })

  return (
    <group
      ref={groupRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      position={[-5.8, 0.58, 0.72]}
    >
      <primitive object={model} rotation={[0, Math.PI, 0]} />
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
      {isLaptop ? (
        <LaptopDevice isLite={isLite} scrollProgress={scrollProgress} />
      ) : (
        <PhoneDevice isLite={isLite} scrollProgress={scrollProgress} />
      )}
    </Canvas>
  )
}

useGLTF.preload(phoneModelUrl)
useGLTF.preload(laptopModelUrl)
