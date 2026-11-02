"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Copy, Check, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface RewriteCardProps {
  originalPrompt: string;
  rewrittenPrompt: string;
}

export function RewriteCard({ originalPrompt, rewrittenPrompt }: RewriteCardProps) {
  const [copied, setCopied] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(rewrittenPrompt);
    setCopied(true);
    toast.success("Optimized prompt copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#111427] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 sm:px-6 border-b border-white/[0.06] bg-gradient-to-r from-violet-500/[0.04] to-transparent">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 border border-violet-500/15">
            <FileText className="h-4 w-4 text-violet-400" />
          </div>
          <h3 className="text-sm font-semibold text-white">Optimized Prompt</h3>
        </div>
        <div className="flex gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowOriginal(!showOriginal)}
            className="text-xs text-gray-400 hover:text-white hover:bg-white/[0.06] gap-1.5 rounded-lg h-8 px-3"
          >
            {showOriginal ? (
              <><EyeOff className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Hide Original</span></>
            ) : (
              <><Eye className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Show Original</span></>
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className={`text-xs gap-1.5 rounded-lg h-8 px-3 ${
              copied ? "text-emerald-400" : "text-gray-400 hover:text-white hover:bg-white/[0.06]"
            }`}
            aria-label="Copy optimized prompt"
          >
            {copied ? (
              <><Check className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Copied!</span></>
            ) : (
              <><Copy className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Copy</span></>
            )}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 space-y-4">
        {/* Original (toggled) */}
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            showOriginal ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="rounded-xl border border-red-500/10 bg-red-500/[0.03] p-4 sm:p-5 mb-4">
              <p className="text-[10px] font-bold text-red-400/80 mb-2.5 uppercase tracking-wider">
                Original
              </p>
              <p className="text-sm text-gray-400 whitespace-pre-wrap leading-relaxed font-mono">
                {originalPrompt}
              </p>
            </div>
          </div>
        </div>

        {/* Rewritten */}
        <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/[0.03] p-4 sm:p-5">
          {showOriginal && (
            <p className="text-[10px] font-bold text-emerald-400/80 mb-2.5 uppercase tracking-wider">
              Optimized
            </p>
          )}
          <p className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed font-mono">
            {rewrittenPrompt}
          </p>
        </div>
      </div>
    </div>
  );
}
