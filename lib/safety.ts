// Safety layer: detect crisis / harmful content requests
// Spirit Signal is for entertainment only. These patterns trigger a safe redirect response.

const CRISIS_PATTERNS = [
  /\b(suicide|kill\s*(my)?self|end\s*(my)?life|self[- ]?harm|cut\s*myself|overdose|hurt\s*myself)\b/i,
  /\b(i\s*want\s*to\s*die|i\s*don\'t\s*want\s*to\s*live|not\s*worth\s*living)\b/i,
  /\b(abuse|domestic\s*violence|being\s*hurt|someone\s*is\s*hurting\s*me)\b/i,
  /\b(medical\s*emergency|heart\s*attack|can't\s*breathe|stroke|911|call\s*an\s*ambulance)\b/i,
];

const DISALLOWED_ADVICE_PATTERNS = [
  /\b(should\s*i\s*take\s*(the\s*)?medication|what\s*dosage|prescribe|diagnose)\b/i,
  /\b(invest\s*my\s*money|buy\s*(the\s*)?stock|financial\s*advice)\b/i,
  /\b(is\s*this\s*legal|sue|legal\s*advice|my\s*lawyer)\b/i,
];

export function isCrisisContent(text: string): boolean {
  return CRISIS_PATTERNS.some((p) => p.test(text));
}

export function isDisallowedAdvice(text: string): boolean {
  return DISALLOWED_ADVICE_PATTERNS.some((p) => p.test(text));
}

export const CRISIS_RESPONSE = {
  answer:
    'The spirits sense a heaviness in your question that goes beyond the veil. Please reach out to someone who can truly help. If you are in crisis, call or text 988 (Suicide & Crisis Lifeline in the US) or contact your local emergency services. You are not alone.',
  mood: 'comforting' as const,
  persona: 'The Guardian',
  symbols: ['\u2665'],
  suggested_followups: [
    'I am safe and just exploring deep questions',
    'What can I do to feel more hopeful today?',
    'What strength does the board see in me?',
  ],
};

export const DISCLAIMER =
  'Spirit Signal is for entertainment and self-reflection only. AI responses are generated using your profile and symbolic inputs. They should not be treated as factual, spiritual, medical, legal, financial, or emergency guidance.';
