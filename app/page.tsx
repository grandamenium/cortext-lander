"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Github,
  Layers,
  RefreshCw,
  MessageCircle,
  LayoutDashboard,
  Brain,
  Shield,
  Clock,
  Zap,
  GitBranch,
  Bell,
  ChevronRight,
  Copy,
  Check,
  Activity,
  Network,
  Smartphone,
  ArrowRight,
  Star,
} from "lucide-react";

// ─── Utilities ────────────────────────────────────────────────────────────────

function useCountUp(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

// ─── Fade-in wrapper ─────────────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const directionMap = {
    up: { y: 28, x: 0 },
    down: { y: -28, x: 0 },
    left: { x: 28, y: 0 },
    right: { x: -28, y: 0 },
    none: { x: 0, y: 0 },
  };

  const initial = { opacity: 0, ...directionMap[direction] };
  const animate = inView ? { opacity: 1, x: 0, y: 0 } : initial;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Pulsing status dot ───────────────────────────────────────────────────────

function StatusDot({ color = "#22c55e" }: { color?: string }) {
  return (
    <span className="relative inline-flex h-2 w-2">
      <span
        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
        style={{ backgroundColor: color }}
      />
      <span
        className="relative inline-flex rounded-full h-2 w-2"
        style={{ backgroundColor: color }}
      />
    </span>
  );
}

// ─── CopyButton ──────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="transition-all duration-200 hover:opacity-80 active:scale-95"
      style={{ color: "var(--muted-foreground)" }}
      aria-label="Copy"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Check size={14} style={{ color: "var(--success)" }} />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Copy size={14} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

// ─── NavBar ───────────────────────────────────────────────────────────────────

function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        backgroundColor: scrolled ? "rgba(248,247,244,0.97)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background-color 0.3s, border-color 0.3s, backdrop-filter 0.3s",
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <span
          className="font-bold text-xl tracking-tight"
          style={{ color: "var(--foreground)", letterSpacing: "-0.03em" }}
        >
          Cortext
        </span>

        <div className="flex items-center gap-5">
          <a
            href="#features"
            className="text-sm transition-opacity hover:opacity-70 hidden md:block"
            style={{ color: "var(--muted-foreground)" }}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm transition-opacity hover:opacity-70 hidden md:block"
            style={{ color: "var(--muted-foreground)" }}
          >
            How it works
          </a>
          <a
            href="https://github.com/grandamenium/cortextos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm flex items-center gap-1.5 transition-opacity hover:opacity-70"
            style={{ color: "var(--muted-foreground)" }}
          >
            <Github size={15} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <a
            href="https://github.com/grandamenium/cortextos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200 hover:opacity-90 hover:shadow-sm active:scale-95"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
          >
            Get started
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

const INSTALL_CMD = "npx cortext init";
const CLONE_CMD = "git clone https://github.com/grandamenium/cortextos";

function HeroSection() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], ["0%", "15%"]);
  const bgOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  const [activeCmd, setActiveCmd] = useState<"npx" | "git">("npx");

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-14"
    >
      {/* Hero background image */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: bgY, opacity: bgOpacity }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
        {/* Gradient overlay to blend with page bg */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(248,247,244,0.35) 0%, rgba(248,247,244,0.55) 60%, rgba(248,247,244,1) 100%)",
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-8 py-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "rgba(248,247,244,0.85)",
            color: "var(--muted-foreground)",
          }}
        >
          <StatusDot />
          <span>Open source · v2.0 · Claude-native</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight"
          style={{ color: "var(--foreground)", letterSpacing: "-0.03em" }}
        >
          The intelligence layer
          <br />
          <span
            className="relative"
            style={{ color: "var(--primary)" }}
          >
            above your agents
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg sm:text-xl max-w-2xl leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
        >
          Cortext keeps your Claude Code agents running 24/7 — orchestrated,
          reachable over Telegram, and visible on a live dashboard.
          Multi-agent coordination, memory, and task routing. Out of the box.
        </motion.p>

        {/* Install block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full max-w-xl"
        >
          {/* Tab switcher */}
          <div
            className="flex items-center gap-1 mb-3 p-1 rounded-lg w-fit mx-auto"
            style={{ backgroundColor: "rgba(0,0,0,0.05)" }}
          >
            {(["npx", "git"] as const).map((cmd) => (
              <button
                key={cmd}
                onClick={() => setActiveCmd(cmd)}
                className="px-3 py-1 rounded-md text-xs font-medium transition-all duration-200"
                style={{
                  backgroundColor: activeCmd === cmd ? "white" : "transparent",
                  color: activeCmd === cmd ? "var(--foreground)" : "var(--muted-foreground)",
                  boxShadow: activeCmd === cmd ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                }}
              >
                {cmd === "npx" ? "npx" : "git clone"}
              </button>
            ))}
          </div>

          {/* Terminal block */}
          <div
            className="rounded-xl border overflow-hidden"
            style={{
              backgroundColor: "rgba(20, 20, 20, 0.95)",
              borderColor: "rgba(255,255,255,0.08)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)",
            }}
          >
            {/* Terminal chrome */}
            <div
              className="flex items-center justify-between px-4 py-2.5 border-b"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                terminal
              </span>
              <CopyButton text={activeCmd === "npx" ? INSTALL_CMD : CLONE_CMD} />
            </div>

            {/* Command */}
            <div className="px-5 py-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCmd}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 font-mono text-sm"
                >
                  <span style={{ color: "var(--primary)" }}>$</span>
                  <span style={{ color: "#e8e8e8" }}>
                    {activeCmd === "npx" ? INSTALL_CMD : CLONE_CMD}
                  </span>
                  <span
                    className="animate-blink ml-0.5 inline-block w-1.5 h-4 rounded-sm"
                    style={{ backgroundColor: "var(--primary)" }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <p className="text-xs mt-3" style={{ color: "var(--muted-foreground)" }}>
            Requires Claude API key · Works on macOS, Linux, Windows
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <a
            href="https://github.com/grandamenium/cortextos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
          >
            <Github size={16} />
            View on GitHub
            <ArrowRight size={14} />
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm border transition-all duration-200 hover:opacity-80 hover:-translate-y-0.5 active:scale-95"
            style={{
              borderColor: "var(--border)",
              color: "var(--foreground)",
              backgroundColor: "rgba(248,247,244,0.8)",
            }}
          >
            See features
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        style={{ color: "var(--muted-foreground)" }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronRight size={16} className="rotate-90 opacity-40" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Stats strip ─────────────────────────────────────────────────────────────

function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const agents = useCountUp(247, 2000, inView);
  const uptime = useCountUp(99, 1500, inView);
  const tasks = useCountUp(14000, 2200, inView);

  return (
    <section
      ref={ref}
      className="border-y py-12"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
        {[
          { value: agents, suffix: "+", label: "Agents deployed" },
          { value: uptime, suffix: "%", label: "Average uptime" },
          { value: tasks >= 14000 ? "14k" : tasks, suffix: "+", label: "Tasks completed" },
        ].map((stat, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div>
              <div
                className="text-4xl font-bold tracking-tight mb-1"
                style={{ color: "var(--foreground)", letterSpacing: "-0.03em" }}
              >
                <span>{stat.value}</span>
                <span style={{ color: "var(--primary)" }}>{stat.suffix}</span>
              </div>
              <div className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                {stat.label}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: RefreshCw,
    title: "Persistent 24/7 agents",
    description:
      "Agents stay alive across Claude session limits via tmux. Auto-restart on crashes, heartbeat monitoring, and session recovery built in.",
  },
  {
    icon: Network,
    title: "Multi-agent orchestration",
    description:
      "Orchestrator-analyst-specialist topology. Agents communicate through a shared message bus. Dispatch tasks, monitor progress, handle blockers automatically.",
  },
  {
    icon: MessageCircle,
    title: "Telegram control plane",
    description:
      "Send directives, receive briefings, approve actions, and monitor status — all from your phone. Real-time two-way communication with every agent.",
  },
  {
    icon: LayoutDashboard,
    title: "Live web dashboard",
    description:
      "One-click visibility into every agent: task queues, heartbeat status, event activity, memory state, and approval requests. No code required.",
  },
  {
    icon: Brain,
    title: "Built-in memory system",
    description:
      "Two-layer memory: daily session logs for continuity plus long-term MEMORY.md for learned preferences and patterns. Nothing lost between restarts.",
  },
  {
    icon: GitBranch,
    title: "Task queue and routing",
    description:
      "Every directive becomes a tracked task. Priority-based routing, blocked state management, and approval flows. Full auditability from dashboard.",
  },
  {
    icon: Shield,
    title: "Approval gates",
    description:
      "Agents request sign-off before any external action — emails, deploys, posts, financial moves. You stay in control with minimal friction.",
  },
  {
    icon: Zap,
    title: "Skills system",
    description:
      "Agents gain capabilities through composable skill files. Install community skills or write your own. Drop a file, the agent picks it up automatically.",
  },
  {
    icon: Bell,
    title: "Event logging and activity feed",
    description:
      "Every significant action emits a typed event. The dashboard activity feed and Telegram activity channel keep you observing coordination in real time.",
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-1.5 text-xs font-medium mb-4"
              style={{ color: "var(--primary)" }}
            >
              <Layers size={13} />
              <span>What&apos;s included</span>
            </div>
            <h2
              className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
              style={{ color: "var(--foreground)", letterSpacing: "-0.03em" }}
            >
              Everything your agents need
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "var(--muted-foreground)" }}
            >
              Cortext is the infrastructure layer — persistence, coordination, communication,
              and control — so your agents can focus on the work.
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <FadeIn key={i} delay={i * 0.05}>
                <div
                  className="group p-6 rounded-2xl border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-default"
                  style={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-amber-50"
                    style={{ backgroundColor: "rgba(212,175,55,0.1)" }}
                  >
                    <Icon size={17} style={{ color: "var(--primary)" }} />
                  </div>
                  <h3
                    className="font-semibold mb-2 text-[15px]"
                    style={{ color: "var(--foreground)" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                    {feature.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── How it works ─────────────────────────────────────────────────────────────

const STEPS = [
  {
    number: "01",
    title: "Install and configure",
    description:
      "Run the onboarding wizard. Set up your organization, configure your Telegram bot, and define your first agents. Takes about 10 minutes.",
    code: "npx cortext init",
  },
  {
    number: "02",
    title: "Launch your agents",
    description:
      "Each agent gets its own tmux session, CLAUDE.md configuration, and skill set. The orchestrator starts coordinating automatically.",
    code: "bash bus/enable-agent.sh myagent",
  },
  {
    number: "03",
    title: "Send directives via Telegram",
    description:
      "Message your orchestrator. It decomposes goals into tasks, routes work to specialist agents, and reports back when done.",
    code: '> Research competitors and draft a report',
  },
  {
    number: "04",
    title: "Monitor from the dashboard",
    description:
      "Watch tasks flow through the queue, see heartbeats, approve external actions, and review the activity feed — all from one place.",
    code: "open http://localhost:3000",
  },
];

function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-24 border-t"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-1.5 text-xs font-medium mb-4"
              style={{ color: "var(--primary)" }}
            >
              <Activity size={13} />
              <span>How it works</span>
            </div>
            <h2
              className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
              style={{ color: "var(--foreground)", letterSpacing: "-0.03em" }}
            >
              From zero to orchestrated
              <br />in minutes
            </h2>
          </div>
        </FadeIn>

        <div className="space-y-6">
          {STEPS.map((step, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                className="group flex gap-6 p-6 rounded-2xl border transition-all duration-300 hover:shadow-sm"
                style={{
                  backgroundColor: "var(--card)",
                  borderColor: "var(--border)",
                }}
              >
                <div
                  className="text-3xl font-bold shrink-0 w-14 text-right leading-none pt-1"
                  style={{ color: "rgba(212,175,55,0.25)", letterSpacing: "-0.05em", fontVariantNumeric: "tabular-nums" }}
                >
                  {step.number}
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-semibold text-lg mb-2"
                    style={{ color: "var(--foreground)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {step.description}
                  </p>
                  <div
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-xs"
                    style={{
                      backgroundColor: "rgba(20,20,20,0.06)",
                      color: "var(--foreground)",
                    }}
                  >
                    <Terminal size={11} style={{ color: "var(--primary)" }} />
                    {step.code}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Agent roster ──────────────────────────────────────────────────────────────

const AGENT_TYPES = [
  { name: "Orchestrator", role: "Coordination & briefings", color: "#D4AF37", active: true },
  { name: "Analyst", role: "Metrics & system health", color: "#60a5fa", active: true },
  { name: "Developer", role: "Code & CI/CD", color: "#4ade80", active: true },
  { name: "PA", role: "Email & calendar", color: "#c084fc", active: true },
  { name: "Content", role: "Social & community", color: "#f97316", active: false },
  { name: "Research", role: "Scraping & intel", color: "#2dd4bf", active: false },
];

function AgentRosterSection() {
  return (
    <section
      className="py-24 border-t"
      style={{ borderColor: "var(--border)", backgroundColor: "rgba(0,0,0,0.01)" }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-1.5 text-xs font-medium mb-4"
              style={{ color: "var(--primary)" }}
            >
              <Brain size={13} />
              <span>Agent topology</span>
            </div>
            <h2
              className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
              style={{ color: "var(--foreground)", letterSpacing: "-0.03em" }}
            >
              Specialist agents,
              <br />one orchestrator above
            </h2>
            <p
              className="text-lg max-w-xl mx-auto"
              style={{ color: "var(--muted-foreground)" }}
            >
              The orchestrator is the single point of contact. Every other agent is a specialist
              that receives tasks, executes them, and reports back.
            </p>
          </div>
        </FadeIn>

        {/* Orchestrator at top */}
        <FadeIn delay={0.1}>
          <div className="flex justify-center mb-4">
            <div
              className="relative px-8 py-4 rounded-2xl border-2 text-center min-w-[200px] shadow-sm"
              style={{
                borderColor: "var(--primary)",
                backgroundColor: "rgba(212,175,55,0.06)",
              }}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <StatusDot color="#D4AF37" />
                <span
                  className="font-bold text-lg"
                  style={{ color: "var(--foreground)" }}
                >
                  Orchestrator
                </span>
              </div>
              <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                Coordinates · Routes · Briefs
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Connector lines */}
        <FadeIn delay={0.15}>
          <div className="flex justify-center mb-4">
            <div
              className="w-px h-8"
              style={{ backgroundColor: "var(--border)" }}
            />
          </div>
          <div
            className="mx-auto mb-4"
            style={{
              height: "1px",
              maxWidth: "720px",
              backgroundColor: "var(--border)",
            }}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-2xl mx-auto mb-6">
            {AGENT_TYPES.filter((a) => a.name !== "Orchestrator").map((_, i, arr) => (
              <div key={i} className="flex justify-center">
                <div
                  className="w-px h-6"
                  style={{ backgroundColor: "var(--border)" }}
                />
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Specialist agents */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-2xl mx-auto">
          {AGENT_TYPES.filter((a) => a.name !== "Orchestrator").map((agent, i) => (
            <FadeIn key={i} delay={0.2 + i * 0.07}>
              <div
                className="p-4 rounded-xl border text-center transition-all duration-200 hover:shadow-sm"
                style={{
                  backgroundColor: "var(--card)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <StatusDot color={agent.active ? agent.color : "#9ca3af"} />
                  <span className="font-medium text-sm" style={{ color: "var(--foreground)" }}>
                    {agent.name}
                  </span>
                </div>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                  {agent.role}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Dashboard preview ────────────────────────────────────────────────────────

function DashboardSection() {
  return (
    <section
      className="py-24 border-t overflow-hidden"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <FadeIn direction="right" className="flex-1">
            <div
              className="inline-flex items-center gap-1.5 text-xs font-medium mb-4"
              style={{ color: "var(--primary)" }}
            >
              <LayoutDashboard size={13} />
              <span>Dashboard</span>
            </div>
            <h2
              className="text-4xl sm:text-5xl font-bold tracking-tight mb-6"
              style={{ color: "var(--foreground)", letterSpacing: "-0.03em" }}
            >
              Full visibility,
              <br />zero friction
            </h2>
            <p
              className="text-lg leading-relaxed mb-8"
              style={{ color: "var(--muted-foreground)" }}
            >
              The web dashboard shows every agent&apos;s heartbeat, task queue,
              memory state, and event log in real time. Approve actions without
              touching a terminal.
            </p>
            <ul className="space-y-3">
              {[
                "Live heartbeat for every agent",
                "Task queue with status tracking",
                "Approval inbox for external actions",
                "Activity feed with typed events",
                "Agent memory browser",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm" style={{ color: "var(--muted-foreground)" }}>
                  <Check size={14} style={{ color: "var(--primary)" }} className="shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn direction="left" delay={0.15} className="flex-1 w-full">
            {/* Mock dashboard UI */}
            <div
              className="rounded-2xl border overflow-hidden shadow-2xl"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--card)",
              }}
            >
              {/* Titlebar */}
              <div
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{ borderColor: "var(--border)", backgroundColor: "rgba(248,247,244,0.7)" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--primary)" }} />
                  <span className="text-xs font-medium" style={{ color: "var(--foreground)" }}>
                    Cortext Dashboard
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <StatusDot />
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    3 agents online
                  </span>
                </div>
              </div>

              {/* Agent rows */}
              <div className="p-4 space-y-2">
                {[
                  { name: "paul", role: "Orchestrator", status: "active", tasks: 4, color: "#D4AF37" },
                  { name: "sentinel", role: "Analyst", status: "active", tasks: 2, color: "#60a5fa" },
                  { name: "boris", role: "Developer", status: "idle", tasks: 0, color: "#4ade80" },
                ].map((agent, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl border"
                    style={{
                      borderColor: "var(--border)",
                      backgroundColor: "rgba(255,255,255,0.5)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <StatusDot color={agent.status === "active" ? agent.color : "#9ca3af"} />
                      <div>
                        <div className="font-medium text-sm" style={{ color: "var(--foreground)" }}>
                          {agent.name}
                        </div>
                        <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                          {agent.role}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div
                          className="text-xs font-medium"
                          style={{ color: agent.tasks > 0 ? "var(--foreground)" : "var(--muted-foreground)" }}
                        >
                          {agent.tasks} task{agent.tasks !== 1 ? "s" : ""}
                        </div>
                      </div>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          backgroundColor: agent.status === "active" ? "rgba(34,197,94,0.1)" : "rgba(0,0,0,0.05)",
                          color: agent.status === "active" ? "#16a34a" : "var(--muted-foreground)",
                        }}
                      >
                        {agent.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Activity strip */}
              <div
                className="px-4 pb-4 space-y-1.5 border-t pt-3"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="text-xs font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>
                  Recent activity
                </div>
                {[
                  { event: "task_completed", agent: "boris", detail: "PR merged to staging", time: "2m ago", color: "#4ade80" },
                  { event: "approval_needed", agent: "donna", detail: "Send email to client", time: "8m ago", color: "#f59e0b" },
                  { event: "session_start", agent: "sentinel", detail: "Metrics collection cycle", time: "15m ago", color: "#60a5fa" },
                ].map((event, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs" style={{ color: "var(--muted-foreground)" }}>
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: event.color }}
                    />
                    <span className="font-medium shrink-0" style={{ color: "var(--foreground)" }}>
                      {event.agent}
                    </span>
                    <span className="truncate">{event.detail}</span>
                    <span className="shrink-0 ml-auto">{event.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Telegram section ─────────────────────────────────────────────────────────

function TelegramSection() {
  const messages = [
    { from: "james", text: "Draft a competitive analysis report on our top 3 rivals", time: "09:14" },
    { from: "paul", text: "On it. Routing to data agent for research. Task created: comp-analysis-march.", time: "09:14" },
    { from: "paul", text: "Research complete. Routing to analyst for synthesis. ETA 20 minutes.", time: "09:22" },
    { from: "paul", text: "Done. Full report in /knowledge-base/competitors-mar31.md — 3 key findings flagged. Want me to draft a strategic response?", time: "09:44" },
  ];

  return (
    <section
      className="py-24 border-t"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
          <FadeIn direction="left" className="flex-1">
            <div
              className="inline-flex items-center gap-1.5 text-xs font-medium mb-4"
              style={{ color: "var(--primary)" }}
            >
              <MessageCircle size={13} />
              <span>Telegram control</span>
            </div>
            <h2
              className="text-4xl sm:text-5xl font-bold tracking-tight mb-6"
              style={{ color: "var(--foreground)", letterSpacing: "-0.03em" }}
            >
              Your agents,
              <br />in your pocket
            </h2>
            <p
              className="text-lg leading-relaxed mb-8"
              style={{ color: "var(--muted-foreground)" }}
            >
              Message your orchestrator on Telegram. It routes work to the right
              agents, handles coordination, and reports back with results.
              Morning briefings, evening summaries, and instant alerts — all
              delivered without you asking.
            </p>
            <ul className="space-y-3">
              {[
                "Real-time directives to orchestrator",
                "Morning and evening briefings",
                "Approval requests with one-tap decisions",
                "Instant alerts on blockers or completions",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm" style={{ color: "var(--muted-foreground)" }}>
                  <Check size={14} style={{ color: "var(--primary)" }} className="shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn direction="right" delay={0.15} className="flex-1 w-full max-w-sm mx-auto lg:mx-0">
            {/* Phone mockup */}
            <div
              className="rounded-[2.5rem] border-4 overflow-hidden shadow-2xl"
              style={{ borderColor: "rgba(0,0,0,0.12)", backgroundColor: "#f2f2f7" }}
            >
              {/* Status bar */}
              <div className="bg-white px-5 pt-3 pb-2 flex items-center justify-between">
                <span className="text-xs font-semibold">9:41</span>
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-24 h-5 rounded-full"
                  style={{ backgroundColor: "#000" }}
                />
                <div className="flex gap-1 items-center">
                  <div className="flex gap-0.5">
                    {[3, 4, 5].map((h) => (
                      <div key={h} className="w-0.5 rounded-sm bg-black" style={{ height: h }} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Chat header */}
              <div className="bg-white px-4 py-3 border-b flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
                >
                  C
                </div>
                <div>
                  <div className="font-semibold text-sm">Cortext</div>
                  <div className="text-xs text-green-500">● online</div>
                </div>
              </div>

              {/* Messages */}
              <div className="px-3 py-3 space-y-2 bg-white min-h-[280px]">
                {messages.map((msg, i) => (
                  <FadeIn key={i} delay={0.3 + i * 0.1}>
                    <div
                      className={`flex ${msg.from === "james" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className="max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed"
                        style={{
                          backgroundColor: msg.from === "james" ? "#007aff" : "#e9e9eb",
                          color: msg.from === "james" ? "white" : "#000",
                          borderRadius:
                            msg.from === "james"
                              ? "18px 18px 4px 18px"
                              : "18px 18px 18px 4px",
                        }}
                      >
                        {msg.text}
                        <div
                          className="text-right mt-1 opacity-60"
                          style={{ fontSize: "10px" }}
                        >
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section
      className="py-24 border-t"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          <div
            className="inline-flex items-center gap-1.5 text-xs font-medium mb-6"
            style={{ color: "var(--primary)" }}
          >
            <Star size={12} />
            <span>Open source · free to self-host</span>
          </div>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
            style={{ color: "var(--foreground)", letterSpacing: "-0.03em" }}
          >
            Your agents are ready.
            <br />
            <span style={{ color: "var(--primary)" }}>Are you?</span>
          </h2>
          <p
            className="text-lg max-w-xl mx-auto mb-10"
            style={{ color: "var(--muted-foreground)" }}
          >
            Cortext is free and open source. Self-host in minutes. Run as many
            agents as you need. No per-seat pricing, no vendor lock-in.
          </p>

          {/* Final install block */}
          <div
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border font-mono text-sm mb-8"
            style={{
              backgroundColor: "rgba(20,20,20,0.06)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          >
            <span style={{ color: "var(--primary)" }}>$</span>
            <span>npx cortext init</span>
            <CopyButton text="npx cortext init" />
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://github.com/grandamenium/cortextos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              <Github size={16} />
              Star on GitHub
            </a>
            <a
              href="https://github.com/grandamenium/cortextos/blob/main/README.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium border transition-all duration-200 hover:opacity-80 hover:-translate-y-0.5 active:scale-95"
              style={{
                borderColor: "var(--border)",
                color: "var(--foreground)",
                backgroundColor: "var(--card)",
              }}
            >
              Read the docs
              <ArrowRight size={14} />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      className="border-t py-12"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div
              className="font-bold text-lg mb-1 tracking-tight"
              style={{ color: "var(--foreground)", letterSpacing: "-0.03em" }}
            >
              Cortext
            </div>
            <div className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              The intelligence layer above your agents.
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm" style={{ color: "var(--muted-foreground)" }}>
            <a
              href="https://github.com/grandamenium/cortextos"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
            >
              <Github size={14} />
              GitHub
            </a>
            <a
              href="https://github.com/grandamenium/cortextos/blob/main/README.md"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              Docs
            </a>
            <a
              href="https://github.com/grandamenium/cortextos/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              Issues
            </a>
          </div>
        </div>

        <div
          className="mt-8 pt-6 border-t text-center text-xs"
          style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
        >
          © {new Date().getFullYear()} Cortext. Open source under MIT license.
          Built with Claude.
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <main style={{ backgroundColor: "var(--background)" }}>
      <NavBar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <AgentRosterSection />
      <DashboardSection />
      <TelegramSection />
      <CTASection />
      <Footer />
    </main>
  );
}
