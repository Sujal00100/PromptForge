"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, Target, Type } from "lucide-react";

interface PromptInputProps {
  onSubmit: (task: string, prompt: string) => void;
  isLoading: boolean;
}

export function PromptInput({ onSubmit, isLoading }: PromptInputProps) {
  const [task, setTask] = useState("");
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim() && prompt.trim()) {
      onSubmit(task.trim(), prompt.trim());
    }
  };

  const charCount = prompt.length;
  const charColor = charCount > 5000 ? "text-amber-400" : charCount > 0 ? "text-gray-500" : "text-gray-600";

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#111427] shadow-2xl shadow-black/20 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 sm:px-8 sm:py-5 border-b border-white/[0.06] bg-gradient-to-r from-violet-500/[0.04] to-cyan-500/[0.04]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500">
            <Type className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Prompt Editor</h2>
            <p className="text-xs text-gray-500">Describe your task and enter the prompt to optimize</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
        {/* Task Input */}
        <div className="space-y-2">
          <label htmlFor="task-input" className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <Target className="h-3.5 w-3.5 text-violet-400" />
            Task Description
          </label>
          <Input
            id="task-input"
            placeholder="e.g., Write a product description for an e-commerce website"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="h-12 rounded-xl border-white/[0.06] bg-[#0e1122] text-white placeholder:text-gray-600 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 focus-ring"
          />
        </div>

        {/* Prompt Textarea */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="prompt-input" className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              Your Prompt
            </label>
            <span className={`text-xs tabular-nums font-medium ${charColor}`}>
              {charCount.toLocaleString()} chars
            </span>
          </div>
          <Textarea
            id="prompt-input"
            placeholder="Enter the prompt you want to optimize..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={8}
            className="rounded-xl border-white/[0.06] bg-[#0e1122] text-white placeholder:text-gray-600 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 resize-y leading-relaxed min-h-[160px] focus-ring"
          />
        </div>

        {/* Submit Button */}
        <Button
          id="optimize-button"
          type="submit"
          disabled={isLoading || !task.trim() || !prompt.trim()}
          className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold hover:from-violet-500 hover:to-cyan-500 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg h-13 text-base rounded-xl"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin mr-2.5" />
              Analyzing & Optimizing...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5 mr-2.5" />
              Optimize Prompt
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
