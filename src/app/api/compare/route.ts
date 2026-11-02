import { NextRequest, NextResponse } from "next/server";
import { generateJSON } from "@/lib/gemini";
import { COMPARE_PROMPT } from "@/prompts/compare";
import type { ComparisonResult, CompareRequest, ApiError } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: CompareRequest = await request.json();

    if (!body.task || !body.prompts || body.prompts.length < 2) {
      return NextResponse.json<ApiError>(
        { error: "'task' and at least 2 'prompts' are required" },
        { status: 400 }
      );
    }

    const promptsList = body.prompts
      .map((p, i) => `Prompt ${i + 1}:\n${p}`)
      .join("\n\n---\n\n");

    const userInput = `Task: ${body.task}\n\n${promptsList}`;
    const comparison = await generateJSON<ComparisonResult>(COMPARE_PROMPT, userInput);

    return NextResponse.json(comparison);
  } catch (error) {
    console.error("Compare API error:", error);
    return NextResponse.json<ApiError>(
      {
        error: "Failed to compare prompts",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
