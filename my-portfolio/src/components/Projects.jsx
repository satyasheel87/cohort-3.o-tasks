import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'LibraryPro',
    desc: 'Full MERN-stack Library Management System with JWT auth, Recharts dashboard, and fine calculation.',
    tech: ['React', 'Express', 'MongoDB', 'JWT'],
    github: 'https://github.com/your-username/librarypro',
    live: '#',
  },
  {
    title: 'ShopEasy',
    desc: 'Full-stack e-commerce app with cart & auth context, built with React and a Node/Express/MongoDB backend.',
    tech: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/your-username/shopeasy',
    live: '#',
  },
  {
    title: 'This Portfolio',
    desc: 'This very site — React, Tailwind & GSAP, built for the Sheryians Mini Hackathon Round 2.',
    tech: ['React', 'Tailwind', 'GSAP'],
    github: 'https://github.com/your-username/my-portfolio',
    live: '#',
  },
]

export default function Projects() {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current.querySelectorAll('.project-card'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    )
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="max-w-5xl mx-auto px-6 py-24">
      <h2 className="font-head font-extrabold text-3xl md:text-4xl mb-3">Projects</h2>
      <div className="h-1 w-16 bg-gradient-to-r from-emerald to-violet rounded-full mb-10"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div key={p.title} className="project-card glass-card">
            <h3 className="font-head text-xl mb-2">{p.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{p.desc}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {p.tech.map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-full border border-white/10 text-emerald">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-4 text-sm">
              <a href={p.github} target="_blank" rel="noreferrer" className="border-b border-emerald">GitHub</a>
              <a href={p.live} target="_blank" rel="noreferrer" className="border-b border-emerald">Live</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}