import { NextRequest, NextResponse } from "next/server";
import { generateJSON } from "@/lib/gemini";
import { OPTIMIZER_PROMPT } from "@/prompts/optimizer";
import type { OptimizationResult, OptimizeRequest, ApiError } from "@/types";

interface OptimizerResponse {
  score: OptimizationResult["score"];
  rewrittenPrompt: string;
  improvements: OptimizationResult["improvements"];
}

export async function POST(request: NextRequest) {
  try {
    const body: OptimizeRequest = await request.json();

    if (!body.task || !body.prompt) {
      return NextResponse.json<ApiError>(
        { error: "Both 'task' and 'prompt' fields are required" },
        { status: 400 }
      );
    }

    const userInput = `Task: ${body.task}\n\nOriginal Prompt:\n${body.prompt}`;
    const result = await generateJSON<OptimizerResponse>(OPTIMIZER_PROMPT, userInput);

    const optimizationResult: OptimizationResult = {
      originalPrompt: body.prompt,
      rewrittenPrompt: result.rewrittenPrompt,
      score: result.score,
      improvements: result.improvements,
      task: body.task,
    };

    return NextResponse.json(optimizationResult);
  } catch (error) {
    console.error("Optimize API error:", error);
    return NextResponse.json<ApiError>(
      {
        error: "Failed to optimize prompt",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
