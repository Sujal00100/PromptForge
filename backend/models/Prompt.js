const mongoose = require("mongoose");

// ─── Embedded Sub-Schemas ─────────────────────────────────────────

const scoreSchema = new mongoose.Schema(
  {
    clarity: { type: Number, min: 0, max: 100, default: 0 },
    specificity: { type: Number, min: 0, max: 100, default: 0 },
    context: { type: Number, min: 0, max: 100, default: 0 },
    structure: { type: Number, min: 0, max: 100, default: 0 },
    overall: { type: Number, min: 0, max: 100, default: 0 },
    strengths: { type: [String], default: [] },
    weaknesses: { type: [String], default: [] },
    suggestions: { type: [String], default: [] },
  },
  { _id: false }
);

const improvementSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    before: { type: String, required: true },
    after: { type: String, required: true },
    explanation: { type: String, required: true },
  },
  { _id: false }
);

const versionSchema = new mongoose.Schema(
  {
    id: { type: Number },
    style: { type: String },
    prompt: { type: String },
    score: { type: Number },
    rationale: { type: String },
  },
  { _id: false }
);

// ─── Main Prompt Schema ───────────────────────────────────────────

const promptSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, "Task is required"],
      trim: true,
      maxlength: [500, "Task must be 500 characters or less"],
    },
    originalPrompt: {
      type: String,
      required: [true, "Original prompt is required"],
      trim: true,
      maxlength: [10000, "Original prompt must be 10,000 characters or less"],
    },
    rewrittenPrompt: {
      type: String,
      required: [true, "Rewritten prompt is required"],
      trim: true,
      maxlength: [10000, "Rewritten prompt must be 10,000 characters or less"],
    },
    score: {
      type: scoreSchema,
      required: [true, "Score is required"],
    },
    improvements: {
      type: [improvementSchema],
      default: [],
    },
    versions: {
      type: [versionSchema],
      default: [],
    },
  },
  {
    timestamps: true, // Auto-manage createdAt and updatedAt
  }
);

// ─── Indexes ──────────────────────────────────────────────────────

promptSchema.index({ createdAt: -1 }); // Fast sorted history queries

// ─── Export ───────────────────────────────────────────────────────

module.exports = mongoose.model("Prompt", promptSchema);
