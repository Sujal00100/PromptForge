import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PromptForge — AI Prompt Optimization Platform",
  description:
    "Analyze, score, rewrite, and optimize your AI prompts with intelligent suggestions. Generate multiple versions, compare outputs, and track your improvements.",
  keywords: [
    "AI",
    "prompt engineering",
    "prompt optimization",
    "GPT",
    "Gemini",
    "prompt analysis",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0b0d17]">
        <TooltipProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            theme="dark"
            toastOptions={{
              style: {
                background: "rgba(17, 20, 39, 0.95)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#f1f5f9",
                backdropFilter: "blur(12px)",
                borderRadius: "16px",
              },
            }}
          />
        </TooltipProvider>
      </body>
    </html>
  );
}
