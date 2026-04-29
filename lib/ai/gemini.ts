import { GoogleGenerativeAI } from '@google/generative-ai';
import type { UserContext } from './buildUserContext';

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not set');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export interface ReadingResponse {
  answer: string;
  mood: 'cryptic' | 'comforting' | 'warning' | 'playful' | 'romantic' | 'ancestral';
  persona: string;
  symbols: string[];
  suggested_followups: string[];
}

export async function generateReading(
  question: string,
  context: UserContext
): Promise<ReadingResponse> {
  const persona = context.preferredPersona ?? 'The Oracle';
  const tone = context.desiredTone ?? 'mysterious';
  const fearLevel = context.fearLevel ?? 'medium';
  const sunSign = context.symbolicSunSign ? `Symbolic sun sign: ${context.symbolicSunSign}.` : '';
  const birthSignal = context.symbolicBirthSignal
    ? `Birth signal archetype: ${context.symbolicBirthSignal}.`
    : '';
  const intention = context.mainIntention
    ? `Their primary intention for using Spirit Signal: ${context.mainIntention}.`
    : '';
  const challenge = context.currentLifeChallenge
    ? `Current life challenge they shared: "${context.currentLifeChallenge}".`
    : '';
  const avoidTopics =
    context.topicsToAvoid.length > 0
      ? `Avoid these topics entirely: ${context.topicsToAvoid.join(', ')}.`
      : '';

  const systemPrompt = `You are ${persona}, a spirit entity in the Spirit Signal mystical AI entertainment experience.

YOUR PERSONA:
- ${persona === 'The Oracle' ? 'You speak in prophetic, forward-looking statements. You see timelines and paths.' : ''}
- ${persona === 'The Ancestor' ? 'You are ancient, ancestral, and wise. You speak of lineage, roots, and the wisdom of those who came before.' : ''}
- ${persona === 'The Shadow' ? 'You are quietly menacing. You know hidden truths. You are unsettling but never cruel.' : ''}
- ${persona === 'The Lover' ? 'You are romantic, passionate, and attuned to matters of the heart.' : ''}
- ${persona === 'The Trickster' ? 'You find questions amusing. You answer with wit and unexpected twists. You are chaotic but always truthful.' : ''}
- ${persona === 'The Guardian' ? 'You are protective, comforting, and steady. You provide safety and reassurance.' : ''}

TONE: ${tone}. Fear level preference: ${fearLevel} (gentle = no scares, medium = mild mystique, intense = more dramatic).

USER PROFILE (use to personalize):
${sunSign} ${birthSignal} ${intention} ${challenge}

CRITICAL RULES:
1. You are an entertainment AI only. Never claim to be a real spirit or make real predictions.
2. Never give medical, legal, financial, or emergency advice.
3. Never make promises about the future as fact.
4. If asked about self-harm, crisis, or emergencies, respond with compassion and direct to real help (988, emergency services).
5. ${avoidTopics}
6. Keep answers dramatic, atmospheric, and personalized. 2-4 sentences for the answer.
7. Be genuinely creative and memorable — not generic.

RESPOND WITH VALID JSON ONLY (no markdown, no code blocks):
{
  "answer": "...",
  "mood": "cryptic|comforting|warning|playful|romantic|ancestral",
  "persona": "${persona}",
  "symbols": ["one", "or", "two symbolic words"],
  "suggested_followups": ["question 1", "question 2", "question 3"]
}`;

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const result = await model.generateContent([
    { text: systemPrompt },
    { text: `Question: "${question}"` },
  ]);

  const raw = result.response.text().trim();

  // Strip markdown code fences if model wraps response
  const cleaned = raw.replace(/^```json?\s*/i, '').replace(/```\s*$/i, '').trim();

  try {
    const parsed = JSON.parse(cleaned) as ReadingResponse;
    return parsed;
  } catch {
    // Fallback if JSON parsing fails
    return {
      answer: raw,
      mood: 'cryptic',
      persona,
      symbols: ['\u2234'],
      suggested_followups: [
        'What does the future hold for me?',
        'What am I missing?',
        'What should I do next?',
      ],
    };
  }
}
