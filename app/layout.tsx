import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "cortextOS — AI agents that run 24/7",
  description:
    "cortextOS keeps Claude Code agents alive, orchestrated, and reachable over Telegram — no infrastructure configuration required.",
  keywords: [
    "AI agents",
    "Claude Code",
    "multi-agent",
    "automation",
    "Telegram bot",
    "open source",
    "cortextOS",
  ],
  authors: [{ name: "cortextOS" }],
  openGraph: {
    title: "cortextOS — AI agents that run 24/7",
    description:
      "cortextOS keeps Claude Code agents alive, orchestrated, and reachable over Telegram — no infrastructure configuration required.",
    url: "https://cortextos.dev",
    siteName: "cortextOS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "cortextOS — AI agents that run 24/7",
    description:
      "cortextOS keeps Claude Code agents alive, orchestrated, and reachable over Telegram — no infrastructure configuration required.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
