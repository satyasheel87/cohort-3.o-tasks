import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current.querySelectorAll('.animate-in'),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    )
  }, [])

  return (
    <section id="about" ref={sectionRef} className="max-w-5xl mx-auto px-6 py-24">
      <h2 className="animate-in font-head font-extrabold text-3xl md:text-4xl mb-3">About Me</h2>
      <div className="animate-in h-1 w-16 bg-gradient-to-r from-emerald to-violet rounded-full mb-10 origin-left"></div>
      <p className="animate-in text-gray-400 text-lg leading-relaxed max-w-2xl">
        I'm a BCA student who enjoys building things for the web — from
        backend APIs to responsive UIs — while also exploring the digital
        marketing side of things (SEO, social media). My current focus is
        backend development within the MERN stack, and I plan to pick up
        Java as I gain more experience. I like learning new tools hands-on,
        this GSAP-powered portfolio being one of them.
      </p>
    </section>
  )
}