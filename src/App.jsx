import { useState, useEffect, useRef } from 'react'
import './index.css'

/* ── CURSOR ── */
function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  let fx = 0, fy = 0, mx = 0, my = 0

  useEffect(() => {
    const move = e => {
      mx = e.clientX; my = e.clientY
      if (dot.current) {
        dot.current.style.left = e.clientX + 'px'
        dot.current.style.top = e.clientY + 'px'
      }
    }
    const animate = () => {
      fx += (mx - fx) * 0.12
      fy += (my - fy) * 0.12
      if (ring.current) {
        ring.current.style.left = fx + 'px'
        ring.current.style.top = fy + 'px'
      }
      requestAnimationFrame(animate)
    }
    window.addEventListener('mousemove', move)
    animate()
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={dot} />
      <div className="cursor-ring" ref={ring} />
    </>
  )
}

/* ── NAV ── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <a href="#home" className="nav-logo">KH.</a>
      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <a href="mailto:kushalhallikar@gmail.com" className="nav-cta">Hire me</a>
    </nav>
  )
}

/* ── HERO ── */
function Hero() {
  const [muted, setMuted] = useState(true)
  const [imgError, setImgError] = useState(false)
  const videoRef = useRef(null)
  const portraitRef = useRef(null)

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !muted
      videoRef.current.muted = newMuted
      setMuted(newMuted)
    }
  }

  const handlePortraitMove = e => {
    const el = portraitRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) * 0.2
    const y = (e.clientY - r.top - r.height / 2) * 0.2
    el.style.transform = `translate(${x}px,${y}px)`
  }
  const handlePortraitLeave = () => {
    if (portraitRef.current) portraitRef.current.style.transform = ''
  }

  return (
    <section className="hero" id="home">
      {/* VIDEO BACKGROUND — file must be at: public/intro.mp4 */}
      <div className="hero-video-wrap">
        <video
          ref={videoRef}
          autoPlay
          muted={muted}
          loop
          playsInline
          poster="/photo.jpg"
          style={{ opacity: 0.6 }}
        >
          <source src="/intro.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay" />
      </div>

      {/* MUTE / UNMUTE BUTTON */}
      <button className="mute-btn" onClick={toggleMute} title={muted ? 'Unmute' : 'Mute'}>
        {muted ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
        )}
      </button>

      <div className="hero-bg-text">AIML</div>

      {/* BADGE */}
      <div style={{ position: 'relative', zIndex: 2, marginBottom: '2.5rem' }}>
        <div className="hero-badge">
          <div className="badge-dot" />
          Open to work · Bengaluru &amp; Remote
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="hero-content">
        <div>
          <h1 className="hero-heading">
            <span className="grad">Kushal</span><br />
            Hallikar<br />
            <span className="dim">Y.</span>
          </h1>
        </div>

        <div className="hero-right">
          {/* PORTRAIT — file must be at: public/photo.jpg */}
          <div
            className="portrait-wrap"
            ref={portraitRef}
            onMouseMove={handlePortraitMove}
            onMouseLeave={handlePortraitLeave}
          >
            {!imgError ? (
              <img
                src="/photo.jpg"
                alt="Kushal Hallikar "
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="portrait-fallback">KH</div>
            )}
          </div>

          <p className="hero-tagline">
            <strong>AI / ML Engineer</strong><br />
            GenAI · NLP · Computer Vision<br />
            Bengaluru, Karnataka
          </p>
        </div>
      </div>

      {/* SCROLL HINT */}
      <div className="scroll-hint">
        <div className="scroll-line" />
        Scroll
      </div>
    </section>
  )
}

/* ── MARQUEE ── */
const MARQUEE_ITEMS = ['LangChain','RAG Pipelines','PyTorch','TensorFlow','Gemini API','Hugging Face','Computer Vision','NLP','Streamlit','Flask','Scikit-learn','Transfer Learning']
function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div className="mq-wrap">
      <div className="mq-track">
        {doubled.map((item, i) => (
          <span className="mq-item" key={i}>{item}<span className="mq-sep">✦</span></span>
        ))}
      </div>
    </div>
  )
}

/* ── FADE IN HOOK ── */
function useFadeIn() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

/* ── ABOUT ── */
function About() {
  const r1 = useFadeIn(), r2 = useFadeIn(), r3 = useFadeIn()
  return (
    <section id="about">
      <div className="sec-label fi" ref={r1}>About Me</div>
      <h2 className="sec-heading fi" ref={r2}>Who I Am.</h2>
      <div className="about-grid">
        <div>
          <p className="about-bio fi" ref={r3}>
            Recent <strong>B.E. graduate in AI &amp; ML (2026)</strong> from East West Institute
            of Technology, Bengaluru. I build and deploy end-to-end AI systems — from{' '}
            <strong>LLM-powered RAG pipelines</strong> to <strong>medical imaging classifiers</strong>.
            Passionate about Generative AI, NLP, and turning complex data into real-world products.
            <br /><br />
            Completed an industry internship at <strong>MindMatrix</strong> building an Android app
            with Generative AI integration. Currently seeking <strong>ML Engineer, Data Scientist,</strong>
            {' '}and <strong>GenAI roles</strong> in Bengaluru and remote.
          </p>
          <div className="about-meta">
            <div className="meta-row">🎓 <span>B.E. AI &amp; ML · East West Institute of Technology · 2026</span></div>
            <div className="meta-row">💼 <span>Intern · MindMatrix (Android + GenAI)</span></div>
            <div className="meta-row">📍 <span>Bengaluru, Karnataka, India</span></div>
            <div className="meta-row">🚀 <span>Open to ML Engineer · Data Scientist · GenAI roles</span></div>
          </div>
          <div className="about-cta">
            <a href="mailto:kushalhallikar@gmail.com" className="btn-solid">Get in touch ↗</a>
            <a href="https://github.com/kushalhallikar-spec" target="_blank" rel="noreferrer" className="btn-ghost">GitHub</a>
            {/* FIX 1: Added www. to LinkedIn URL */}
            <a href="https://www.linkedin.com/in/kushalhallikar" target="_blank" rel="noreferrer" className="btn-ghost">LinkedIn</a>
          </div>
        </div>

        <div>
          <div className="sk-cat">Languages</div>
          <div className="sk-row">
            {['Python', 'SQL'].map(s => <span className="sk-tag" key={s}>{s}</span>)}
          </div>

          <div className="sk-cat">ML / DL Frameworks</div>
          <div className="sk-row">
            {['TensorFlow', 'Keras', 'PyTorch', 'Scikit-learn'].map(s => <span className="sk-tag" key={s}>{s}</span>)}
          </div>

          <div className="sk-cat">GenAI &amp; NLP</div>
          <div className="sk-row">
            {['LangChain', 'RAG Pipelines', 'LLM APIs', 'Prompt Engineering', 'Hugging Face', 'Gemini API'].map(s => (
              <span className="sk-tag ai" key={s}>{s}</span>
            ))}
          </div>

          <div className="sk-cat">Data &amp; Visualisation</div>
          <div className="sk-row">
            {['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Tableau', 'Power BI'].map(s => <span className="sk-tag" key={s}>{s}</span>)}
          </div>

          <div className="sk-cat">Dev &amp; Deploy</div>
          <div className="sk-row">
            {['Streamlit', 'Flask', 'Git'].map(s => <span className="sk-tag" key={s}>{s}</span>)}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── PROJECTS ── */
const PROJECTS = [
  {
    num: '01 / 03',
    cat: 'GenAI · NLP',
    name: 'AI Resume\nAssistant',
    desc: 'LLM-powered resume analyser using RAG and LangChain to extract 60+ skills and generate precise skill-gap analysis. Multi-provider LLM fallback with 99% uptime and sub-3s response time.',
    tags: ['Python','LangChain','RAG','Groq API','Llama 3.3 70B','Streamlit','Hugging Face'],
    github: 'https://github.com/kushalhallikar-spec/AI-Resume-Assistant',
    // FIX 2: Replace with your real Streamlit URL, or set to null to hide button
    live: null,
    accentColor: 'rgba(168,237,204,',
  },
  {
    num: '02 / 03',
    cat: 'ML · FinTech',
    name: 'Loan Default\nPredictor',
    desc: 'End-to-end ML pipeline analysing 10,000+ loan records to predict default risk with ~88% accuracy. Real-time Streamlit dashboard processes 15+ input features in under 1 second.',
    tags: ['Python','Scikit-learn','Pandas','NumPy','Feature Engineering','Streamlit'],
    github: 'https://github.com/kushalhallikar-spec/Loan-prediction',
    // FIX 2: Replace with your real Streamlit URL, or set to null to hide button
    live: null,
    accentColor: 'rgba(245,233,122,',
  },
  {
    num: '03 / 03',
    cat: 'Computer Vision · Healthcare',
    name: 'Brain Disease\nClassifier',
    desc: 'Medical imaging classifier fine-tuned on 3,000+ MRI scans using ResNet50 transfer learning, achieving ~92% accuracy across 4 brain disease classes. Deployed as a real-time Flask web app.',
    tags: ['Python','TensorFlow','Keras','ResNet50','Transfer Learning','Flask'],
    github: 'https://github.com/kushalhallikar-spec/Brain_disease_classification_app',
    // FIX 2: Replace with your real Flask URL, or set to null to hide button
    live: null,
    accentColor: 'rgba(168,237,204,',
  },
]

function ProjectCard({ proj }) {
  const ref = useFadeIn()
  const a = proj.accentColor
  return (
    <div className="proj-card fi" ref={ref}>
      <div className="proj-info">
        <div>
          <div className="proj-num">{proj.num} — {proj.cat}</div>
          <div className="proj-name">
            {proj.name.split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}
          </div>
          <p className="proj-desc">{proj.desc}</p>
        </div>
        <div>
          <div className="proj-tags">
            {proj.tags.map(t => <span className="proj-tag" key={t}>{t}</span>)}
          </div>
          <div className="proj-links">
            <a href={proj.github} target="_blank" rel="noreferrer" className="btn-solid" style={{ fontSize: '.74rem' }}>GitHub ↗</a>
            {/* FIX 2: Only render Live Demo button if URL exists */}
            {proj.live && (
              <a href={proj.live} target="_blank" rel="noreferrer" className="btn-ghost" style={{ fontSize: '.74rem' }}>Live Demo</a>
            )}
          </div>
        </div>
      </div>
      <div className="proj-visual">
        <div className="mock">
          <div className="mock-bar">
            <div className="mock-dot" style={{ background: '#ff5f57' }} />
            <div className="mock-dot" style={{ background: '#febc2e' }} />
            <div className="mock-dot" style={{ background: '#28c840' }} />
          </div>
          <div className="mock-body">
            <div className="ml" style={{ width: '55%', background: `${a}0.18)` }} />
            <div className="ml" style={{ width: '38%' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '.3rem', marginTop: '.3rem' }}>
              <div style={{ background: `${a}0.07)`, borderRadius: '6px', padding: '.5rem .6rem', border: `1px solid ${a}0.12)` }}>
                <div className="ml" style={{ width: '80%', height: '6px', background: `${a}0.18)`, marginBottom: '.3rem' }} />
                <div className="ml" style={{ width: '60%', height: '5px' }} />
              </div>
              <div style={{ background: 'rgba(255,255,255,.03)', borderRadius: '6px', padding: '.5rem .6rem', border: '1px solid var(--border)', flex: 1 }}>
                <div className="ml" style={{ width: '90%', height: '5px', marginBottom: '.25rem' }} />
                <div className="ml" style={{ width: '70%', height: '5px', marginBottom: '.25rem' }} />
                <div className="ml" style={{ width: '50%', height: '5px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Projects() {
  const r1 = useFadeIn(), r2 = useFadeIn()
  return (
    <section id="projects">
      <div className="sec-label fi" ref={r1}>Work</div>
      <h2 className="sec-heading fi" ref={r2}>Projects.</h2>
      <div className="proj-grid">
        {PROJECTS.map((p, i) => <ProjectCard proj={p} key={i} />)}
      </div>
    </section>
  )
}

/* ── CONTACT ── */
const CONTACTS = [
  { icon: '✉', platform: 'Email', label: 'kushalhallikar@gmail.com', href: 'mailto:kushalhallikar@gmail.com' },
  // FIX 1: Added www. to LinkedIn URL
  { icon: 'in', platform: 'LinkedIn', label: 'linkedin.com/in/kushalhallikar', href: 'https://www.linkedin.com/in/kushalhallikar', iconStyle: { fontFamily: "'Kanit',sans-serif", fontWeight: 800, fontSize: '.9rem' } },
  { icon: '⌥', platform: 'GitHub', label: 'github.com/kushalhallikar-spec', href: 'https://github.com/kushalhallikar-spec' },
  { icon: '💬', platform: 'WhatsApp', label: '+91 82178 91123', href: 'https://wa.me/918217891123' },
]

function Contact() {
  const refs = [useFadeIn(), useFadeIn(), useFadeIn(), useFadeIn()]
  return (
    <section id="contact" style={{ paddingBottom: '5rem' }}>
      <div className="sec-label">Let's Connect</div>
      <div className="contact-big">
        Got a role<br />
        or project?<br />
        <span className="grad-line">Let's talk.</span>
      </div>
      <p className="contact-sub">
        Looking for ML Engineer, Data Scientist, or GenAI Developer roles —
        Bengaluru &amp; remote. Open to full-time, contract, and freelance.
      </p>
      <div className="contact-rows">
        {CONTACTS.map((c, i) => (
          <a
            href={c.href}
            target={c.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noreferrer"
            className="cr fi"
            key={i}
            ref={refs[i]}
          >
            <div className="cr-left">
              <div className="cr-icon" style={c.iconStyle}>{c.icon}</div>
              <div className="cr-meta">
                <span className="cr-platform">{c.platform}</span>
                <span className="cr-label">{c.label}</span>
              </div>
            </div>
            <span className="cr-arrow">↗</span>
          </a>
        ))}
      </div>
      <div className="contact-cta">
        <a href="mailto:kushalhallikar@gmail.com" className="btn-cta">Send me an email ↗</a>
        <p className="contact-note">
          Usually replies within 24 hours.<br />
          Based in Bengaluru, India 🇮🇳
        </p>
      </div>
    </section>
  )
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer>
      <span>© 2026 Kushal Hallikar   Bengaluru, India</span>
      <span>
        B.E. AI &amp; ML ·{' '}
        <a href="https://github.com/kushalhallikar-spec" target="_blank" rel="noreferrer">GitHub</a>
        {' · '}
        {/* FIX 1: Added www. to LinkedIn URL */}
        <a href="https://www.linkedin.com/in/kushalhallikar" target="_blank" rel="noreferrer">LinkedIn</a>
      </span>
    </footer>
  )
}

/* ── APP ── */
export default function App() {
  return (
    <>
      <Cursor />
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </>
  )
}
