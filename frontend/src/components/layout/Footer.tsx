import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.04] bg-[#0b0d17]/80 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500">
              <Zap className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              PromptForge
            </span>
          </div>
          <p className="text-xs text-gray-600 text-center sm:text-right">
            AI-powered prompt optimization. Craft better prompts, get better results.
          </p>
        </div>
      </div>
    </footer>
  );
}
