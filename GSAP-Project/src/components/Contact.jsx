import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".animate-in"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      },
    );
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="max-w-5xl mx-auto px-6 py-24"
    >
      <h2 className="animate-in font-head font-extrabold text-3xl md:text-4xl mb-3">
        Contact
      </h2>
      <div className="animate-in h-1 w-16 bg-gradient-to-r from-emerald to-violet rounded-full mb-10"></div>
      <p className="animate-in text-gray-400 text-lg mb-6">
        Feel free to reach out for opportunities, collaborations, or just to say
        hi.
      </p>
      <div className="animate-in flex gap-4">
        <a
          href="mailto:satyasheelgautam87@gmail.com"
          className="px-6 py-2.5 rounded-lg border border-white/10 text-sm hover:border-emerald transition-colors"
        >
          Email
        </a>
        <a
          href="https://www.linkedin.com/in/satyasheel-gautam-257338259/"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-2.5 rounded-lg border border-white/10 text-sm hover:border-emerald transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/satyasheel87"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-2.5 rounded-lg border border-white/10 text-sm hover:border-emerald transition-colors"
        >
          GitHub
        </a>
      </div>
    </section>
  );
}
