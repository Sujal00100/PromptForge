import { NextRequest, NextResponse } from "next/server";
import { generateJSON } from "@/lib/gemini";
import { CREATIVE_PROMPT } from "@/prompts/creative";
import { TECHNICAL_PROMPT } from "@/prompts/technical";
import { BEGINNER_PROMPT } from "@/prompts/beginner";
import { EXPERT_PROMPT } from "@/prompts/expert";
import { CONCISE_PROMPT } from "@/prompts/concise";
import { JSON_PROMPT } from "@/prompts/json";
import { MARKDOWN_PROMPT } from "@/prompts/markdown";
import { TEMPLATE_PROMPT } from "@/prompts/template";
import { FEWSHOT_PROMPT } from "@/prompts/fewshot";
import { ZEROSHOT_PROMPT } from "@/prompts/zeroshot";
import { ROLE_PROMPT } from "@/prompts/role";
import { CONSTRAINT_PROMPT } from "@/prompts/constraint";
import type { PromptVersion, VersionsRequest, ApiError } from "@/types";

const VERSION_PROMPTS: Record<string, string> = {
  Creative: CREATIVE_PROMPT,
  Technical: TECHNICAL_PROMPT,
  "Beginner-Friendly": BEGINNER_PROMPT,
  Expert: EXPERT_PROMPT,
  Concise: CONCISE_PROMPT,
  "JSON Output": JSON_PROMPT,
  Markdown: MARKDOWN_PROMPT,
  Template: TEMPLATE_PROMPT,
  "Few-Shot": FEWSHOT_PROMPT,
  "Zero-Shot": ZEROSHOT_PROMPT,
  "Role-Based": ROLE_PROMPT,
  Constrained: CONSTRAINT_PROMPT,
};

interface VersionResponse {
  style: string;
  prompt: string;
  score: number;
  rationale: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: VersionsRequest = await request.json();

    if (!body.task || !body.prompt) {
      return NextResponse.json<ApiError>(
        { error: "Both 'task' and 'prompt' fields are required" },
        { status: 400 }
      );
    }

    const userInput = `Task: ${body.task}\n\nOriginal Prompt:\n${body.prompt}`;

    // Generate 6 key versions in parallel for speed
    const selectedStyles = [
      "Creative",
      "Technical",
      "Concise",
      "Few-Shot",
      "Role-Based",
      "Template",
    ];

    const results = await Promise.allSettled(
      selectedStyles.map((style) =>
        generateJSON<VersionResponse>(VERSION_PROMPTS[style], userInput)
      )
    );

    const versions: PromptVersion[] = results
      .map((result, index) => {
        if (result.status === "fulfilled") {
          return {
            id: index + 1,
            style: result.value.style || selectedStyles[index],
            prompt: result.value.prompt,
            score: result.value.score,
            rationale: result.value.rationale,
          };
        }
        return null;
      })
      .filter((v): v is PromptVersion => v !== null);

    if (versions.length === 0) {
      return NextResponse.json<ApiError>(
        { error: "Failed to generate any versions" },
        { status: 500 }
      );
    }

    return NextResponse.json(versions);
  } catch (error) {
    console.error("Versions API error:", error);
    return NextResponse.json<ApiError>(
      {
        error: "Failed to generate versions",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
