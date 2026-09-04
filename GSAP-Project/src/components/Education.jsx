import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Education() {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current.querySelectorAll('.edu-item'),
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    )
  }, [])

  return (
    <section id="education" ref={sectionRef} className="max-w-5xl mx-auto px-6 py-24">
      <h2 className="font-head font-extrabold text-3xl md:text-4xl mb-3">Education</h2>
      <div className="h-1 w-16 bg-gradient-to-r from-emerald to-violet rounded-full mb-10"></div>
      <div className="edu-item">
        <h4 className="font-head text-lg">Bachelor of Computer Applications (BCA)</h4>
        <span className="text-violet text-sm">Dr. Ram Manohar Lohia University</span>
      </div>
    </section>
  )
}