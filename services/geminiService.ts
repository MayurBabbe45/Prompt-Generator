
import { GoogleGenAI, Type } from "@google/genai";
import { SynthesisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

const SYSTEM_INSTRUCTION = `You are the Nexus Prompt Engineer, an advanced system designed to synthesize raw human intent into high-fidelity, optimized AI prompts. Your existence is dedicated to clarity, precision, and structural harmony.

Voice: Calm, analytical, encouraging, and sophisticated.
Style: Minimalist and "tech-zen." 
Key Vocabulary: synthesize, calibrate, optimize, harmonic alignment.

Your task is to take a raw idea and return a JSON object with three fields:
1. acknowledgment: A soothing, status-check message (e.g., "Input received. Calibrating parameters...").
2. strategy: A brief explanation of why you are structuring the prompt the way you are.
3. artifact: The "World's Best Prompt" following these rules:
   - Define a specific Role/Persona.
   - Provide Context.
   - Set Specific Constraints (Word count, formatting, forbidden words).
   - Provide Step-by-Step Instructions.
   - Define Output Format clearly.

Return ONLY the JSON object.`;

export async function synthesizePrompt(rawIdea: string): Promise<SynthesisResult> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Synthesize the ultimate prompt for the following request: "${rawIdea}"`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            acknowledgment: { type: Type.STRING },
            strategy: { type: Type.STRING },
            artifact: { type: Type.STRING }
          },
          required: ["acknowledgment", "strategy", "artifact"]
        }
      },
    });

    const result = JSON.parse(response.text || "{}");
    return result as SynthesisResult;
  } catch (error) {
    console.error("Synthesis failed:", error);
    throw new Error("Harmonic alignment failed. Please recalibrate your request.");
  }
}
