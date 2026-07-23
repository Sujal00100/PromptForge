import Groq from "groq-sdk";

const getGroqClient = () => {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY environment variable is not set");
  }
  return new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
};

const MODEL = "llama-3.3-70b-versatile";

export async function generateJSON<T>(
  systemPrompt: string,
  userInput: string
): Promise<T> {
  try {
    const chatCompletion = await getGroqClient().chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userInput },
      ],
      model: MODEL,
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const text = chatCompletion.choices[0]?.message?.content;
    if (!text) {
      throw new Error("Empty response from Groq");
    }

    return JSON.parse(text) as T;
  } catch (error) {
    console.error("Groq API Error:", error);
    throw new Error(
      `AI generation failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

export async function generateText(
  systemPrompt: string,
  userInput: string
): Promise<string> {
  try {
    const chatCompletion = await getGroqClient().chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userInput },
      ],
      model: MODEL,
      temperature: 0.7,
    });

    const text = chatCompletion.choices[0]?.message?.content;
    if (!text) {
      throw new Error("Empty response from Groq");
    }

    return text;
  } catch (error) {
    console.error("Groq API Error:", error);
    throw new Error(
      `AI generation failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
