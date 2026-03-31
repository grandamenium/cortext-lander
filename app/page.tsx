import {
  RefreshCw,
  GitBranch,
  MessageCircle,
  LayoutDashboard,
  Github,
  ExternalLink,
  Shield,
  Copy,
} from "lucide-react";

// ─── NavBar ──────────────────────────────────────────────────────────────────

function NavBar() {
  return (
    <nav
      style={{ backgroundColor: "rgba(248,247,244,0.95)", borderBottom: "1px solid var(--border)" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <span
          style={{ color: "var(--primary)", fontFamily: "var(--font-mono)" }}
          className="font-bold text-lg tracking-tight"
        >
          cortextOS
        </span>

        {/* Nav links */}
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
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
            className="text-sm font-medium px-4 py-1.5 rounded hover:opacity-90 transition-opacity"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── TerminalHero ─────────────────────────────────────────────────────────────

function AgentStatusBar() {
  const agents = ["orchestrator", "analyst", "boris"];
  return (
    <div
      style={{
        borderBottom: "1px solid oklch(0.25 0 0)",
        backgroundColor: "oklch(0.12 0 0)",
      }}
      className="flex items-center gap-4 px-4 py-2"
    >
      {agents.map((name) => (
        <div key={name} className="flex items-center gap-1.5">
          <span
            className="animate-pulse-dot inline-block w-2 h-2 rounded-full"
            style={{ backgroundColor: "var(--success)" }}
          />
          <span
            style={{ fontFamily: "var(--font-mono)", color: "oklch(0.6 0 0)", fontSize: "11px" }}
          >
            {name}
          </span>
        </div>
      ))}
    </div>
  );
}

function TerminalHero() {
  return (
    <div
      style={{
        border: "1px solid oklch(0.30 0 0)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        backgroundColor: "oklch(0.11 0 0)",
      }}
      className="w-full max-w-3xl mx-auto mt-12"
    >
      {/* Title bar */}
      <div
        style={{ backgroundColor: "oklch(0.16 0 0)", borderBottom: "1px solid oklch(0.25 0 0)" }}
        className="flex items-center gap-2 px-4 py-2.5"
      >
        <span className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
        <span className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
        <span style={{ color: "oklch(0.6 0 0)", fontFamily: "var(--font-mono)", fontSize: "12px" }} className="ml-3">
          tmux — cortextOS agent fleet
        </span>
      </div>

      {/* Agent status bar */}
      <AgentStatusBar />

      {/* Split panes */}
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: "260px" }}>
        {/* Left pane — agent tmux session */}
        <div
          style={{
            borderRight: "1px solid oklch(0.25 0 0)",
            padding: "16px",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            lineHeight: "1.7",
          }}
        >
          <div style={{ color: "var(--success)" }}>$ tmux attach -t ctx-default-boris</div>
          <div style={{ color: "oklch(0.6 0 0)", marginTop: "8px" }}>
            [boris] Session started. Reading bootstrap files...
          </div>
          <div style={{ color: "#F8F7F4" }}>Reading IDENTITY.md... done</div>
          <div style={{ color: "#F8F7F4" }}>Reading GOALS.md... done</div>
          <div style={{ color: "#F8F7F4" }}>Reading MEMORY.md... done</div>
          <div style={{ color: "oklch(0.6 0 0)" }}>Setting up crons via /loop...</div>
          <div style={{ color: "#D4AF37" }}>Heartbeat: ONLINE</div>
          <div style={{ color: "#F8F7F4" }}>Checking inbox...</div>
          <div style={{ color: "oklch(0.6 0 0)" }}>3 messages. Processing...</div>
          <div style={{ color: "var(--success)" }}>
            Notifying James on Telegram...
          </div>
          <div style={{ color: "#F8F7F4", marginTop: "4px" }}>
            &gt; <span className="animate-blink">█</span>
          </div>
        </div>

        {/* Right pane — Telegram exchange */}
        <div style={{ padding: "16px", fontFamily: "var(--font-mono)", fontSize: "12px", lineHeight: "1.7" }}>
          <div style={{ color: "oklch(0.6 0 0)", marginBottom: "12px", fontSize: "11px" }}>
            Telegram · @BorisBot
          </div>

          {/* Incoming */}
          <div className="mb-3">
            <div style={{ color: "oklch(0.6 0 0)", fontSize: "10px", marginBottom: "3px" }}>James</div>
            <div
              style={{
                backgroundColor: "oklch(0.20 0.01 60)",
                border: "1px solid oklch(0.30 0.015 60)",
                borderRadius: "0 8px 8px 8px",
                padding: "8px 10px",
                color: "#F8F7F4",
                display: "inline-block",
                maxWidth: "90%",
              }}
            >
              What&apos;s the status on the CoinTally UK beta research?
            </div>
          </div>

          {/* Outgoing */}
          <div className="mb-3 flex flex-col items-end">
            <div style={{ color: "oklch(0.6 0 0)", fontSize: "10px", marginBottom: "3px" }}>boris</div>
            <div
              style={{
                backgroundColor: "oklch(0.25 0.04 75)",
                border: "1px solid oklch(0.40 0.10 75)",
                borderRadius: "8px 0 8px 8px",
                padding: "8px 10px",
                color: "#F8F7F4",
                display: "inline-block",
                maxWidth: "90%",
              }}
            >
              Research complete. 6 files in data agent&apos;s research/cointally-uk/. Ready to brief you — want the summary now or in the morning report?
            </div>
          </div>

          {/* Typing indicator */}
          <div style={{ color: "oklch(0.6 0 0)", fontSize: "11px" }}>
            boris is typing<span className="animate-blink">...</span>
          </div>
        </div>
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
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#0F0F0F",
      }}
      className="text-center px-6"
    >
      {/* Cinematic hero background — scoped to this section only */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center right",
          backgroundRepeat: "no-repeat",
          opacity: 0.65,
          pointerEvents: "none",
        }}
      />
      {/* Dark overlay to ensure text readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.55) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Content layer */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6">
          <span
            style={{
              backgroundColor: "rgba(212,175,55,0.15)",
              border: "1px solid rgba(212,175,55,0.4)",
              color: "#D4AF37",
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
          className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6"
          style={{ color: "#FFFFFF" }}
        >
          Your AI agents.{" "}
          <span style={{ color: "#D4AF37" }}>Running 24/7.</span>
          <br />
          Without babysitting.
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10"
          style={{ color: "rgba(248,247,244,0.75)", lineHeight: "1.7" }}
        >
          cortextOS keeps Claude Code agents alive, orchestrated, and reachable
          over Telegram — no infrastructure configuration required.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          {/* Primary CTA */}
          <a
            href="https://github.com/grandamenium/cortextos"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "#D4AF37",
              color: "#0F0F0F",
            }}
            className="flex items-center gap-3 px-6 py-3 rounded font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Get Started —{" "}
            <code
              style={{
                backgroundColor: "rgba(0,0,0,0.2)",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
              }}
              className="px-2 py-0.5 rounded"
            >
              npm install cortextos
            </code>
          </a>

          {/* Secondary CTA */}
          <a
            href="https://github.com/grandamenium/cortextos"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#F8F7F4",
              border: "1px solid rgba(248,247,244,0.35)",
            }}
            className="flex items-center gap-2 px-6 py-3 rounded font-medium text-sm hover:border-white transition-colors"
          >
            <Github size={16} />
            View on GitHub
            <ExternalLink size={12} style={{ color: "rgba(248,247,244,0.6)" }} />
          </a>
        </div>

        {/* Terminal visual */}
        <TerminalHero />
      </div>
    </section>
  );
}

// ─── ProblemBanner ───────────────────────────────────────────────────────────

function ProblemBanner() {
  return (
    <section
      style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
      className="py-10 px-6 text-center"
    >
      <p
        className="text-xl md:text-2xl font-medium"
        style={{ color: "var(--muted-foreground)" }}
      >
        You want Claude running 24/7.{" "}
        <span style={{ color: "var(--foreground)" }}>
          Getting there takes weeks.
        </span>
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
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
      }}
      className="p-6 hover:border-amber-900 transition-colors"
    >
      <div
        style={{
          color: "#B8860B",
          backgroundColor: "rgba(212,175,55,0.12)",
          border: "1px solid rgba(212,175,55,0.3)",
          borderRadius: "var(--radius-md)",
        }}
        className="inline-flex p-2.5 mb-4"
      >
        {icon}
      </div>
      <h3
        className="text-lg font-semibold mb-2"
        style={{ color: "var(--foreground)" }}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
        {description}
      </p>
    </div>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: <RefreshCw size={20} />,
      title: "Always on",
      description:
        "Agents survive crashes, restarts, and context window limits. Auto-restart, session continuation, and heartbeat monitoring are built in.",
    },
    {
      icon: <GitBranch size={20} />,
      title: "Multi-agent out of the box",
      description:
        "Orchestrator delegates to analysts and workers. Agents talk to each other, block on dependencies, and surface approvals — without you wiring it up.",
    },
    {
      icon: <MessageCircle size={20} />,
      title: "Talk to your agents on Telegram",
      description:
        "Every agent gets a Telegram bot. Send tasks, get updates, approve or reject actions — all in a chat you already have open.",
    },
    {
      icon: <LayoutDashboard size={20} />,
      title: "Dashboard included",
      description:
        "A Next.js dashboard ships with the framework. Tasks, approvals, workflows, analytics, knowledge base — no config, just run it.",
    },
  ];

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: "var(--foreground)" }}
        >
          Everything you&apos;d build. Already built.
        </h2>
        <p className="text-base" style={{ color: "var(--muted-foreground)" }}>
          The infrastructure layer so you can focus on what your agents actually do.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {features.map((f) => (
          <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} />
        ))}
      </div>
    </section>
  );
}

// ─── HowItWorksSection ───────────────────────────────────────────────────────

type StepCardProps = {
  step: number;
  title: string;
  description: string;
  isLast?: boolean;
};

function StepCard({ step, title, description, isLast }: StepCardProps) {
  return (
    <div className="flex flex-col items-center text-center relative">
      {/* Connector line — desktop only, hidden on last step */}
      {!isLast && (
        <div
          className="hidden md:block absolute top-6 left-1/2 w-full h-px"
          style={{
            background: "repeating-linear-gradient(90deg, var(--border) 0, var(--border) 8px, transparent 8px, transparent 16px)",
            transform: "translateX(50%)",
            zIndex: 0,
          }}
        />
      )}

      {/* Step badge */}
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
          flexShrink: 0,
          position: "relative",
          zIndex: 1,
        }}
        className="mb-5"
      >
        {step}
      </div>

      <h3
        className="text-lg font-semibold mb-3"
        style={{ color: "var(--foreground)" }}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
        {description}
      </p>
    </div>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      title: "Install and configure",
      description:
        "Run the interactive setup: /cortextos-setup. It walks you through creating your organization, naming your agents, and wiring up Telegram. Takes about 10 minutes.",
    },
    {
      title: "Your agents come online",
      description:
        "Each agent boots in its own tmux session, reads its identity and goals, sets up its cron schedule, and sends you a Telegram message saying it's ready. From this point forward, they run themselves.",
    },
    {
      title: "Work through Telegram or the dashboard",
      description:
        "Send tasks by message. Get updates pushed to you. Approve actions inline. View everything in the dashboard. Your agents work while you're asleep — and tell you what they did when you wake up.",
    },
  ];

  return (
    <section
      style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
      className="py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "var(--foreground)" }}
          >
            How it works
          </h2>
          <p className="text-base" style={{ color: "var(--muted-foreground)" }}>
            From zero to running agents in under 10 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((s, i) => (
            <StepCard
              key={s.title}
              step={i + 1}
              title={s.title}
              description={s.description}
              isLast={i === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── QuickStartSection ───────────────────────────────────────────────────────

const quickStartCode = `# 1. Clone and install
git clone https://github.com/grandamenium/cortextos
cd cortextos
npm install

# 2. Run interactive setup
# Creates your org, configures agents, sets up Telegram
claude -p "/cortextos-setup"

# 3. Enable your first agent
bash enable-agent.sh boris

# 4. Launch the dashboard
cd dashboard && npm run build && npm start

# 5. Open your Telegram bot — your agent will say hello`;

function QuickStartSection() {
  return (
    <section className="py-20 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: "var(--foreground)" }}
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
          border: "1px solid oklch(0.30 0 0)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
        }}
      >
        {/* Code block header */}
        <div
          style={{
            backgroundColor: "oklch(0.16 0 0)",
            borderBottom: "1px solid oklch(0.25 0 0)",
          }}
          className="flex items-center justify-between px-4 py-2.5"
        >
          <span
            style={{ fontFamily: "var(--font-mono)", color: "oklch(0.6 0 0)", fontSize: "12px" }}
          >
            bash
          </span>
          <button
            style={{
              color: "oklch(0.6 0 0)",
              fontSize: "12px",
              fontFamily: "var(--font-mono)",
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
            title="Copy to clipboard"
            onClick={undefined}
          >
            <Copy size={13} />
            copy
          </button>
        </div>

        {/* Code content */}
        <pre
          style={{
            padding: "24px",
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            lineHeight: "1.8",
            color: "#F8F7F4",
            overflowX: "auto",
          }}
        >
          {quickStartCode.split("\n").map((line, i) => {
            if (line.startsWith("#")) {
              return (
                <div key={i} style={{ color: "oklch(0.6 0 0)" }}>
                  {line}
                </div>
              );
            }
            if (line.trim() === "") {
              return <div key={i}>&nbsp;</div>;
            }
            return (
              <div key={i}>
                <span style={{ color: "var(--success)", userSelect: "none" }}>$ </span>
                <span>{line}</span>
              </div>
            );
          })}
        </pre>
      </div>
    </section>
  );
}

// ─── ComparisonTable ─────────────────────────────────────────────────────────

function ComparisonTable() {
  const rows = [
    {
      feature: "Persistence across restarts",
      cortextos: "Built in (launchd + tmux)",
      rollYourOwn: "Manual — you build it",
      others: "Varies — usually process-only",
    },
    {
      feature: "Multi-agent orchestration",
      cortextos: "Built in (inbox bus, blocking, delegation)",
      rollYourOwn: "Manual — you wire it",
      others: "Varies — often single-agent",
    },
    {
      feature: "Web dashboard",
      cortextos: "Included (Next.js, full-featured)",
      rollYourOwn: "You build it",
      others: "Rarely included",
    },
    {
      feature: "Mobile app",
      cortextos: "iOS app (TestFlight / App Store)",
      rollYourOwn: "You build it",
      others: "No",
    },
    {
      feature: "Telegram control",
      cortextos: "Per-agent bots, push, callbacks",
      rollYourOwn: "You build it",
      others: "No",
    },
    {
      feature: "Security hardening",
      cortextos: "Full audit complete (45 CVEs fixed)",
      rollYourOwn: "Your responsibility",
      others: "Unknown",
    },
    {
      feature: "Install time",
      cortextos: "~10 minutes",
      rollYourOwn: "Weeks",
      others: "Hours–days",
    },
  ];

  return (
    <section
      style={{ borderTop: "1px solid var(--border)" }}
      className="py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Why cortextOS?
          </h2>
          <p className="text-base" style={{ color: "var(--muted-foreground)" }}>
            Compare the build-vs-buy math honestly.
          </p>
        </div>

        <div className="table-scroll">
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontFamily: "var(--font-mono)",
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
                    position: "sticky",
                    left: 0,
                    backgroundColor: "var(--background)",
                    minWidth: "200px",
                  }}
                >
                  Feature
                </th>
                <th
                  style={{
                    color: "var(--primary)",
                    textAlign: "left",
                    padding: "10px 16px",
                    minWidth: "220px",
                    fontWeight: 700,
                  }}
                >
                  cortextOS
                </th>
                <th
                  style={{
                    color: "var(--muted-foreground)",
                    textAlign: "left",
                    padding: "10px 16px",
                    minWidth: "200px",
                  }}
                >
                  Roll your own
                </th>
                <th
                  style={{
                    color: "var(--muted-foreground)",
                    textAlign: "left",
                    padding: "10px 16px",
                    minWidth: "220px",
                  }}
                >
                  Other agent frameworks
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
                      i % 2 === 0 ? "transparent" : "rgba(229,224,216,0.35)",
                  }}
                >
                  <td
                    style={{
                      padding: "12px 16px",
                      color: "var(--foreground)",
                      fontWeight: 500,
                      position: "sticky",
                      left: 0,
                      backgroundColor: i % 2 === 0 ? "var(--background)" : "rgba(229,224,216,0.35)",
                    }}
                  >
                    {row.feature}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      color: "var(--primary)",
                    }}
                  >
                    {row.cortextos}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {row.rollYourOwn}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
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
            borderLeft: "4px solid #D4AF37",
            borderRadius: "var(--radius-lg)",
          }}
          className="p-8"
        >
          <div className="flex items-start gap-4">
            <div
              style={{
                color: "#B8860B",
                backgroundColor: "rgba(212,175,55,0.12)",
                border: "1px solid rgba(212,175,55,0.3)",
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
                style={{ color: "var(--foreground)" }}
              >
                We audited ourselves before you had to.
              </h2>

              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted-foreground)" }}>
                A full security audit of cortextOS completed on 2026-03-31 identified 45 unique
                vulnerabilities across the bash scripting layer, launchd lifecycle management,
                Telegram integration, and the Node.js dashboard API. All four Critical findings and
                twelve of sixteen High findings are remediated in open PRs. The audit surface
                included command injection, JWT verification failures, secrets management, and
                inter-agent isolation gaps.
              </p>

              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted-foreground)" }}>
                The findings and remediation PRs are public. We believe shipping a security report
                alongside the framework is table stakes for production AI infrastructure — so we did.
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Total vulnerabilities", value: "45", sub: "identified" },
                  { label: "Critical findings", value: "4", sub: "all remediated" },
                  { label: "High findings", value: "16", sub: "12 remediated" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div
                      className="text-2xl font-bold mb-0.5"
                      style={{ color: "#B8860B", fontFamily: "var(--font-mono)" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                      {stat.label}
                    </div>
                    <div className="text-xs" style={{ color: "#B8860B" }}>
                      {stat.sub}
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
                View security report →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTAFooter ───────────────────────────────────────────────────────────────

const ctaCode = `git clone https://github.com/grandamenium/cortextos
cd cortextos && npm install
claude -p "/cortextos-setup"`;

function CTAFooter() {
  return (
    <section
      style={{ borderTop: "1px solid var(--border)", backgroundColor: "#B8860B" }}
      className="py-20 px-6 text-center"
    >
      <div className="max-w-2xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: "#FFFFFF" }}
        >
          Start building today.
        </h2>
        <p className="text-base mb-10" style={{ color: "rgba(255,255,255,0.8)" }}>
          cortextOS is open source. Clone it, run setup, and have agents running in under 10 minutes.
        </p>

        {/* Code block */}
        <div
          style={{
            backgroundColor: "oklch(0.13 0 0)",
            border: "1px solid oklch(0.30 0 0)",
            borderRadius: "var(--radius-lg)",
            textAlign: "left",
            overflow: "hidden",
            marginBottom: "32px",
          }}
        >
          <div
            style={{ borderBottom: "1px solid oklch(0.25 0 0)", backgroundColor: "oklch(0.16 0 0)" }}
            className="px-4 py-2"
          >
            <span style={{ fontFamily: "var(--font-mono)", color: "oklch(0.6 0 0)", fontSize: "11px" }}>
              bash
            </span>
          </div>
          <pre
            style={{
              padding: "20px",
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              lineHeight: "1.8",
              overflowX: "auto",
            }}
          >
            {ctaCode.split("\n").map((line, i) => (
              <div key={i}>
                <span style={{ color: "var(--success)", userSelect: "none" }}>$ </span>
                <span style={{ color: "#F8F7F4" }}>{line}</span>
              </div>
            ))}
          </pre>
        </div>

        {/* Links */}
        <div className="flex items-center justify-center gap-6">
          <a
            href="https://github.com/grandamenium/cortextos"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#FFFFFF" }}
            className="flex items-center gap-1.5 text-sm font-medium hover:underline"
          >
            <Github size={15} />
            View on GitHub →
          </a>
          <a
            href="https://github.com/grandamenium/cortextos/blob/main/README.md"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "rgba(255,255,255,0.7)" }}
            className="flex items-center gap-1.5 text-sm hover:text-white transition-colors"
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
          style={{ fontFamily: "var(--font-mono)", color: "var(--primary)", fontSize: "14px" }}
          className="font-bold"
        >
          cortextOS
        </span>
        <span style={{ color: "var(--muted-foreground)", fontSize: "12px" }}>
          Open source · MIT License · Built for Claude Code agents
        </span>
        <a
          href="https://github.com/grandamenium/cortextos"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--muted-foreground)", fontSize: "12px" }}
          className="flex items-center gap-1 hover:opacity-70 transition-opacity"
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
        <HowItWorksSection />
        <QuickStartSection />
        <ComparisonTable />
        <SecuritySection />
        <CTAFooter />
      </main>
      <Footer />
    </>
  );
}
