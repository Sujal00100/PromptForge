// ===== Prompt Analysis Types =====

export interface PromptAnalysis {
  clarity: number;
  specificity: number;
  context: number;
  structure: number;
  overall: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

// ===== Improvement Types =====

export interface Improvement {
  category: string;
  before: string;
  after: string;
  explanation: string;
}

// ===== Optimization Result =====

export interface OptimizationResult {
  originalPrompt: string;
  rewrittenPrompt: string;
  score: PromptAnalysis;
  improvements: Improvement[];
  task: string;
}

// ===== Prompt Versions =====

export interface PromptVersion {
  id: number;
  style: string;
  prompt: string;
  score: number;
  rationale: string;
}

// ===== Comparison =====

export interface ComparisonPrompt {
  label: string;
  prompt: string;
  output: string;
}

export interface ComparisonResult {
  prompts: ComparisonPrompt[];
  winner: string;
  analysis: string;
}

// ===== History =====

export interface HistoryEntry {
  _id?: string;
  task: string;
  originalPrompt: string;
  rewrittenPrompt: string;
  score: PromptAnalysis;
  improvements: Improvement[];
  versions: PromptVersion[];
  createdAt: string;
}

// ===== Dashboard =====

export interface DashboardStats {
  totalOptimizations: number;
  avgScoreImprovement: number;
  bestScore: number;
  topCategories: { name: string; count: number }[];
  recentScores: { date: string; original: number; optimized: number }[];
  scoreDistribution: { range: string; count: number }[];
}

// ===== API Request/Response =====

export interface AnalyzeRequest {
  task: string;
  prompt: string;
}

export interface OptimizeRequest {
  task: string;
  prompt: string;
}

export interface VersionsRequest {
  task: string;
  prompt: string;
}

export interface CompareRequest {
  task: string;
  prompts: string[];
}

export interface ApiError {
  error: string;
  details?: string;
}
