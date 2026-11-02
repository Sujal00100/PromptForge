import Link from "next/link";
import { Sparkles, BarChart3, History, Zap, ArrowRight, Layers, GitCompare, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Sparkles,
    title: "Smart Analysis",
    description: "Deep analysis of your prompts across clarity, specificity, context, and structure dimensions.",
    gradient: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/20",
  },
  {
    icon: Zap,
    title: "Instant Rewrite",
    description: "AI-powered rewrites that preserve your intent while dramatically improving effectiveness.",
    gradient: "from-cyan-500 to-blue-600",
    glow: "shadow-cyan-500/20",
  },
  {
    icon: Layers,
    title: "Multiple Versions",
    description: "Generate creative, technical, concise, few-shot, and more — 6 style variants at once.",
    gradient: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/20",
  },
  {
    icon: GitCompare,
    title: "Compare & Judge",
    description: "Side-by-side comparison with AI judge scoring to find the best version for your task.",
    gradient: "from-pink-500 to-rose-600",
    glow: "shadow-pink-500/20",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track your optimization history with score charts, trends, and category breakdowns.",
    gradient: "from-amber-500 to-orange-600",
    glow: "shadow-amber-500/20",
  },
  {
    icon: BookOpen,
    title: "Learn & Improve",
    description: "Detailed explanations of every improvement teach you prompt engineering as you go.",
    gradient: "from-indigo-500 to-violet-600",
    glow: "shadow-indigo-500/20",
  },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-violet-600/12 via-cyan-600/6 to-transparent rounded-full blur-3xl animate-pulse-glow" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 sm:pt-32 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/15 bg-violet-500/[0.06] px-5 py-2 text-sm text-violet-300 mb-8 backdrop-blur-sm animate-fade-in">
            <Sparkles className="h-4 w-4" />
            Powered by Groq AI
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-slide-up">
            <span className="block text-white">Craft Perfect</span>
            <span className="block bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent animate-gradient">
              AI Prompts
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-gray-400 mb-12 leading-relaxed animate-slide-up" style={{ animationDelay: "100ms" }}>
            Analyze, score, rewrite, and optimize your prompts with AI. Generate multiple 
            versions, compare outputs, and master prompt engineering — all in one platform.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <Link href="/optimize">
              <Button
                id="cta-optimize"
                size="lg"
                className="bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold hover:from-violet-500 hover:to-cyan-500 shadow-xl shadow-violet-500/20 hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-[0.98] h-14 px-8 text-base rounded-2xl group focus-ring"
              >
                Start Optimizing
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="lg"
                className="border-white/10 text-gray-300 hover:bg-white/[0.04] hover:text-white hover:border-white/20 h-14 px-8 text-base rounded-2xl focus-ring"
              >
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              A complete toolkit for prompt engineering, from analysis to optimization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <div
                key={i}
                className="stagger-item group relative rounded-2xl border border-white/[0.04] bg-[#111427]/70 p-6 hover:bg-[#161a2e] hover:border-white/[0.08] hover:shadow-xl hover:-translate-y-1 cursor-default"
              >
                {/* Icon */}
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg ${feature.glow} mb-5 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-violet-600/[0.05] to-cyan-600/[0.05] p-8 sm:p-12 backdrop-blur-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 text-center">
              {[
                { value: "19", label: "AI Prompts", sub: "Specialized templates" },
                { value: "6+", label: "Style Variants", sub: "Each optimization" },
                { value: "4", label: "Analysis Dimensions", sub: "Deep scoring" },
                { value: "∞", label: "Possibilities", sub: "Prompt combinations" },
              ].map((stat, i) => (
                <div key={i} className="stagger-item">
                  <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent tabular-nums">
                    {stat.value}
                  </p>
                  <p className="text-white font-medium mt-1.5 text-sm sm:text-base">{stat.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
