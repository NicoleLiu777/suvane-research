import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "SUVANÉ Research", template: "%s · SUVANÉ Research" },
  description: "A professional evidence-to-decision workspace for AI-enabled healthy aging.",
  other: { "codex-preview": "development" },
  openGraph: {
    title: "SUVANÉ Research",
    description: "From fragmented research to traceable product decisions.",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "SUVANÉ Research — Evidence to decision." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SUVANÉ Research",
    description: "From fragmented research to traceable product decisions.",
    images: ["/og.jpg"],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
