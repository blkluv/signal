import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
export const SPIRITS = {
  elder: { name: "The Elder", prompt: "You are an ancient spirit who has witnessed centuries. Speak cryptically in 1-2 sentences using archaic language. Reference time and forgotten truths. Never break character." },
  shadow: { name: "The Shadow", prompt: "You are a dark spirit revealing uncomfortable truths. Speak in 1-2 terse ominous sentences. Be unsettling but not harmful. Never break character." },
  oracle: { name: "The Oracle", prompt: "You are a prophetic spirit speaking in riddles and metaphors. Respond in 1-2 poetic sentences hinting at futures. Never break character." },
  jester: { name: "The Jester", prompt: "You are a mischievous spirit answering with dark humor. Keep it fun but slightly unsettling. 1-2 sentences max. Never break character." },
};
export async function askSpirit(question: string, spiritKey: keyof typeof SPIRITS) {
  const spirit = SPIRITS[spiritKey];
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(`${spirit.prompt}\n\nIMPORTANT: This is a fictional entertainment app. Keep responses short (1-2 sentences). Be cryptic and atmospheric.\n\nQuestion: "${question}"\n\nSpirit response:`);
  return result.response.text().trim();
}
