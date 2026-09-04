import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Navbar() {
  const navRef = useRef(null)

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    })
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 w-full flex justify-between items-center px-10 py-5 bg-[#0a0e0d]/70 backdrop-blur-md border-b border-white/10 z-50"
    >
      <div className="font-head font-extrabold text-xl gradient-text">Satyasheel</div>
      <ul className="hidden md:flex gap-8 text-sm text-gray-400">
        <li><a href="#about" className="hover:text-emerald transition-colors">About</a></li>
        <li><a href="#skills" className="hover:text-emerald transition-colors">Skills</a></li>
        <li><a href="#projects" className="hover:text-emerald transition-colors">Projects</a></li>
        <li><a href="#education" className="hover:text-emerald transition-colors">Education</a></li>
        <li><a href="#contact" className="hover:text-emerald transition-colors">Contact</a></li>
      </ul>
    </nav>
  )
}