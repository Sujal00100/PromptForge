"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";

interface ScoreGaugeProps {
  score: {
    overall: number;
    clarity: number;
    specificity: number;
    context: number;
    structure: number;
  };
}

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = Math.max(1, Math.ceil(value / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return <>{display}</>;
}

export function ScoreGauge({ score }: ScoreGaugeProps) {
  const getScoreColor = (value: number) => {
    if (value >= 80) return "text-emerald-400";
    if (value >= 60) return "text-cyan-400";
    if (value >= 40) return "text-amber-400";
    return "text-red-400";
  };

  const getBarGradient = (value: number) => {
    if (value >= 80) return "from-emerald-500 to-emerald-400";
    if (value >= 60) return "from-cyan-500 to-cyan-400";
    if (value >= 40) return "from-amber-500 to-amber-400";
    return "from-red-500 to-red-400";
  };

  const getScoreLabel = (value: number) => {
    if (value >= 80) return "Excellent";
    if (value >= 60) return "Good";
    if (value >= 40) return "Average";
    return "Needs Work";
  };

  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score.overall / 100) * circumference;

  const dimensions = [
    { label: "Clarity", value: score.clarity },
    { label: "Specificity", value: score.specificity },
    { label: "Context", value: score.context },
    { label: "Structure", value: score.structure },
  ];

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#111427] p-6 h-full flex flex-col">
      <div className="flex items-center gap-2.5 mb-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/20">
          <TrendingUp className="h-4 w-4 text-violet-400" />
        </div>
        <h3 className="text-sm font-semibold text-white">Optimization Score</h3>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Main Gauge */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 mb-8">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="url(#score-gradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
                transition: "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
                filter: "drop-shadow(0 0 12px rgba(139, 92, 246, 0.25))",
              }}
            />
            <defs>
              <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className={`text-4xl sm:text-5xl font-bold tabular-nums ${getScoreColor(score.overall)}`}>
              <AnimatedNumber value={score.overall} />
            </span>
            <span className="text-[10px] font-medium text-gray-600 mt-0.5">out of 100</span>
            <span className={`text-[10px] font-bold uppercase tracking-widest mt-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.04] ${getScoreColor(score.overall)}`}>
              {getScoreLabel(score.overall)}
            </span>
          </div>
        </div>

        {/* Dimensions */}
        <div className="w-full space-y-4 mt-auto">
          {dimensions.map((dim) => (
            <div key={dim.label} className="w-full group">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-medium text-gray-400 group-hover:text-gray-300 transition-colors">{dim.label}</span>
                <span className={`text-xs font-bold tabular-nums ${getScoreColor(dim.value)}`}>
                  <AnimatedNumber value={dim.value} />
                </span>
              </div>
              <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${getBarGradient(dim.value)}`}
                  style={{
                    width: `${dim.value}%`,
                    transition: "width 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
