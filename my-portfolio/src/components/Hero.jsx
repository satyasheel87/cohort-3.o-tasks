import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const tagRef = useRef(null)
  const headRef = useRef(null)
  const paraRef = useRef(null)
  const btnRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.to(tagRef.current, { opacity: 1, y: 0, duration: 0.6 })
      .to(headRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
      .to(paraRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .to(btnRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
  }, [])

  return (
    <section className="min-h-screen flex flex-col justify-center items-start px-6 md:px-10 max-w-5xl mx-auto">
      <p ref={tagRef} className="opacity-0 translate-y-5 text-emerald tracking-[3px] text-sm mb-4">
        HELLO, I'M
      </p>
      <h1 ref={headRef} className="opacity-0 translate-y-8 font-head font-extrabold text-4xl md:text-6xl leading-tight">
        Satyasheel <br />
        <span className="gradient-text">Web Developer & Digital Marketer</span>
      </h1>
      <p ref={paraRef} className="opacity-0 translate-y-5 text-gray-400 text-lg max-w-xl my-6">
        BCA student at Dr. Ram Manohar Lohia University, building full-stack
        web apps and exploring digital marketing along the way.
      </p>
      <div ref={btnRef} className="opacity-0 translate-y-5 flex gap-4">
        <a href="#projects" className="px-7 py-3 rounded-lg font-medium text-sm bg-gradient-to-r from-emerald to-violet text-[#0a0e0d] hover:-translate-y-1 transition-transform">
          View Projects
        </a>
        <a href="#contact" className="px-7 py-3 rounded-lg font-medium text-sm border border-white/10 hover:-translate-y-1 transition-transform">
          Contact Me
        </a>
      </div>
    </section>
  )
}