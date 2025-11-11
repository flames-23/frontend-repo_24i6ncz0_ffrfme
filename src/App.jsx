import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import { Mail, Github, Linkedin, Cpu, Database, Bot, Network } from 'lucide-react'

function Tag({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm text-white/80 ring-1 ring-white/15">
      {children}
    </span>
  )
}

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="max-w-3xl">
      <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
        <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
        <p className="text-xs tracking-wide text-white/70">{eyebrow}</p>
      </div>
      <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white">{title}</h2>
      {subtitle && <p className="mt-2 text-white/70">{subtitle}</p>}
    </div>
  )
}

function ProjectCard({ title, desc, tags, link }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -6 }}
      className="group block rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 hover:bg-white/10 transition"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <span className="text-xs text-white/50">Visit →</span>
      </div>
      <p className="mt-2 text-white/70">{desc}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((t) => (
          <span key={t} className="text-xs rounded-full bg-slate-800/70 px-2 py-1 text-white/80 ring-1 ring-white/10">
            {t}
          </span>
        ))}
      </div>
    </motion.a>
  )
}

function ContactForm() {
  const [state, setState] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const API_BASE = useMemo(() => {
    const env = import.meta.env.VITE_BACKEND_URL
    if (env) return env
    try {
      const url = new URL(window.location.origin)
      if (url.port === '3000') url.port = '8000'
      return url.toString()
    } catch {
      return ''
    }
  }, [])

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      })
      if (!res.ok) throw new Error('Failed to send')
      const data = await res.json()
      setResult({ ok: true, data })
      setState({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setResult({ ok: false, error: 'Something went wrong. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          required
          placeholder="Your name"
          value={state.name}
          onChange={(e) => setState({ ...state, name: e.target.value })}
          className="rounded-lg bg-white/10 px-4 py-3 text-white placeholder:text-white/50 ring-1 ring-white/15 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
        />
        <input
          required
          type="email"
          placeholder="Email address"
          value={state.email}
          onChange={(e) => setState({ ...state, email: e.target.value })}
          className="rounded-lg bg-white/10 px-4 py-3 text-white placeholder:text-white/50 ring-1 ring-white/15 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
        />
      </div>
      <input
        placeholder="Subject (optional)"
        value={state.subject}
        onChange={(e) => setState({ ...state, subject: e.target.value })}
        className="rounded-lg bg-white/10 px-4 py-3 text-white placeholder:text-white/50 ring-1 ring-white/15 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
      />
      <textarea
        required
        rows={5}
        placeholder="Tell me about your project..."
        value={state.message}
        onChange={(e) => setState({ ...state, message: e.target.value })}
        className="rounded-lg bg-white/10 px-4 py-3 text-white placeholder:text-white/50 ring-1 ring-white/15 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
      />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-medium text-slate-900 ring-1 ring-white/30 hover:shadow-lg transition disabled:opacity-60"
        >
          <Mail size={18} /> {loading ? 'Sending...' : 'Send message'}
        </button>
        {result && (
          <span className={result.ok ? 'text-emerald-400' : 'text-rose-400'}>
            {result.ok ? 'Message sent! I will get back to you shortly.' : result.error}
          </span>
        )}
      </div>
    </form>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/70">
      <div className="container mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/70">
        <p>© {new Date().getFullYear()} Setiawan Dwi Novantoro. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a className="hover:text-white" href="https://github.com/" target="_blank" rel="noreferrer">
            <Github size={18} />
          </a>
          <a className="hover:text-white" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative min-h-[92vh] w-full overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(56,189,248,0.25),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.18),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(34,197,94,0.12),transparent_40%)]" />
        <div className="relative z-10 container mx-auto px-6 pt-28 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-sm text-white/80">Innovative storytelling across code, data, and devices</p>
            </div>
            <h1 className="mt-6 text-4xl sm:text-6xl font-bold leading-tight tracking-tight">
              Setiawan Dwi Novantoro
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-300 to-violet-400">Fullstack Developer, Data/IoT/ML Engineer</span>
            </h1>
            <p className="mt-4 text-white/80 text-lg">
              Crafting playful, modern experiences powered by robust systems — from sensors and pipelines to models and delightful UIs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#work" className="pointer-events-auto inline-flex items-center gap-2 rounded-lg bg-white text-slate-900 px-5 py-3 font-medium shadow hover:shadow-lg transition">
                View Work
              </a>
              <a href="#contact" className="pointer-events-auto inline-flex items-center gap-2 rounded-lg bg-white/10 text-white px-5 py-3 font-medium ring-1 ring-white/20 hover:bg-white/15 transition">
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6 grid gap-10 lg:grid-cols-2 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionTitle eyebrow="About" title="Blending engineering with narrative" subtitle="I design systems that tell a story — resilient backends, insightful data flows, tactile IoT, and human-centered interfaces." />
            <div className="mt-6 flex flex-wrap gap-2">
              <Tag><Cpu className="mr-2" size={16}/>Fullstack</Tag>
              <Tag><Database className="mr-2" size={16}/>Data</Tag>
              <Tag><Network className="mr-2" size={16}/>IoT</Tag>
              <Tag><Bot className="mr-2" size={16}/>Machine Learning</Tag>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <ul className="space-y-4 text-white/80">
              <li>• Architected end-to-end data platforms with streaming, batch, and analytics layers.</li>
              <li>• Shipped interactive dashboards and design systems with modern web stacks.</li>
              <li>• Prototyped IoT pipelines from device firmware to cloud ingestion.</li>
              <li>• Trained and deployed ML models for classification, forecasting, and NLP.</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="relative py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <SectionTitle eyebrow="Selected Work" title="A few highlights" subtitle="Representative projects across platforms and disciplines." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProjectCard title="Realtime IoT Fleet" desc="Edge-to-cloud telemetry with anomaly detection and live control." tags={["MQTT", "Timeseries", "Edge", "Grafana"]} link="#" />
            <ProjectCard title="Data Platform" desc="Modern ELT with event-driven microservices and semantic layer." tags={["Kafka", "dbt", "Spark", "Airflow"]} link="#" />
            <ProjectCard title="ML Story Engine" desc="Interactive narratives powered by generative and predictive models." tags={["NLP", "RAG", "Transformers"]} link="#" />
            <ProjectCard title="Design System" desc="Accessible components with delightful motion and theming." tags={["React", "Tailwind", "Framer Motion"]} link="#" />
            <ProjectCard title="Fullstack SaaS" desc="Multi-tenant app with billing, auth, and analytics." tags={["Postgres", "Prisma", "tRPC", "Stripe"]} link="#" />
            <ProjectCard title="Vision Pipeline" desc="On-device inference with cloud retraining loops." tags={["YOLO", "ONNX", "Edge TPU"]} link="#" />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative py-20 bg-gradient-to-b from-slate-950 to-slate-950">
        <div className="container mx-auto px-6 grid gap-10 lg:grid-cols-2 items-start">
          <div>
            <SectionTitle eyebrow="Contact" title="Let’s build something memorable" subtitle="Share a bit about your idea, timeline, and impact goals." />
            <div className="mt-6 flex items-center gap-4 text-white/70">
              <a className="inline-flex items-center gap-2 hover:text-white" href="mailto:setiawan@example.com"><Mail size={18}/> setiawan@example.com</a>
              <a className="inline-flex items-center gap-2 hover:text-white" href="https://github.com/" target="_blank" rel="noreferrer"><Github size={18}/> GitHub</a>
              <a className="inline-flex items-center gap-2 hover:text-white" href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><Linkedin size={18}/> LinkedIn</a>
            </div>
          </div>
          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default App
