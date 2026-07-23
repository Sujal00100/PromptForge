/**
 * Seed script — populates the database with sample prompt history entries.
 *
 * Usage:
 *   cd backend && npm run seed
 *   — or —
 *   node database/seed/seed.js
 */

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../backend/.env") });

const mongoose = require("mongoose");

// We import the model from the backend directory
const Prompt = require("../../backend/models/Prompt");

const sampleEntries = [
  {
    task: "Write a blog post introduction",
    originalPrompt: "Write an intro for my blog about AI",
    rewrittenPrompt:
      "You are an expert technology writer with a knack for making complex AI concepts accessible to a general audience. Write a compelling 150-word introduction for a blog post about how artificial intelligence is transforming everyday life. The tone should be engaging and optimistic, using a real-world example as a hook. End with a thesis statement that previews the key points the article will cover.",
    score: {
      clarity: 85,
      specificity: 78,
      context: 82,
      structure: 88,
      overall: 83,
      strengths: [
        "Clear task definition",
        "Good audience awareness",
      ],
      weaknesses: [
        "Original lacked specificity on tone",
        "No word count guidance",
      ],
      suggestions: [
        "Add target audience details",
        "Specify desired blog style",
      ],
    },
    improvements: [
      {
        category: "Role-Setting",
        before: "Missing",
        after: "Expert technology writer role assigned",
        explanation:
          "Assigning a role helps the AI adopt the right tone and expertise level.",
      },
      {
        category: "Specificity",
        before: "blog about AI",
        after: "blog post about how artificial intelligence is transforming everyday life",
        explanation:
          "Narrowing the topic gives the AI a concrete direction instead of a vague subject.",
      },
      {
        category: "Constraints",
        before: "Missing",
        after: "150-word limit, engaging and optimistic tone",
        explanation:
          "Length and tone constraints prevent rambling and ensure the output fits the blog format.",
      },
    ],
    versions: [
      {
        id: 1,
        style: "Creative",
        prompt:
          "Imagine you're a storyteller at the intersection of humanity and technology. Craft a vivid, 150-word blog introduction that opens with a surprising anecdote about AI in daily life.",
        score: 82,
        rationale:
          "Uses narrative hook technique for higher engagement.",
      },
    ],
  },
  {
    task: "Generate a product description",
    originalPrompt: "Describe my product",
    rewrittenPrompt:
      "You are a senior e-commerce copywriter. Write a persuasive 100-word product description for a premium wireless noise-cancelling headphone. Highlight 3 key features: 40-hour battery life, adaptive noise cancellation, and ultra-comfortable memory foam ear cushions. Target audience: remote workers aged 25-40. Tone: professional yet approachable. Include a compelling call-to-action at the end.",
    score: {
      clarity: 90,
      specificity: 92,
      context: 85,
      structure: 91,
      overall: 89,
      strengths: [
        "Highly specific product details",
        "Clear target audience",
        "Well-defined tone",
      ],
      weaknesses: [
        "Original was extremely vague",
        "No product category mentioned",
      ],
      suggestions: [
        "Consider adding competitive positioning",
        "Include SEO keywords",
      ],
    },
    improvements: [
      {
        category: "Context",
        before: "my product",
        after: "premium wireless noise-cancelling headphone with specific features",
        explanation:
          "The AI cannot write about a product it knows nothing about. Concrete details are essential.",
      },
      {
        category: "Structure",
        before: "Missing",
        after: "100-word limit, 3 key features, CTA at end",
        explanation:
          "Structured output requirements ensure the description hits all marketing points.",
      },
    ],
    versions: [],
  },
  {
    task: "Explain a technical concept",
    originalPrompt: "Explain how React works",
    rewrittenPrompt:
      "You are a patient computer science educator. Explain how React's virtual DOM works to a junior developer who understands basic HTML and JavaScript but has never used a frontend framework. Use a simple real-world analogy (e.g., blueprint vs. building). Keep the explanation under 200 words. Structure: 1) What problem it solves, 2) How it works at a high level, 3) Why it matters for performance.",
    score: {
      clarity: 88,
      specificity: 84,
      context: 90,
      structure: 92,
      overall: 88,
      strengths: [
        "Clear audience level defined",
        "Good structure with numbered sections",
        "Analogy suggestion helps comprehension",
      ],
      weaknesses: [
        "Original too broad — React is a large topic",
      ],
      suggestions: [
        "Could add a follow-up question prompt",
      ],
    },
    improvements: [
      {
        category: "Clarity",
        before: "Explain how React works",
        after: "Explain how React's virtual DOM works",
        explanation:
          "Narrowing to one specific concept (virtual DOM) produces a focused, useful answer.",
      },
      {
        category: "Context",
        before: "Missing",
        after: "Junior developer audience with HTML/JS knowledge",
        explanation:
          "Audience context ensures the explanation is neither too basic nor too advanced.",
      },
    ],
    versions: [],
  },
];

async function seed() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/promptforge";

  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await Prompt.deleteMany({});
    console.log("🗑️  Cleared existing prompts");

    // Insert sample data
    const inserted = await Prompt.insertMany(sampleEntries);
    console.log(`🌱 Seeded ${inserted.length} sample prompt(s)`);

    await mongoose.connection.close();
    console.log("✅ Done — connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error.message);
    process.exit(1);
  }
}

seed();
