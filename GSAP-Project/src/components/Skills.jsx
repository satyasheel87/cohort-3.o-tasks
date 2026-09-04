import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skills = [
  'HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'Express',
  'MongoDB', 'Tailwind CSS', 'Git/GitHub', 'SEO', 'Social Media Marketing', 'GSAP'
]

export default function Skills() {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current.querySelectorAll('.skill-pill'),
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    )
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="max-w-5xl mx-auto px-6 py-24">
      <h2 className="font-head font-extrabold text-3xl md:text-4xl mb-3">Skills</h2>
      <div className="h-1 w-16 bg-gradient-to-r from-emerald to-violet rounded-full mb-10"></div>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span key={skill} className="skill-pill glass-card !p-0 px-5 py-2.5 rounded-full text-sm">
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}