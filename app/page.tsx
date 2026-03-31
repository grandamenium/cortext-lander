"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Github,
  RefreshCw,
  MessageCircle,
  LayoutDashboard,
  Brain,
  Shield,
  Clock,
  Bell,
  Layers,
  Smartphone,
  Copy,
  Check,
  GitBranch,
  Activity,
  Terminal,
} from "lucide-react";

// ─── Utilities ────────────────────────────────────────────────────────────────

function useCountUp(end: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(ease * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, active]);
  return count;
}

function FadeIn({
  children,
  delay = 0,
  y = 24,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function PulseDot({ color = "#22c55e", size = 8 }: { color?: string; size?: number }) {
  return (
    <span style={{ position: "relative", display: "inline-flex", width: size, height: size, flexShrink: 0 }}>
      <motion.span
        animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          backgroundColor: color,
        }}
      />
      <span style={{ position: "relative", width: size, height: size, borderRadius: "50%", backgroundColor: color, display: "inline-flex" }} />
    </span>
  );
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      style={{ color: "rgba(248,247,244,0.5)", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontFamily: "var(--font-mono)" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied
          ? <motion.span key="y" initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.7 }} style={{ display: "flex", alignItems: "center", gap: 4, color: "#86efac" }}><Check size={13} /> copied</motion.span>
          : <motion.span key="n" initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.7 }} style={{ display: "flex", alignItems: "center", gap: 4 }}><Copy size={13} /> copy</motion.span>
        }
      </AnimatePresence>
    </button>
  );
}

// ─── NavBar ───────────────────────────────────────────────────────────────────

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <motion.nav
      initial={{ y: -56, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: scrolled ? "rgba(248,247,244,0.96)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background-color 0.25s, border-color 0.25s",
      }}
    >
      <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.03em", color: "var(--foreground)" }}>Cortext</span>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <a href="#features" style={{ fontSize: 14, color: "var(--muted-foreground)", textDecoration: "none", transition: "opacity 0.2s" }}>Features</a>
          <a href="#how-it-works" style={{ fontSize: 14, color: "var(--muted-foreground)", textDecoration: "none" }}>How it works</a>
          <a href="https://github.com/grandamenium/cortextos" target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: "var(--muted-foreground)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
            <Github size={15} /> GitHub
          </a>
          <a
            href="https://github.com/grandamenium/cortextos"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 13, fontWeight: 600, padding: "6px 16px", borderRadius: 99, backgroundColor: "var(--primary)", color: "var(--primary-foreground)", textDecoration: "none", transition: "opacity 0.2s" }}
          >
            Get started
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

// ─── InstallBlock ─────────────────────────────────────────────────────────────

const COMMANDS = {
  mac:     "curl -fsSL https://get.cortext.dev | bash",
  windows: "iwr https://get.cortext.dev/win | iex",
  npm:     "npm install -g cortextos",
};

function InstallBlock() {
  const [os, setOs] = useState<"mac" | "windows" | "npm">("mac");
  const cmd = COMMANDS[os];

  const tab = (id: typeof os, label: string) => (
    <button
      onClick={() => setOs(id)}
      style={{
        fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 6, border: "none", cursor: "pointer",
        backgroundColor: os === id ? "rgba(212,175,55,0.18)" : "transparent",
        color: os === id ? "#B8860B" : "rgba(248,247,244,0.45)",
        transition: "all 0.15s",
        fontFamily: "var(--font-mono)",
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ width: "100%", maxWidth: 520 }}>
      <div style={{
        backgroundColor: "rgba(15,15,15,0.96)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
      }}>
        {/* Tab bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.08)", backgroundColor: "rgba(0,0,0,0.25)" }}>
          <div style={{ display: "flex", gap: 4 }}>
            {tab("mac", "macOS")}
            {tab("windows", "Windows")}
            {tab("npm", "npm")}
          </div>
          <CopyBtn text={cmd} />
        </div>
        {/* Command */}
        <AnimatePresence mode="wait">
          <motion.div
            key={os}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}
          >
            <span style={{ color: "#86efac", fontFamily: "var(--font-mono)", fontSize: 13, userSelect: "none" }}>$</span>
            <span style={{ color: "#F8F7F4", fontFamily: "var(--font-mono)", fontSize: 13 }}>{cmd}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Agent Fleet Visual ───────────────────────────────────────────────────────

const AGENTS = [
  { name: "paul", role: "Orchestrator", task: "Coordinating launch sprint", tasks: 7, status: "working" },
  { name: "boris", role: "Developer", task: "Building TestFlight release", tasks: 5, status: "working" },
  { name: "donna", role: "Assistant", task: "Inbox clear, 3 replies staged", tasks: 3, status: "online" },
  { name: "nick", role: "Content", task: "3 scripts ready for review", tasks: 4, status: "online" },
  { name: "data", role: "Research", task: "Monitoring competitors", tasks: 2, status: "online" },
  { name: "sentinel", role: "Analyst", task: "Metrics report running", tasks: 3, status: "working" },
];

function AgentFleet() {
  return (
    <div style={{
      backgroundColor: "#FAFAF8",
      border: "1px solid var(--border)",
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
      width: "100%",
      maxWidth: 720,
    }}>
      {/* Header */}
      <div style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid var(--border)", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: "var(--foreground)" }}>Cortext</span>
          <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 99, backgroundColor: "rgba(22,163,74,0.1)", color: "var(--success)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>6 online</span>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {[["24", "tasks today"], ["19", "completed"], ["3", "pending"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--foreground)", fontFamily: "var(--font-mono)" }}>{v}</div>
              <div style={{ fontSize: 10, color: "var(--muted-foreground)" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: 14 }}>
        {AGENTS.map((a, i) => (
          <FadeIn key={a.name} delay={0.05 * i}>
            <div style={{ backgroundColor: "#FFFFFF", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <PulseDot color={a.status === "working" ? "#D4AF37" : "#22c55e"} />
                  <span style={{ fontWeight: 600, fontSize: 13, color: "var(--foreground)" }}>{a.name}</span>
                </div>
                <span style={{ fontSize: 10, fontFamily: "var(--font-mono)", color: "#B8860B", backgroundColor: "rgba(212,175,55,0.1)", padding: "2px 7px", borderRadius: 99 }}>{a.tasks} tasks</span>
              </div>
              <div style={{ fontSize: 10, color: "var(--muted-foreground)", marginBottom: 4 }}>{a.role}</div>
              <div style={{ fontSize: 11, color: "var(--muted-foreground)", fontFamily: "var(--font-mono)", borderTop: "1px solid var(--border)", paddingTop: 6, marginTop: 4 }}>{a.task}</div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: "#FFFFFF", borderTop: "1px solid var(--border)", padding: "8px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}>Last heartbeat: 38s ago</span>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#B8860B" }}>
          <PulseDot color="#B8860B" size={6} />
          Morning briefing sent
        </div>
      </div>
    </div>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────

function StatCounter({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useCountUp(end, 1800, inView);
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.04em", color: "var(--foreground)", fontFamily: "var(--font-mono)" }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div style={{ fontSize: 13, color: "var(--muted-foreground)", marginTop: 4 }}>{label}</div>
    </div>
  );
}

// ─── HeroSection ─────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <>
      <NavBar />
      <main style={{ backgroundColor: "var(--background)" }}>

        {/* ── HERO ── */}
        <section style={{ paddingTop: 96, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
          {/* Background image */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hero-bg.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} aria-hidden />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(248,247,244,0.55) 0%, rgba(248,247,244,0.80) 60%, rgba(248,247,244,1) 100%)" }} />
          </div>

          <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto", padding: "0 24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 32 }}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 99, border: "1px solid var(--border)", backgroundColor: "rgba(248,247,244,0.9)", fontSize: 12, color: "var(--muted-foreground)" }}
            >
              <PulseDot size={6} />
              Open source · Node.js · Claude-native
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.04em", color: "var(--foreground)", margin: 0 }}
            >
              The intelligence layer<br />
              <span style={{ color: "var(--primary)" }}>above your agents.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              style={{ fontSize: 18, lineHeight: 1.7, color: "var(--muted-foreground)", maxWidth: 580, margin: 0 }}
            >
              Cortext keeps Claude Code agents alive, coordinated, and reachable 24/7.
              Persistence, multi-agent orchestration, Telegram control, and a full
              dashboard — all wired up. Node.js, open source.
            </motion.p>

            {/* Install */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.38 }}
              style={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <InstallBlock />
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.48 }}
              style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}
            >
              <a
                href="https://github.com/grandamenium/cortextos"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 8, backgroundColor: "var(--foreground)", color: "var(--background)", fontWeight: 600, fontSize: 14, textDecoration: "none", transition: "opacity 0.2s" }}
              >
                <Github size={16} /> View on GitHub
              </a>
              <a
                href="https://github.com/grandamenium/cortextos/blob/main/README.md"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 8, backgroundColor: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.35)", color: "#B8860B", fontWeight: 600, fontSize: 14, textDecoration: "none", transition: "opacity 0.2s" }}
              >
                Read the docs
              </a>
            </motion.div>

            {/* Agent fleet */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.55 }}
              style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 12 }}
            >
              <AgentFleet />
            </motion.div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", backgroundColor: "#FFFFFF", padding: "48px 24px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            <FadeIn><StatCounter end={247} suffix="+" label="agents deployed" /></FadeIn>
            <FadeIn delay={0.1}><StatCounter end={99} suffix="%" label="uptime (launchd + auto-restart)" /></FadeIn>
            <FadeIn delay={0.2}><StatCounter end={14000} suffix="+" label="tasks completed" /></FadeIn>
          </div>
        </section>

        {/* ── PROBLEM ── */}
        <section style={{ padding: "80px 24px", textAlign: "center" }}>
          <FadeIn>
            <p style={{ maxWidth: 680, margin: "0 auto", fontSize: 22, lineHeight: 1.7, color: "var(--muted-foreground)", fontWeight: 500 }}>
              Claude Code is powerful.{" "}
              <span style={{ color: "var(--foreground)" }}>
                But keeping agents alive 24/7, coordinated across a fleet, and reachable
                from your phone takes months to build.
              </span>{" "}
              We built it once.
            </p>
          </FadeIn>
        </section>

        {/* ── FEATURES ── */}
        <section id="features" style={{ borderTop: "1px solid var(--border)", padding: "80px 24px" }}>
          <div style={{ maxWidth: 1152, margin: "0 auto" }}>
            <FadeIn>
              <div style={{ textAlign: "center", marginBottom: 56 }}>
                <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--foreground)", margin: "0 0 12px" }}>Everything you&apos;d build. Already built.</h2>
                <p style={{ fontSize: 16, color: "var(--muted-foreground)", margin: 0 }}>The infrastructure layer so you can focus on what your agents actually do.</p>
              </div>
            </FadeIn>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
              {[
                { icon: <RefreshCw size={18} />, title: "Always-on persistence", desc: "Agents survive crashes, context exhaustion, and reboots. Auto-restart via launchd, session continuation via tmux, and heartbeat monitoring keep every agent alive." },
                { icon: <GitBranch size={18} />, title: "Multi-agent orchestration", desc: "An orchestrator decomposes goals and delegates to specialists. Agents block on dependencies, surface approvals, and resume automatically — no wiring required." },
                { icon: <MessageCircle size={18} />, title: "Telegram control", desc: "Every agent gets its own Telegram bot. Send tasks, receive briefings, approve or reject actions inline — all in a chat that&apos;s always in your pocket." },
                { icon: <LayoutDashboard size={18} />, title: "Full-featured dashboard", desc: "A Next.js dashboard ships with the framework. Tasks, approvals, activity feed, agent health, knowledge base, analytics — ready to run." },
                { icon: <Smartphone size={18} />, title: "iOS mobile app", desc: "Native iOS app for on-the-go access. Monitor agents, review tasks, process approvals, and read briefings from anywhere." },
                { icon: <Brain size={18} />, title: "Long-term memory", desc: "Each agent maintains daily session memory and persistent long-term memory. Sessions continue exactly where they left off — context is never lost." },
                { icon: <Bell size={18} />, title: "Approval gates", desc: "Agents ask before acting. Emails, deploys, social posts, and financial actions are staged for your approval. One tap in Telegram to decide." },
                { icon: <Clock size={18} />, title: "Automated briefings", desc: "Morning and evening briefings pushed to Telegram automatically. What got done overnight, what needs attention, what&apos;s pending approval." },
                { icon: <Shield size={18} />, title: "Security hardened", desc: "Full audit completed — 45 vulnerabilities identified and fixed before v1 shipped. Command injection, JWT bypass, secrets management — all addressed." },
                { icon: <Layers size={18} />, title: "Agent specialization", desc: "Ship agents pre-configured for specific roles: developer, analyst, assistant, content creator, researcher. Domain tools and goals baked in." },
                { icon: <Activity size={18} />, title: "Task management", desc: "Full task lifecycle with priorities, statuses, and blockers. Every piece of work is visible on the dashboard with zero configuration." },
                { icon: <Terminal size={18} />, title: "Bus & inbox system", desc: "Agents communicate via a file-based message bus. Signed inboxes, delivery guarantees, and automatic blockers when one agent needs another to finish first." },
              ].map((f, i) => (
                <FadeIn key={f.title} delay={Math.floor(i / 3) * 0.08}>
                  <div style={{ backgroundColor: "#FFFFFF", border: "1px solid var(--border)", borderRadius: 12, padding: 24, height: "100%" }}>
                    <div style={{ display: "inline-flex", padding: 10, borderRadius: 8, backgroundColor: "rgba(212,175,55,0.10)", border: "1px solid rgba(212,175,55,0.22)", color: "#B8860B", marginBottom: 16 }}>
                      {f.icon}
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", margin: "0 0 8px" }}>{f.title}</h3>
                    <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--muted-foreground)", margin: 0 }}>{f.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── ARCHITECTURE ── */}
        <section id="how-it-works" style={{ borderTop: "1px solid var(--border)", backgroundColor: "#FFFFFF", padding: "80px 24px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <FadeIn>
              <div style={{ textAlign: "center", marginBottom: 52 }}>
                <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--foreground)", margin: "0 0 12px" }}>How it works</h2>
                <p style={{ fontSize: 16, color: "var(--muted-foreground)", margin: 0 }}>One orchestrator. Many specialists. One bus.</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
                {/* You layer */}
                <div style={{ padding: "10px 28px", borderRadius: 10, border: "1px solid var(--border)", backgroundColor: "var(--background)", fontSize: 13, fontWeight: 600, color: "var(--muted-foreground)" }}>
                  You · Telegram · Dashboard · iOS app
                </div>
                <div style={{ width: 1, height: 28, backgroundColor: "var(--border)" }} />

                {/* Orchestrator */}
                <div style={{ padding: "14px 36px", borderRadius: 12, border: "2px solid var(--primary)", backgroundColor: "rgba(212,175,55,0.08)", textAlign: "center" }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#B8860B" }}>Orchestrator</div>
                  <div style={{ fontSize: 11, color: "var(--muted-foreground)", fontFamily: "var(--font-mono)", marginTop: 4 }}>decomposes goals · delegates · monitors · briefs</div>
                </div>
                <div style={{ width: 1, height: 28, backgroundColor: "var(--border)" }} />

                {/* Bus */}
                <div style={{ padding: "8px 24px", borderRadius: 8, border: "1px dashed rgba(22,163,74,0.45)", backgroundColor: "rgba(22,163,74,0.05)", fontSize: 12, color: "var(--success)", fontFamily: "var(--font-mono)" }}>
                  message bus · inbox · task queue · event log
                </div>
                <div style={{ width: 1, height: 28, backgroundColor: "var(--border)" }} />

                {/* Agents */}
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
                  {[["Developer", "code · deploys"], ["Analyst", "metrics · health"], ["Assistant", "email · calendar"], ["Researcher", "intel · scraping"], ["Creator", "content · scripts"]].map(([name, sub]) => (
                    <div key={name} style={{ padding: "10px 16px", borderRadius: 10, border: "1px solid var(--border)", backgroundColor: "var(--background)", textAlign: "center", minWidth: 110 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 4 }}>
                        <PulseDot size={6} />
                        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--foreground)" }}>{name}</span>
                      </div>
                      <div style={{ fontSize: 10, color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}>{sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section style={{ padding: "80px 24px", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <FadeIn>
              <div style={{ textAlign: "center", marginBottom: 56 }}>
                <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--foreground)", margin: "0 0 12px" }}>Up in 10 minutes</h2>
                <p style={{ fontSize: 16, color: "var(--muted-foreground)", margin: 0 }}>From zero to a running agent fleet.</p>
              </div>
            </FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 32 }}>
              {[
                { n: 1, title: "Install and configure", body: "Clone the repo, run the interactive setup, and create your organization. Takes about 10 minutes. Your agents get names, roles, and Telegram bots." },
                { n: 2, title: "Agents come online", body: "Each agent boots in its own tmux session, reads its identity and goals, sets up its cron schedule, and messages you on Telegram when ready." },
                { n: 3, title: "Work from anywhere", body: "Send tasks by message. Receive briefings pushed to you. Approve or reject actions inline. View everything on the dashboard or mobile app." },
              ].map((s, i) => (
                <FadeIn key={s.n} delay={i * 0.1}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                    <div style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "var(--primary)", color: "var(--primary-foreground)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18, marginBottom: 20 }}>
                      {s.n}
                    </div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--foreground)", margin: "0 0 10px" }}>{s.title}</h3>
                    <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--muted-foreground)", margin: 0 }}>{s.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── QUICK START ── */}
        <section style={{ borderTop: "1px solid var(--border)", backgroundColor: "#FFFFFF", padding: "80px 24px" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <FadeIn>
              <div style={{ textAlign: "center", marginBottom: 40 }}>
                <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--foreground)", margin: "0 0 12px" }}>Quick start</h2>
                <p style={{ fontSize: 16, color: "var(--muted-foreground)", margin: 0 }}>The exact commands to go from zero to running.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div style={{ backgroundColor: "oklch(0.11 0 0)", border: "1px solid oklch(0.27 0 0)", borderRadius: 12, overflow: "hidden" }}>
                <div style={{ backgroundColor: "oklch(0.15 0 0)", borderBottom: "1px solid oklch(0.22 0 0)", padding: "8px 16px", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: "#ef4444", opacity: 0.8, display: "inline-block" }} />
                  <span style={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: "#eab308", opacity: 0.8, display: "inline-block" }} />
                  <span style={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: "#22c55e", opacity: 0.8, display: "inline-block" }} />
                  <span style={{ fontFamily: "var(--font-mono)", color: "oklch(0.5 0 0)", fontSize: 12, marginLeft: 8 }}>bash</span>
                </div>
                <pre style={{ padding: 24, fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.85, overflowX: "auto", margin: 0 }}>
                  {[
                    ["#", "Clone and install"],
                    ["$", "git clone https://github.com/grandamenium/cortextos"],
                    ["$", "cd cortextos && npm install"],
                    ["", ""],
                    ["#", "Interactive setup — creates your org, agents, Telegram bots"],
                    ["$", 'claude -p "/cortextos-setup"'],
                    ["", ""],
                    ["#", "Enable your first agent"],
                    ["$", "bash enable-agent.sh orchestrator"],
                    ["", ""],
                    ["#", "Launch the dashboard"],
                    ["$", "cd dashboard && npm run build && npm start"],
                    ["", ""],
                    ["#", "Your agents message you on Telegram — you're live"],
                  ].map(([type, text], i) => (
                    <div key={i}>
                      {type === "#" && <span style={{ color: "oklch(0.48 0 0)" }}>{text}</span>}
                      {type === "$" && <><span style={{ color: "#86efac", userSelect: "none" }}>$ </span><span style={{ color: "#F8F7F4" }}>{text}</span></>}
                      {type === "" && <span>&nbsp;</span>}
                    </div>
                  ))}
                </pre>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── SECURITY ── */}
        <section style={{ borderTop: "1px solid var(--border)", padding: "80px 24px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <FadeIn>
              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid var(--border)", borderLeft: "3px solid var(--primary)", borderRadius: 12, padding: 36 }}>
                <div style={{ display: "flex", gap: 20 }}>
                  <div style={{ flexShrink: 0, padding: 10, borderRadius: 8, backgroundColor: "rgba(212,175,55,0.10)", border: "1px solid rgba(212,175,55,0.22)", color: "#B8860B", alignSelf: "flex-start" }}>
                    <Shield size={22} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--foreground)", margin: "0 0 16px" }}>We audited ourselves before you had to.</h2>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--muted-foreground)", margin: "0 0 12px" }}>A full security audit completed on 2026-03-31 identified 45 vulnerabilities across the bash layer, agent lifecycle management, Telegram integration, and the Node.js dashboard API. All four Critical findings remediated. Audit surface included command injection, JWT bypass, secrets management, and inter-agent isolation.</p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, margin: "24px 0" }}>
                      {[["45", "vulnerabilities found"], ["4", "critical — all fixed"], ["16", "high — 12 fixed"]].map(([v, l]) => (
                        <div key={l} style={{ textAlign: "center" }}>
                          <div style={{ fontSize: 28, fontWeight: 800, color: "#B8860B", fontFamily: "var(--font-mono)", letterSpacing: "-0.03em" }}>{v}</div>
                          <div style={{ fontSize: 11, color: "var(--muted-foreground)", marginTop: 4 }}>{l}</div>
                        </div>
                      ))}
                    </div>
                    <a href="https://github.com/grandamenium/cortextos" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#B8860B", fontFamily: "var(--font-mono)", textDecoration: "none" }}>View security report on GitHub →</a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--foreground)", padding: "80px 24px", textAlign: "center" }}>
          <div style={{ maxWidth: 580, margin: "0 auto" }}>
            <FadeIn>
              <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.04em", color: "var(--background)", margin: "0 0 16px" }}>Start building today.</h2>
              <p style={{ fontSize: 16, color: "rgba(248,247,244,0.6)", margin: "0 0 40px", lineHeight: 1.65 }}>Cortext is open source. Node.js, MIT licensed. Clone it, run setup, and have agents running in under 10 minutes.</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
                <a href="https://github.com/grandamenium/cortextos" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "#F8F7F4", textDecoration: "none" }}>
                  <Github size={16} /> GitHub →
                </a>
                <a href="https://github.com/grandamenium/cortextos/blob/main/README.md" target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: "rgba(248,247,244,0.5)", textDecoration: "none" }}>
                  Read the docs →
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop: "1px solid var(--border)", padding: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: "var(--foreground)" }}>Cortext</span>
          <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>Open source · MIT License · Built for Claude Code</span>
          <a href="https://github.com/grandamenium/cortextos" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--muted-foreground)", textDecoration: "none" }}>
            <Github size={13} /> grandamenium/cortextos
          </a>
        </footer>

      </main>
    </>
  );
}
