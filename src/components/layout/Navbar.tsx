"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Sparkles, History, BarChart3, Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/optimize", label: "Optimize", icon: Sparkles },
  { href: "/history", label: "History", icon: History },
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.04] bg-[#0b0d17]/85 backdrop-blur-2xl backdrop-saturate-150">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group focus-ring rounded-lg" aria-label="PromptForge home">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/15 group-hover:shadow-violet-500/30 group-hover:scale-105 transition-all duration-300">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            PromptForge
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 rounded-xl bg-white/[0.03] border border-white/[0.04] p-1" role="navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className="focus-ring rounded-lg" aria-current={isActive ? "page" : undefined}>
                <Button
                  variant="ghost"
                  className={`gap-2 rounded-lg px-4 h-9 text-sm font-medium ${
                    isActive
                      ? "bg-gradient-to-r from-violet-500/15 to-cyan-500/15 text-white shadow-sm border border-white/[0.06]"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                  tabIndex={-1}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Button>
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-gray-400 hover:text-white hover:bg-white/[0.06] rounded-xl h-10 w-10 focus-ring"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          <div className="relative h-5 w-5">
            <X className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${mobileOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`} />
            <Menu className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${mobileOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"}`} />
          </div>
        </Button>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-nav"
        role="navigation"
        aria-label="Mobile navigation"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-white/[0.04] bg-[#0b0d17]/95 backdrop-blur-2xl">
          <div className="flex flex-col gap-1 p-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="focus-ring rounded-xl"
                  aria-current={isActive ? "page" : undefined}
                >
                  <Button
                    variant="ghost"
                    className={`w-full justify-start gap-3 rounded-xl h-12 text-sm font-medium ${
                      isActive
                        ? "bg-gradient-to-r from-violet-500/15 to-cyan-500/15 text-white border border-white/[0.06]"
                        : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                    tabIndex={-1}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
