import { NextRequest, NextResponse } from "next/server";
import { generateJSON } from "@/lib/gemini";
import { ANALYZER_PROMPT } from "@/prompts/analyzer";
import type { PromptAnalysis, AnalyzeRequest, ApiError } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: AnalyzeRequest = await request.json();

    if (!body.task || !body.prompt) {
      return NextResponse.json<ApiError>(
        { error: "Both 'task' and 'prompt' fields are required" },
        { status: 400 }
      );
    }

    const userInput = `Task: ${body.task}\n\nPrompt to analyze:\n${body.prompt}`;
    const analysis = await generateJSON<PromptAnalysis>(ANALYZER_PROMPT, userInput);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Analyze API error:", error);
    return NextResponse.json<ApiError>(
      {
        error: "Failed to analyze prompt",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
