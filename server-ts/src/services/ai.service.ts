import { ai } from "../config/gemini";
import { buildContext } from "./aiContext.service";

export const testGemini = async () => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Say Hello",
  });

  console.log(response.text);
};



export const askAI = async (question: string) => {
  const context = await buildContext();

  const prompt = `
You are an AI Admission Assistant.

Below is the current database.

${JSON.stringify(context, null, 2)}

Answer ONLY using this data.

Question:
${question}

If the answer is not available in the data, say:
"I couldn't find that information in the database."
`;

  try {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
} catch (error) {
  console.error("Gemini Error:", error);

  return "AI service is temporarily unavailable.";
}
};