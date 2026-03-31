import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cortext — AI agents that run 24/7",
  description:
    "Cortext keeps Claude Code agents alive, orchestrated, and reachable over Telegram. Persistence, multi-agent coordination, and a dashboard — out of the box.",
  keywords: [
    "AI agents",
    "Claude Code",
    "multi-agent",
    "automation",
    "Telegram bot",
    "open source",
    "Cortext",
  ],
  authors: [{ name: "Cortext" }],
  openGraph: {
    title: "Cortext — AI agents that run 24/7",
    description:
      "Cortext keeps Claude Code agents alive, orchestrated, and reachable over Telegram. Persistence, multi-agent coordination, and a dashboard — out of the box.",
    url: "https://cortext.dev",
    siteName: "Cortext",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cortext — AI agents that run 24/7",
    description:
      "Cortext keeps Claude Code agents alive, orchestrated, and reachable over Telegram. Persistence, multi-agent coordination, and a dashboard — out of the box.",
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body style={{ fontFamily: "var(--font-inter, system-ui, sans-serif)" }}>
        {children}
      </body>
    </html>
  );
}
