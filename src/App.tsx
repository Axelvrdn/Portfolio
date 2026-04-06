import About from './components/sections/About'
import Contact from './components/sections/Contact'
import Hero from './components/sections/Hero'
import LifeDomains from './components/sections/LifeDomains'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Vision from './components/sections/Vision'
import Navbar from './components/ui/Navbar'
import { useLenis } from './hooks/useLenis'

function App() {
  useLenis()

  return (
    <div className="relative min-h-screen text-slate-900">
      <div className="app-ambient pointer-events-none absolute inset-0 -z-0" />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <LifeDomains />
        <Projects />
        <Vision />
        <Contact />
      </main>
    </div>
  )
}

export default App
