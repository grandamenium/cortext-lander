"use client";

import {
  RefreshCw,
  GitBranch,
  MessageCircle,
  LayoutDashboard,
  Github,
  Shield,
  Bell,
  Brain,
  Clock,
  CheckCircle2,
  Layers,
  Smartphone,
} from "lucide-react";

// ─── NavBar ──────────────────────────────────────────────────────────────────

function NavBar() {
  return (
    <nav
      style={{
        backgroundColor: "rgba(248,247,244,0.96)",
        borderBottom: "1px solid var(--border)",
      }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <span
          style={{ color: "var(--foreground)", letterSpacing: "-0.02em" }}
          className="font-bold text-lg"
        >
          Cortext
        </span>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/grandamenium/cortextos"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--muted-foreground)" }}
            className="text-sm flex items-center gap-1.5 hover:opacity-70 transition-opacity"
          >
            <Github size={15} />
            GitHub
          </a>
          <a
            href="https://github.com/grandamenium/cortextos"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "var(--foreground)",
              color: "var(--background)",
            }}
            className="text-sm font-medium px-4 py-1.5 rounded-md hover:opacity-85 transition-opacity"
          >
            Get started
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── AgentFleetVisual ─────────────────────────────────────────────────────────

type AgentCardProps = {
  name: string;
  role: string;
  status: "online" | "working" | "idle";
  task?: string;
  taskCount: number;
};

function AgentCard({ name, role, status, task, taskCount }: AgentCardProps) {
  const statusColor =
    status === "online"
      ? "var(--success)"
      : status === "working"
      ? "var(--primary)"
      : "var(--muted-foreground)";

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "14px 16px",
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <div
            className="flex items-center gap-2 mb-0.5"
          >
            <span
              className="animate-pulse-dot inline-block w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: statusColor }}
            />
            <span
              className="font-semibold text-sm"
              style={{ color: "var(--foreground)" }}
            >
              {name}
            </span>
          </div>
          <span
            className="text-xs"
            style={{ color: "var(--muted-foreground)", paddingLeft: "16px" }}
          >
            {role}
          </span>
        </div>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: "rgba(212,175,55,0.12)",
            color: "#B8860B",
            fontFamily: "var(--font-mono)",
          }}
        >
          {taskCount} tasks
        </span>
      </div>
      {task && (
        <div
          className="text-xs mt-2 pt-2"
          style={{
            borderTop: "1px solid var(--border)",
            color: "var(--muted-foreground)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {task}
        </div>
      )}
    </div>
  );
}

function AgentFleetVisual() {
  return (
    <div
      style={{
        backgroundColor: "var(--background)",
        border: "1px solid var(--border)",
        borderRadius: "calc(var(--radius-lg) * 1.5)",
        overflow: "hidden",
        boxShadow:
          "0 4px 6px -1px rgba(0,0,0,0.04), 0 2px 4px -2px rgba(0,0,0,0.04)",
      }}
      className="w-full max-w-3xl mx-auto mt-12"
    >
      {/* Dashboard top bar */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid var(--border)",
        }}
        className="flex items-center justify-between px-5 py-3"
      >
        <div className="flex items-center gap-3">
          <span
            className="font-semibold text-sm"
            style={{ color: "var(--foreground)" }}
          >
            Cortext
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded"
            style={{
              backgroundColor: "rgba(22,163,74,0.1)",
              color: "var(--success)",
              fontFamily: "var(--font-mono)",
            }}
          >
            6 agents online
          </span>
        </div>
        <div className="flex items-center gap-4">
          {[
            { label: "Tasks today", value: "24" },
            { label: "Completed", value: "19" },
            { label: "Pending", value: "3" },
          ].map((m) => (
            <div key={m.label} className="text-center hidden sm:block">
              <div
                className="text-sm font-bold"
                style={{
                  color: "var(--foreground)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {m.value}
              </div>
              <div
                className="text-xs"
                style={{ color: "var(--muted-foreground)" }}
              >
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agent grid */}
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <AgentCard
          name="paul"
          role="Orchestrator"
          status="working"
          task="Coordinating launch sprint..."
          taskCount={7}
        />
        <AgentCard
          name="boris"
          role="Developer"
          status="working"
          task="Building TestFlight release..."
          taskCount={5}
        />
        <AgentCard
          name="donna"
          role="Personal Assistant"
          status="online"
          task="Inbox processed, 3 replies staged"
          taskCount={3}
        />
        <AgentCard
          name="nick"
          role="Content Creator"
          status="online"
          task="3 scripts ready for approval"
          taskCount={4}
        />
        <AgentCard
          name="data"
          role="Research"
          status="online"
          task="Monitoring competitor activity"
          taskCount={2}
        />
        <AgentCard
          name="sentinel"
          role="System Health"
          status="working"
          task="Collecting metrics report..."
          taskCount={3}
        />
      </div>

      {/* Footer strip */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          backgroundColor: "#FFFFFF",
        }}
        className="px-5 py-2.5 flex items-center justify-between"
      >
        <span
          className="text-xs"
          style={{
            color: "var(--muted-foreground)",
            fontFamily: "var(--font-mono)",
          }}
        >
          Last heartbeat: 42s ago
        </span>
        <span
          className="text-xs flex items-center gap-1.5"
          style={{ color: "#B8860B" }}
        >
          <span
            className="animate-pulse-dot inline-block w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "#B8860B" }}
          />
          Morning briefing sent to Telegram
        </span>
      </div>
    </div>
  );
}

// ─── HeroSection ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      style={{
        paddingTop: "120px",
        paddingBottom: "80px",
        backgroundColor: "var(--background)",
      }}
      className="text-center px-6"
    >
      {/* Badge */}
      <div className="inline-flex items-center gap-2 mb-6">
        <span
          style={{
            backgroundColor: "rgba(212,175,55,0.12)",
            border: "1px solid rgba(212,175,55,0.35)",
            color: "#B8860B",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
          }}
          className="px-3 py-1 rounded-full"
        >
          Open source · Claude Code agents
        </span>
      </div>

      {/* Headline */}
      <h1
        className="text-4xl md:text-6xl font-bold leading-tight mb-6"
        style={{
          color: "var(--foreground)",
          letterSpacing: "-0.03em",
        }}
      >
        The intelligence layer{" "}
        <br className="hidden sm:block" />
        <span style={{ color: "var(--primary)" }}>above your agents.</span>
      </h1>

      {/* Subheadline */}
      <p
        className="text-lg md:text-xl max-w-2xl mx-auto mb-10"
        style={{ color: "var(--muted-foreground)", lineHeight: "1.7" }}
      >
        Cortext keeps Claude Code agents alive, coordinated, and reachable.
        Persistence, multi-agent orchestration, Telegram control, and a full
        dashboard — all wired up and ready to run.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
        <a
          href="https://github.com/grandamenium/cortextos"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: "var(--foreground)",
            color: "var(--background)",
          }}
          className="flex items-center gap-2.5 px-6 py-3 rounded-md font-semibold text-sm hover:opacity-85 transition-opacity"
        >
          <Github size={16} />
          View on GitHub
        </a>
        <a
          href="https://github.com/grandamenium/cortextos"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: "rgba(212,175,55,0.12)",
            border: "1px solid rgba(212,175,55,0.4)",
            color: "#B8860B",
          }}
          className="flex items-center gap-2.5 px-6 py-3 rounded-md font-medium text-sm hover:opacity-85 transition-opacity"
        >
          <code
            style={{ fontFamily: "var(--font-mono)", fontSize: "12px" }}
          >
            npm install cortextos
          </code>
        </a>
      </div>

      {/* Agent fleet visual */}
      <AgentFleetVisual />
    </section>
  );
}

// ─── ProblemBanner ───────────────────────────────────────────────────────────

function ProblemBanner() {
  return (
    <section
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        backgroundColor: "#FFFFFF",
      }}
      className="py-12 px-6 text-center"
    >
      <p
        className="text-xl md:text-2xl font-medium max-w-3xl mx-auto"
        style={{ color: "var(--muted-foreground)", lineHeight: "1.7" }}
      >
        Claude Code is powerful.{" "}
        <span style={{ color: "var(--foreground)" }}>
          Keeping it running 24/7, coordinated across agents, and reachable from
          anywhere takes months to build.
        </span>{" "}
        We built it once.
      </p>
    </section>
  );
}

// ─── FeaturesSection ─────────────────────────────────────────────────────────

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
      }}
      className="p-6 hover:border-amber-300 transition-colors"
    >
      <div
        style={{
          color: "#B8860B",
          backgroundColor: "rgba(212,175,55,0.10)",
          border: "1px solid rgba(212,175,55,0.25)",
          borderRadius: "var(--radius-md)",
        }}
        className="inline-flex p-2.5 mb-4"
      >
        {icon}
      </div>
      <h3
        className="text-base font-semibold mb-2"
        style={{ color: "var(--foreground)" }}
      >
        {title}
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ color: "var(--muted-foreground)" }}
      >
        {description}
      </p>
    </div>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: <RefreshCw size={19} />,
      title: "Always-on persistence",
      description:
        "Agents survive crashes, context exhaustion, and machine restarts. Auto-restart via launchd, session continuation via tmux, and heartbeat monitoring keep every agent alive.",
    },
    {
      icon: <GitBranch size={19} />,
      title: "Multi-agent orchestration",
      description:
        "An orchestrator agent decomposes goals and delegates to specialists. Agents block on dependencies, surface approvals, and resume automatically — no wiring required.",
    },
    {
      icon: <MessageCircle size={19} />,
      title: "Telegram control",
      description:
        "Every agent gets its own Telegram bot. Send tasks, receive briefings, approve or reject actions inline — all in a chat that's always in your pocket.",
    },
    {
      icon: <LayoutDashboard size={19} />,
      title: "Full-featured dashboard",
      description:
        "A Next.js dashboard ships with the framework. Tasks, approvals, activity feed, agent health, knowledge base, analytics — ready to run with one command.",
    },
    {
      icon: <Smartphone size={19} />,
      title: "iOS mobile app",
      description:
        "Native iOS app for on-the-go access. Monitor agent health, review task queues, process approvals, and read briefings from anywhere.",
    },
    {
      icon: <Brain size={19} />,
      title: "Long-term memory",
      description:
        "Each agent maintains both daily session memory and persistent long-term memory. Sessions continue exactly where they left off — context is never lost.",
    },
    {
      icon: <Bell size={19} />,
      title: "Approval gates",
      description:
        "Agents ask before acting. Emails, deploys, posts, and financial actions are staged for your approval. One tap in Telegram to approve or reject.",
    },
    {
      icon: <Clock size={19} />,
      title: "Automated briefings",
      description:
        "Morning and evening briefings pushed to Telegram automatically. What got done overnight, what needs attention today, what's pending approval.",
    },
    {
      icon: <CheckCircle2 size={19} />,
      title: "Task management built in",
      description:
        "Full task lifecycle tracking with priorities, statuses, and blockers. Every piece of work is visible on the dashboard with zero configuration.",
    },
    {
      icon: <Layers size={19} />,
      title: "Agent specialization",
      description:
        "Ship agents pre-configured for specific roles: developer, analyst, personal assistant, content creator, researcher. Each has domain-specific tools and goals baked in.",
    },
  ];

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{
            color: "var(--foreground)",
            letterSpacing: "-0.02em",
          }}
        >
          Everything you&apos;d build. Already built.
        </h2>
        <p className="text-base" style={{ color: "var(--muted-foreground)" }}>
          The infrastructure layer so you can focus on what your agents
          actually do.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f) => (
          <FeatureCard
            key={f.title}
            icon={f.icon}
            title={f.title}
            description={f.description}
          />
        ))}
      </div>
    </section>
  );
}

// ─── ArchitectureSection ──────────────────────────────────────────────────────

function ArchitectureSection() {
  return (
    <section
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        backgroundColor: "#FFFFFF",
      }}
      className="py-20 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{
              color: "var(--foreground)",
              letterSpacing: "-0.02em",
            }}
          >
            How it works
          </h2>
          <p className="text-base" style={{ color: "var(--muted-foreground)" }}>
            One orchestrator. Many specialists. One bus.
          </p>
        </div>

        {/* Architecture diagram */}
        <div className="space-y-3">
          {/* You / Telegram row */}
          <div className="flex justify-center">
            <div
              style={{
                backgroundColor: "var(--background)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--muted-foreground)",
              }}
            >
              You · Telegram · Dashboard · Mobile app
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <div
              style={{
                width: "1px",
                height: "24px",
                backgroundColor: "var(--border)",
              }}
            />
          </div>

          {/* Orchestrator */}
          <div className="flex justify-center">
            <div
              style={{
                backgroundColor: "rgba(212,175,55,0.1)",
                border: "2px solid var(--primary)",
                borderRadius: "var(--radius-lg)",
                padding: "14px 32px",
                fontSize: "14px",
                fontWeight: 700,
                color: "#B8860B",
                textAlign: "center",
              }}
            >
              <div>Orchestrator agent</div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 400,
                  color: "var(--muted-foreground)",
                  fontFamily: "var(--font-mono)",
                  marginTop: "3px",
                }}
              >
                decomposes goals · delegates · monitors · briefs you
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <div
              style={{
                width: "1px",
                height: "24px",
                backgroundColor: "var(--border)",
              }}
            />
          </div>

          {/* Bus */}
          <div className="flex justify-center">
            <div
              style={{
                backgroundColor: "rgba(22,163,74,0.06)",
                border: "1px dashed rgba(22,163,74,0.4)",
                borderRadius: "var(--radius-lg)",
                padding: "8px 24px",
                fontSize: "12px",
                color: "var(--success)",
                fontFamily: "var(--font-mono)",
              }}
            >
              message bus · inbox · task queue · event log
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <div
              style={{
                width: "1px",
                height: "24px",
                backgroundColor: "var(--border)",
              }}
            />
          </div>

          {/* Specialist agents row */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { name: "Developer", sub: "code · deploys" },
              { name: "Analyst", sub: "metrics · health" },
              { name: "Assistant", sub: "email · calendar" },
              { name: "Researcher", sub: "scraping · intel" },
              { name: "Creator", sub: "content · scripts" },
            ].map((agent) => (
              <div
                key={agent.name}
                style={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                <div
                  className="flex items-center justify-center gap-1.5 mb-1"
                >
                  <span
                    className="animate-pulse-dot inline-block w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: "var(--success)" }}
                  />
                  <span
                    className="font-semibold"
                    style={{ fontSize: "12px", color: "var(--foreground)" }}
                  >
                    {agent.name}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "var(--muted-foreground)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {agent.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── HowItWorksSection ───────────────────────────────────────────────────────

function HowItWorksSection() {
  const steps = [
    {
      step: 1,
      title: "Install and configure",
      description:
        "Clone the repo, run the interactive setup, and create your organization. Takes about 10 minutes. Your agents get names, roles, and Telegram bots.",
    },
    {
      step: 2,
      title: "Agents come online",
      description:
        "Each agent boots in its own tmux session, reads its identity and goals, sets up its cron schedule, and messages you on Telegram when ready.",
    },
    {
      step: 3,
      title: "Work from anywhere",
      description:
        "Send tasks by message. Get briefings pushed to you. Approve or reject actions inline. View everything on the dashboard or mobile app.",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "var(--foreground)", letterSpacing: "-0.02em" }}
          >
            Up in 10 minutes
          </h2>
          <p className="text-base" style={{ color: "var(--muted-foreground)" }}>
            From zero to a running agent fleet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={s.step} className="relative">
              {/* Connector */}
              {i < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-6 left-1/2 w-full h-px"
                  style={{
                    background:
                      "repeating-linear-gradient(90deg, var(--border) 0, var(--border) 6px, transparent 6px, transparent 12px)",
                    transform: "translateX(50%)",
                  }}
                />
              )}

              <div className="flex flex-col items-center text-center">
                <div
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)",
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "700",
                    fontSize: "18px",
                    position: "relative",
                    zIndex: 1,
                    flexShrink: 0,
                  }}
                  className="mb-5"
                >
                  {s.step}
                </div>
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{ color: "var(--foreground)" }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── QuickStartSection ───────────────────────────────────────────────────────

const quickStartLines = [
  { type: "comment", text: "# Clone and install" },
  { type: "cmd", text: "git clone https://github.com/grandamenium/cortextos" },
  { type: "cmd", text: "cd cortextos && npm install" },
  { type: "blank" },
  { type: "comment", text: "# Interactive setup — creates your org, agents, and Telegram bots" },
  { type: "cmd", text: 'claude -p "/cortextos-setup"' },
  { type: "blank" },
  { type: "comment", text: "# Enable your first agent" },
  { type: "cmd", text: "bash enable-agent.sh orchestrator" },
  { type: "blank" },
  { type: "comment", text: "# Launch the dashboard" },
  { type: "cmd", text: "cd dashboard && npm run build && npm start" },
  { type: "blank" },
  { type: "comment", text: "# Your agent will message you on Telegram — you're live" },
];

function QuickStartSection() {
  return (
    <section
      style={{ borderTop: "1px solid var(--border)" }}
      className="py-20 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "var(--foreground)", letterSpacing: "-0.02em" }}
          >
            Quick start
          </h2>
          <p className="text-base" style={{ color: "var(--muted-foreground)" }}>
            The exact commands to go from zero to running.
          </p>
        </div>

        <div
          style={{
            backgroundColor: "oklch(0.11 0 0)",
            border: "1px solid oklch(0.27 0 0)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              backgroundColor: "oklch(0.15 0 0)",
              borderBottom: "1px solid oklch(0.22 0 0)",
            }}
            className="flex items-center gap-2 px-4 py-2.5"
          >
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "oklch(0.55 0.2 27)" }} />
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "oklch(0.72 0.18 75)" }} />
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "oklch(0.55 0.18 145)" }} />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                color: "oklch(0.55 0 0)",
                fontSize: "12px",
                marginLeft: "8px",
              }}
            >
              bash
            </span>
          </div>

          <pre
            style={{
              padding: "24px",
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              lineHeight: "1.85",
              overflowX: "auto",
            }}
          >
            {quickStartLines.map((line, i) => {
              if (line.type === "blank") {
                return <div key={i}>&nbsp;</div>;
              }
              if (line.type === "comment") {
                return (
                  <div key={i} style={{ color: "oklch(0.5 0 0)" }}>
                    {line.text}
                  </div>
                );
              }
              return (
                <div key={i}>
                  <span style={{ color: "var(--success)", userSelect: "none" }}>
                    ${" "}
                  </span>
                  <span style={{ color: "#F8F7F4" }}>{line.text}</span>
                </div>
              );
            })}
          </pre>
        </div>
      </div>
    </section>
  );
}

// ─── ComparisonTable ─────────────────────────────────────────────────────────

function ComparisonTable() {
  const rows = [
    {
      feature: "Agent persistence",
      cortext: "Built in (launchd + tmux)",
      diy: "You build it",
      others: "Usually not included",
    },
    {
      feature: "Multi-agent orchestration",
      cortext: "Built in (bus, inbox, blocking)",
      diy: "You wire it",
      others: "Rarely full-stack",
    },
    {
      feature: "Web dashboard",
      cortext: "Included — Next.js, full-featured",
      diy: "You build it",
      others: "Usually not included",
    },
    {
      feature: "Mobile app",
      cortext: "iOS app (App Store)",
      diy: "You build it",
      others: "No",
    },
    {
      feature: "Telegram control",
      cortext: "Per-agent bots, push, callbacks",
      diy: "You build it",
      others: "No",
    },
    {
      feature: "Memory system",
      cortext: "Short-term + long-term, per agent",
      diy: "You build it",
      others: "Varies",
    },
    {
      feature: "Approval gates",
      cortext: "Built in — blocks before external actions",
      diy: "You build it",
      others: "Rarely",
    },
    {
      feature: "Security audit",
      cortext: "45 CVEs identified and fixed",
      diy: "Your responsibility",
      others: "Unknown",
    },
    {
      feature: "Time to first agent",
      cortext: "~10 minutes",
      diy: "Weeks",
      others: "Hours to days",
    },
  ];

  return (
    <section
      style={{ borderTop: "1px solid var(--border)", backgroundColor: "#FFFFFF" }}
      className="py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "var(--foreground)", letterSpacing: "-0.02em" }}
          >
            Why Cortext?
          </h2>
          <p className="text-base" style={{ color: "var(--muted-foreground)" }}>
            The build-vs-buy math, laid out honestly.
          </p>
        </div>

        <div className="table-scroll">
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "13px",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border)" }}>
                <th
                  style={{
                    color: "var(--muted-foreground)",
                    textAlign: "left",
                    padding: "10px 16px",
                    fontWeight: 500,
                    minWidth: "180px",
                  }}
                >
                  Feature
                </th>
                <th
                  style={{
                    color: "var(--primary)",
                    textAlign: "left",
                    padding: "10px 16px",
                    fontWeight: 700,
                    minWidth: "220px",
                  }}
                >
                  Cortext
                </th>
                <th
                  style={{
                    color: "var(--muted-foreground)",
                    textAlign: "left",
                    padding: "10px 16px",
                    fontWeight: 500,
                    minWidth: "180px",
                  }}
                >
                  Roll your own
                </th>
                <th
                  style={{
                    color: "var(--muted-foreground)",
                    textAlign: "left",
                    padding: "10px 16px",
                    fontWeight: 500,
                    minWidth: "200px",
                  }}
                >
                  Other frameworks
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.feature}
                  style={{
                    borderBottom: "1px solid var(--border)",
                    backgroundColor:
                      i % 2 === 0 ? "transparent" : "rgba(229,224,216,0.3)",
                  }}
                >
                  <td
                    style={{
                      padding: "11px 16px",
                      color: "var(--foreground)",
                      fontWeight: 500,
                    }}
                  >
                    {row.feature}
                  </td>
                  <td
                    style={{
                      padding: "11px 16px",
                      color: "#B8860B",
                      fontWeight: 500,
                    }}
                  >
                    {row.cortext}
                  </td>
                  <td
                    style={{
                      padding: "11px 16px",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {row.diy}
                  </td>
                  <td
                    style={{
                      padding: "11px 16px",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {row.others}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── SecuritySection ─────────────────────────────────────────────────────────

function SecuritySection() {
  return (
    <section
      style={{ borderTop: "1px solid var(--border)" }}
      className="py-20 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid var(--border)",
            borderLeft: "3px solid var(--primary)",
            borderRadius: "var(--radius-lg)",
          }}
          className="p-8"
        >
          <div className="flex items-start gap-4">
            <div
              style={{
                color: "#B8860B",
                backgroundColor: "rgba(212,175,55,0.10)",
                border: "1px solid rgba(212,175,55,0.25)",
                borderRadius: "var(--radius-md)",
                flexShrink: 0,
              }}
              className="p-2.5 mt-0.5"
            >
              <Shield size={22} />
            </div>

            <div className="flex-1">
              <h2
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{
                  color: "var(--foreground)",
                  letterSpacing: "-0.02em",
                }}
              >
                We audited ourselves before you had to.
              </h2>

              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "var(--muted-foreground)" }}
              >
                A full security audit completed on 2026-03-31 found 45
                vulnerabilities across the bash layer, agent lifecycle
                management, Telegram integration, and the Node.js dashboard
                API. All four Critical findings are remediated. The audit
                covered command injection, JWT verification failures, secrets
                management, and inter-agent isolation.
              </p>

              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "var(--muted-foreground)" }}
              >
                The findings and all remediation PRs are public on GitHub.
                Shipping a security report alongside an AI infrastructure
                framework is not optional — so we did it on day one.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Vulnerabilities found", value: "45" },
                  { label: "Critical — all fixed", value: "4" },
                  { label: "High — 12 fixed", value: "16" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div
                      className="text-2xl font-bold mb-0.5"
                      style={{
                        color: "#B8860B",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://github.com/grandamenium/cortextos"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#B8860B",
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                }}
                className="inline-flex items-center gap-1.5 hover:underline"
              >
                View security report on GitHub →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTASection ───────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section
      style={{
        borderTop: "1px solid var(--border)",
        backgroundColor: "var(--foreground)",
      }}
      className="py-20 px-6 text-center"
    >
      <div className="max-w-2xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: "var(--background)", letterSpacing: "-0.02em" }}
        >
          Start building today.
        </h2>
        <p
          className="text-base mb-10"
          style={{ color: "rgba(248,247,244,0.65)" }}
        >
          Cortext is open source. Clone it, run setup, and have a full agent
          fleet running in under 10 minutes.
        </p>

        <div
          style={{
            backgroundColor: "oklch(0.17 0 0)",
            border: "1px solid oklch(0.28 0 0)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            textAlign: "left",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              borderBottom: "1px solid oklch(0.24 0 0)",
              backgroundColor: "oklch(0.14 0 0)",
            }}
            className="px-4 py-2"
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                color: "oklch(0.5 0 0)",
                fontSize: "11px",
              }}
            >
              bash
            </span>
          </div>
          <pre
            style={{
              padding: "20px",
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              lineHeight: "1.85",
              overflowX: "auto",
            }}
          >
            {[
              "git clone https://github.com/grandamenium/cortextos",
              "cd cortextos && npm install",
              'claude -p "/cortextos-setup"',
            ].map((line, i) => (
              <div key={i}>
                <span
                  style={{ color: "var(--success)", userSelect: "none" }}
                >
                  ${" "}
                </span>
                <span style={{ color: "#F8F7F4" }}>{line}</span>
              </div>
            ))}
          </pre>
        </div>

        <div className="flex items-center justify-center gap-6">
          <a
            href="https://github.com/grandamenium/cortextos"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#F8F7F4" }}
            className="flex items-center gap-1.5 text-sm font-medium hover:underline"
          >
            <Github size={15} />
            GitHub →
          </a>
          <a
            href="https://github.com/grandamenium/cortextos/blob/main/README.md"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "rgba(248,247,244,0.55)" }}
            className="text-sm hover:text-white transition-colors"
          >
            Read the docs →
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      style={{ borderTop: "1px solid var(--border)" }}
      className="py-6 px-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span
          style={{ color: "var(--foreground)", fontSize: "14px", fontWeight: 700 }}
        >
          Cortext
        </span>
        <span style={{ color: "var(--muted-foreground)", fontSize: "12px" }}>
          Open source · MIT License · Built for Claude Code agents
        </span>
        <a
          href="https://github.com/grandamenium/cortextos"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--muted-foreground)", fontSize: "12px" }}
          className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
        >
          <Github size={13} />
          grandamenium/cortextos
        </a>
      </div>
    </footer>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <>
      <NavBar />
      <main>
        <HeroSection />
        <ProblemBanner />
        <FeaturesSection />
        <ArchitectureSection />
        <HowItWorksSection />
        <QuickStartSection />
        <ComparisonTable />
        <SecuritySection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
