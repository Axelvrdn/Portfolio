import coreGsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let isRegistered = false

if (!isRegistered) {
  coreGsap.registerPlugin(ScrollTrigger)
  isRegistered = true
}

export const gsap = coreGsap
export { ScrollTrigger }
