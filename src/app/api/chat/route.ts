import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { SYSTEM_PROMPT } from "@/lib/constants";

export const maxDuration = 30;

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: groq("llama-3.1-8b-instant"),
      system: SYSTEM_PROMPT,
      messages,
      maxTokens: 2048,
    });

    return result.toDataStreamResponse();
  } catch (error: unknown) {
    const err = error as Error & { status?: number; message?: string };
    console.error("FULL ERROR:", JSON.stringify(err, null, 2));
    console.error("ERROR MESSAGE:", err?.message);
    console.error("ERROR STATUS:", err?.status);
    return new Response(
      JSON.stringify({ error: err?.message || "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}