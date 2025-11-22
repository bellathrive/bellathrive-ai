"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  PhoneCall,
  Zap,
  Timer,
  Users,
  Calendar,
  Sparkles,
  ShieldCheck,
  Waves,
} from "lucide-react";

// BellaThrive AI — Cinematic, Futuristic, Clean
// One-page marketing site focused on Mission, Process, FAQ, and Contact

export default function BellaThriveAI() {
  // Smooth internal anchor scroll
  useEffect(() => {
    const links = Array.from(document.querySelectorAll('a[href^="#"]'));
    const handler = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", href);
      }
    };
    links.forEach((l) => l.addEventListener("click", handler as any));
    return () => links.forEach((l) => l.removeEventListener("click", handler as any));
  }, []);

  // Lightweight runtime smoke checks ("test cases" for DOM)
  useEffect(() => {
    const ids = ["hero", "mission", "about", "process", "faq", "contact"];
    ids.forEach((id) => {
      // eslint-disable-next-line no-console
      console.assert(!!document.getElementById(id), `[SMOKE] Missing section #${id}`);
    });
    // eslint-disable-next-line no-console
    console.assert(!!document.querySelector("[data-testid='bg-grid']"), "[SMOKE] BackgroundGrid missing");
    // Additional test: hero keyword strip should exist
    // eslint-disable-next-line no-console
    console.assert(!!document.querySelector("[data-testid='hero-keyword-strip']"), "[SMOKE] Hero keyword strip missing");
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="min-h-screen w-full bg-black text-white font-sans antialiased selection:bg-blue-200 selection:text-black overflow-x-hidden">
      {/* Button styles */}
      <style>{`
        .btn-primary{background:#fff;color:#000;padding:.75rem 1.5rem;border-radius:9999px;font-weight:500;transition:all .2s;display:inline-flex;align-items:center;justify-content:center}
        .btn-primary:hover{background:#e5e7eb}
        .btn-secondary{border:1px solid rgb(12,74,110);color:#bfdbfe;padding:.75rem 1.5rem;border-radius:9999px;transition:all .2s;display:inline-flex;align-items:center;justify-content:center}
        .btn-secondary:hover{background:rgba(30,58,138,.2)}
      `}</style>

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 z-[90]"
      />

      <BackgroundGrid />
      <Nav />
      <Hero />
      <Mission />
      <About />
      <Process />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}

// NAVIGATION
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#mission", label: "Mission" },
    { href: "#about", label: "Founders" },
    { href: "#process", label: "Our Process" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/40 border-b border-blue-900/60">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 py-3">
        <a href="#hero" className="text-2xl font-light tracking-wide text-blue-300">
          BellaThrive <span className="text-blue-100">AI</span>
        </a>
        <div className="hidden md:flex items-center space-x-8 text-[15px] text-blue-100">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-blue-400 transition">
              {l.label}
            </a>
          ))}
          <a
          href="https://calendly.com/bellathrive/ai-discovery-call"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 btn-primary">
            Request Demo <ArrowRight size={16} />
          </a>
        </div>
        {/* Mobile toggle */}
        <button
          className="md:hidden text-blue-100 inline-flex items-center gap-1"
          onClick={() => setOpen((v) => !v)}
        >
          Menu <ChevronDown className={`transition ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-blue-900/60 bg-black/80"
          >
            <div className="px-6 py-4 space-y-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-blue-100 hover:text-blue-400 transition"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="https://calendly.com/bellathrive/ai-discovery-call"
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 btn-primary"
              >
                Request Demo <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// HERO
function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative h-[100dvh] flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_110%,rgba(32,64,255,0.10),transparent_60%)]" />
      <div className="absolute inset-x-0 bottom-16 pointer-events-none opacity-80">
        <SoundWave variant="wide" />
      </div>
      <motion.h1
        style={{ y: yTitle, opacity }}
        className="text-5xl md:text-6xl lg:text-7xl font-light mb-6"
      >
        BellaThrive AI
      </motion.h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
        Elevating customer experience with blazing-fast, intelligent Voice &amp; Conversational AI — never miss
        another call or message, follow up faster, and reduce repetitive workloads, all 24/7.
      </p>
      <div className="flex gap-4 justify-center">
        <a href="#process" className="btn-primary">
          Explore Our Process
        </a>
        <a
          href="https://calendly.com/bellathrive/ai-discovery-call"
          target="_blank"
          rel="noreferrer"
          className="btn-secondary"
        >
          Request Demo
        </a>
      </div>
      <FloatingChips />
    </section>
  );
}

// MISSION
function Mission() {
  const items = [
    {
      title: "Enhancing First Impressions & Speed",
      desc: "Instant response meets polished tone—your brand feels premium from the first hello.",
      icon: <Timer size={22} />,
    },
    {
      title: "Proactive Capture & Fast Follow-up",
      desc: "Structure intake, qualify leads, and trigger workflows automatically.",
      icon: <Sparkles size={22} />,
    },
    {
      title: "Reduce Team Load, Keep the Human",
      desc: "Offload repetitive calls while your team focuses on high-value conversations.",
      icon: <Users size={22} />,
    },
  ];

  // Animated counters for key stats
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const duration = 1500; // ms
    const startVals = { a: 0, b: 0 };
    const endVals = { a: 391, b: 83 };

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount1(Math.round(startVals.a + (endVals.a - startVals.a) * progress));
      setCount2(Math.round(startVals.b + (endVals.b - startVals.b) * progress));
      if (progress < 1) requestAnimationFrame(step);
    };

    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section id="mission" className="relative py-28 bg-gradient-to-b from-black via-blue-950/30 to-black px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Key stats row */}
        <div className="grid md:grid-cols-2 gap-4 mb-3 text-left md:text-center">
          <div className="border border-blue-900/60 rounded-2xl px-6 py-5 bg-blue-900/10 flex flex-col md:items-center">
            <span className="text-3xl md:text-4xl font-light text-cyan-300 mb-1">{count1}%</span>
            <p className="text-[13px] md:text-sm text-gray-300 max-w-sm">
              increase in sales conversion when a lead is contacted within 60 seconds versus waiting longer.
            </p>
          </div>
          <div className="border border-blue-900/60 rounded-2xl px-6 py-5 bg-blue-900/10 flex flex-col md:items-center">
            <span className="text-3xl md:text-4xl font-light text-cyan-300 mb-1">{count2}%</span>
            <p className="text-[13px] md:text-sm text-gray-300 max-w-sm">
              of customers expect immediate help when they contact a business.
            </p>
          </div>
        </div>
        <p className="text-[11px] md:text-xs text-gray-500 mb-10">
          Source: widely reported lead response and customer experience studies.
        </p>

        <h2 className="text-4xl font-light mb-6">Our Mission</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="border border-blue-900/60 rounded-2xl p-6 bg-blue-900/5 hover:bg-blue-900/20 hover:ring-2 hover:ring-cyan-400/60 hover:shadow-[0_0_30px_rgba(56,189,248,0.35)] transition"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-300">
                {it.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{it.title}</h3>
              <p className="text-gray-300">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FOUNDERS
function About() {
  return (
    <section id="about" className="relative py-28 px-6 bg-black text-blue-100">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Founders story */}
        <div>
          <h2 className="text-4xl font-light mb-2">Meet the Founders</h2>
          <p className="text-lg font-medium text-blue-100 mb-6">Emery &amp; Camilla</p>

          <p className="text-gray-300 leading-relaxed text-lg mb-4">
            We&apos;re a husband-and-wife team building voice and conversational AI solutions for service businesses
            across the US.
          </p>

          <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-4">
            Emery brings seven years of digital marketing expertise spanning SEO, paid advertising (Google, Facebook,
            Instagram), and business development. After helping dozens of businesses grow their inbound customer volume
            through optimized ad campaigns and search visibility, he noticed a critical problem: clients were generating
            more leads but couldn&apos;t answer them fast enough. The bottleneck wasn&apos;t marketing—it was response
            capacity. That realization led to conversational AI: technology that ensures businesses can actually capture
            the inquiries they&apos;re paying to generate, whether by phone or message.
          </p>

          <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-4">
            Camilla brings proven business operations and growth expertise. She once increased customer traffic at a
            large global brand&apos;s flagship location by over 4x in just three months. Her understanding of customer
            service challenges and operational efficiency ensures our AI systems feel natural and professional, designed
            around how real businesses operate.
          </p>

          <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-4">
            As new parents, we&apos;re building something that lasts—for our daughter Bella and for the businesses we
            partner with. Our business name, BellaThrive, comes directly from her: we&apos;re building a thriving future
            for her while helping our partners thrive. Now we&apos;re sharing systems we know work with business owners who
            want to lead their market, not follow it.
          </p>

          <p className="text-gray-200 leading-relaxed text-sm md:text-base">
            We build AI that answers every call and message—instantly. No more missed inquiries when your team is busy.
            No more leads going cold. Just qualified prospects ready for your team to close.
          </p>
        </div>

        {/* Founder photos */}
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          <figure className="relative rounded-2xl overflow-hidden border border-blue-900/60 bg-slate-900/40 h-80 md:h-80">
            <img
              src="/images/emery.jpg"
              alt="Emery — Co-founder of BellaThrive AI"
              className="h-full w-full object-cover object-center"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 text-left">
              <p className="text-sm font-medium text-blue-100">Emery Co-founder</p>
            </figcaption>
          </figure>

          <figure className="relative rounded-2xl overflow-hidden border border-blue-900/60 bg-slate-900/40 h-80 md:h-80">
            <img
              src="/images/camilla.jpg"
              alt="Camilla — Co-founder of BellaThrive AI"
              className="h-full w-full object-cover object-center"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 text-left">
              <p className="text-sm font-medium text-blue-100">Camilla Co-founder</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

// TESTIMONIALS — removed per request
function Process() {
  const steps = [
    {
      num: "01",
      title: "Discovery",
      desc: "A fast 10–15 minute call to align on goals, call flows, and existing systems. We identify the quickest path to value.",
    },
    {
      num: "02",
      title: "Prototype",
      desc: "We deliver a working agent with real call logs. You test scripts, edge cases, and handling logic.",
    },
    {
      num: "03",
      title: "Integrate",
      desc: "Calendar integration with platforms like Google Calendar and Apple Calendar. Prompts, routing, and guardrails are refined.",
    },
    {
      num: "04",
      title: "Go Live",
      desc: "Your agent launches. We monitor performance, iterate weekly, and provide transparent reporting.",
    },
  ];

  return (
    <section id="process" className="relative py-28 px-6 bg-gradient-to-b from-black via-blue-950/20 to-black text-blue-100">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-light mb-12">Our Process</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="border border-blue-900/60 rounded-2xl p-8 bg-blue-900/5 hover:bg-blue-900/20 hover:ring-2 hover:ring-cyan-400/60 transition text-left"
            >
              <span className="text-4xl font-light text-cyan-300 mb-2 block">{s.num}</span>
              <h3 className="text-xl font-medium mb-2">{s.title}</h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return null;
}

// FAQ
function FAQ() {
  const items = [
    {
      q: "How does it work?",
      a: "The AI answers calls 24/7, understands what callers need, answers their questions, and books appointments directly into your calendar—just like a receptionist would.",
    },
    {
      q: "How quickly can the AI respond?",
      a: "The AI answers calls within seconds and responds to callers in real-time during the conversation—no hold music, no waiting.",
    },
    {
      q: "What if it doesn't understand someone?",
      a: "If the AI can't handle a request, it takes a message and notifies you immediately so you always stay in control.",
    },
    {
      q: "Does it sound robotic?",
      a: "Modern voice AI sounds natural and conversational. Most callers don’t realize they're speaking with AI.",
    },
    {
      q: "What happens to my current phone number?",
      a: "You keep your existing number. Calls simply route through the AI system first.",
    },
    {
      q: "How long does it take to get up and running?",
      a: "Most businesses launch within 2–4 weeks depending on complexity and workload.",
    },
    {
      q: "What if I'm already missing calls?",
      a: "That’s exactly what this solves. The AI answers every call instantly—even when you're busy or after hours.",
    },
    {
      q: "Can I turn it off or adjust it?",
      a: "Yes. You have full control and can modify how it works at any time.",
    },
    {
      q: "What types of businesses use this?",
      a: "Medical practices, home services, legal offices, and any business that books appointments or handles customer inquiries.",
    },
  ];

  return (
    <section id="faq" className="relative py-28 px-6 bg-gradient-to-b from-black to-blue-950/40">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-light text-center mb-8">FAQ</h2>
        <div className="space-y-4 mt-6">
          {items.map((item, i) => (
            <details
              key={i}
              className="group border border-blue-900/60 rounded-2xl p-4 bg-blue-900/5 hover:bg-blue-900/20 transition"
            >
              <summary className="cursor-pointer text-lg font-medium text-gray-200 flex items-center justify-between">
                {item.q}
                <ChevronDown className="transition group-open:rotate-180" />
              </summary>
              <p className="text-gray-400 mt-2">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// CONTACT
function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

const onSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!formRef.current) return;

  setLoading(true);
  setSent(false);
  setError(null);

  const formData = new FormData(formRef.current);

  try {
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      message: formData.get("message"),
    };

    const res = await fetch("https://formspree.io/f/xldvjdbl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      formRef.current.reset();
      setSent(true);
    } else {
      const data = await res.json().catch(() => null);
      console.error("Formspree error:", data || res.statusText);
      setError("Something went wrong. Please try again or email us directly.");
    }
  } catch (err) {
    console.error("Form submit error:", err);
    setError("Something went wrong. Please try again or email us directly.");
  } finally {
    setLoading(false);
  }
};

  return (
    <section id="contact" className="relative py-28 px-6 bg-black text-blue-100">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-4xl font-light mb-6">See a Live Demo</h2>
          <p className="text-gray-300 mb-6 max-w-prose">
            Have questions or ready to explore Voice AI for your business? Send a message and we&apos;ll map a rollout
            that fits your team and customers.
          </p>
          <ul className="text-gray-400 text-sm space-y-2">
            <li className="flex items-center gap-2">
              <Waves size={16} className="text-blue-300" /> 24/7 intelligent answering
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-blue-300" /> Secure, compliant workflows
            </li>
            <li className="flex items-center gap-2">
              <Sparkles size={16} className="text-blue-300" /> Ongoing optimization and reviews
            </li>
          </ul>
        </div>
        <div className="max-w-xl w-full">
          <form ref={formRef} onSubmit={onSubmit} className="grid gap-4 text-left">
            <Input name="name" placeholder="Full Name" required />
            <Input type="email" name="email" placeholder="Email" required />
            <Input name="company" placeholder="Company" />
            <Textarea name="message" placeholder="How can we help?" rows={5} />
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary inline-flex items-center gap-2 disabled:opacity-70"
              >
                {loading ? <Spinner /> : <PhoneCall size={18} />} Send Message
              </button>
              <a href="#process" className="btn-secondary">
                View Process
              </a>
            </div>
            <AnimatePresence>
              {sent && !error && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-green-300 text-sm"
                >
                  ✅ Message sent! We&apos;ll reach out shortly.
                </motion.p>
              )}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-sm"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="bg-gray-900 border border-blue-900 rounded-2xl px-4 py-3 focus:border-blue-600 outline-none placeholder:text-gray-500"
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="bg-gray-900 border border-blue-900 rounded-2xl px-4 py-3 focus:border-blue-600 outline-none placeholder:text-gray-500"
    />
  );
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4 text-black" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8 8 8 0 110 16 8 8 0 01-8-8"
      />
    </svg>
  );
}

// FOOTER
function Footer() {
  return (
    <footer className="relative py-12 text-center text-gray-500 text-sm border-t border-blue-900/60">
      © {new Date().getFullYear()} BellaThrive AI — All rights reserved.
    </footer>
  );
}

// HERO KEYWORD STRIP — bold, minimal, cinematic
function FloatingChips() {
  const words = [
    "Answers Every Call Instantly",
    "Books Appointments Automatically",
    "24/7 AI Employee",
    "Never Miss a Lead Again",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      data-testid="hero-keyword-strip"
      className="mt-10 md:mt-12 pointer-events-none select-none"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-base md:text-lg text-blue-200 font-light tracking-wide"
        >
          {words[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// BACKGROUND GRID
function BackgroundGrid() {
  return (
    <div
      data-testid="bg-grid"
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.08]"
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="text-blue-300/40"
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

// SOUNDWAVE
function SoundWave({ variant = "wide" }) {
  return (
    <svg
      viewBox="0 0 1440 200"
      className={variant === "wide" ? "w-full max-w-6xl mx-auto" : "w-full max-w-xl mx-auto"}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="waveGrad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
      </defs>
      <path
        d="M0,100 C200,20 400,180 600,100 C800,20 1000,180 1200,100 C1350,40 1440,140 1440,140"
        fill="none"
        stroke="url(#waveGrad)"
        strokeWidth="3"
      >
        <animate
          attributeName="d"
          dur="6s"
          repeatCount="indefinite"
          values="
            M0,100 C200,20 400,180 600,100 C800,20 1000,180 1200,100 C1350,40 1440,140 1440,140;
            M0,120 C200,40 400,160 600,120 C800,40 1000,160 1200,120 C1350,60 1440,120 1440,120;
            M0,90 C200,10 400,190 600,90 C800,10 1000,190 1200,90 C1350,30 1440,150 1440,150;
            M0,100 C200,20 400,180 600,100 C800,20 1000,180 1200,100 C1350,40 1440,140 1440,140
          "
        />
      </path>
    </svg>
  );
}

// BACK TO TOP
function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = () => {
      setShow(window.scrollY > 600);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-full shadow-lg transition"
    >
      ↑
    </button>
  );
}
