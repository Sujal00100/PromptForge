"use client";

import { Wrench, ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Improvement } from "@/types";

interface ImprovementsCardProps {
  improvements: Improvement[];
}

export function ImprovementsCard({ improvements }: ImprovementsCardProps) {
  const categoryColors: Record<string, string> = {
    "Clarity": "bg-blue-500/10 text-blue-400 border-blue-500/15",
    "Specificity": "bg-violet-500/10 text-violet-400 border-violet-500/15",
    "Context": "bg-emerald-500/10 text-emerald-400 border-emerald-500/15",
    "Structure": "bg-cyan-500/10 text-cyan-400 border-cyan-500/15",
    "Tone": "bg-pink-500/10 text-pink-400 border-pink-500/15",
    "Format": "bg-amber-500/10 text-amber-400 border-amber-500/15",
    "Constraints": "bg-red-500/10 text-red-400 border-red-500/15",
    "Role-Setting": "bg-indigo-500/10 text-indigo-400 border-indigo-500/15",
  };

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#111427] overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 sm:px-6 border-b border-white/[0.06] bg-gradient-to-r from-amber-500/[0.04] to-transparent flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/15">
          <Wrench className="h-4 w-4 text-amber-400" />
        </div>
        <h3 className="text-sm font-semibold text-white">Applied Improvements</h3>
        <Badge variant="outline" className="ml-auto bg-white/[0.04] text-gray-400 border-white/[0.06] rounded-lg text-xs tabular-nums">
          {improvements.length} changes
        </Badge>
      </div>

      {/* Accordion */}
      <div className="p-5 sm:p-6">
        <Accordion className="w-full space-y-2.5">
          {improvements.map((improvement, index) => {
            const catColor =
              categoryColors[improvement.category] ||
              "bg-gray-500/10 text-gray-400 border-gray-500/15";

            return (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-white/[0.05] rounded-xl bg-white/[0.02] px-4 data-open:bg-white/[0.04] data-open:border-white/[0.08] overflow-hidden"
              >
                <AccordionTrigger className="hover:no-underline py-3.5">
                  <div className="flex items-center gap-3 text-left w-full pr-4">
                    <Badge variant="outline" className={`${catColor} whitespace-nowrap rounded-md text-[10px] uppercase tracking-wider font-semibold border`}>
                      {improvement.category}
                    </Badge>
                    <p className="text-sm text-gray-300 font-medium truncate flex-1">
                      {improvement.explanation}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Before */}
                    <div className="rounded-xl border border-red-500/10 bg-red-500/[0.03] p-4">
                      <span className="text-[10px] font-bold text-red-400/80 uppercase tracking-wider mb-2 block">
                        Before
                      </span>
                      <p className="text-sm text-gray-400 italic leading-relaxed">
                        &ldquo;{improvement.before}&rdquo;
                      </p>
                    </div>
                    
                    {/* After */}
                    <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/[0.03] p-4 relative">
                      <span className="text-[10px] font-bold text-emerald-400/80 uppercase tracking-wider mb-2 block flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> After
                      </span>
                      <p className="text-sm text-gray-200 leading-relaxed">
                        &ldquo;{improvement.after}&rdquo;
                      </p>
                      
                      {/* Arrow connecting them on desktop */}
                      <div className="hidden md:flex absolute -left-4.5 top-1/2 -translate-y-1/2 h-7 w-7 items-center justify-center bg-[#111427] rounded-full border border-white/[0.06] z-10">
                        <ArrowRight className="h-3.5 w-3.5 text-gray-500" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3.5 pt-3.5 border-t border-white/[0.05]">
                    <p className="text-sm text-gray-400 leading-relaxed">
                      <span className="font-semibold text-gray-300">Why this helps: </span>
                      {improvement.explanation}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
