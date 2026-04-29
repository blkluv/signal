// Birth Signal Profile — symbolic / entertainment use only
// TODO: Replace with real astrology calculation library (e.g. astronomia, astrology.js) for accurate natal charts

export interface BirthSignalProfile {
  sunSign: string;
  birthSignalArchetype: string;
  personaAlignment: string;
  emotionalTone: string;
  suggestedThemes: string[];
  profileSummary: string;
}

const SUN_SIGNS = [
  { name: 'Capricorn', start: [12, 22], end: [1, 19] },
  { name: 'Aquarius', start: [1, 20], end: [2, 18] },
  { name: 'Pisces', start: [2, 19], end: [3, 20] },
  { name: 'Aries', start: [3, 21], end: [4, 19] },
  { name: 'Taurus', start: [4, 20], end: [5, 20] },
  { name: 'Gemini', start: [5, 21], end: [6, 20] },
  { name: 'Cancer', start: [6, 21], end: [7, 22] },
  { name: 'Leo', start: [7, 23], end: [8, 22] },
  { name: 'Virgo', start: [8, 23], end: [9, 22] },
  { name: 'Libra', start: [9, 23], end: [10, 22] },
  { name: 'Scorpio', start: [10, 23], end: [11, 21] },
  { name: 'Sagittarius', start: [11, 22], end: [12, 21] },
];

export function getSunSign(birthDate: string): string {
  const d = new Date(birthDate);
  const month = d.getUTCMonth() + 1;
  const day = d.getUTCDate();

  for (const sign of SUN_SIGNS) {
    const [sm, sd] = sign.start;
    const [em, ed] = sign.end;
    if (sm <= em) {
      if ((month === sm && day >= sd) || (month === em && day <= ed)) return sign.name;
    } else {
      // Wraps year (Capricorn)
      if ((month === sm && day >= sd) || (month === em && day <= ed)) return sign.name;
    }
  }
  return 'Capricorn';
}

const ARCHETYPES: Record<string, string> = {
  Aries: 'The Flame Bearer',
  Taurus: 'The Earth Keeper',
  Gemini: 'The Signal Weaver',
  Cancer: 'The Tide Walker',
  Leo: 'The Solar Emissary',
  Virgo: 'The Pattern Reader',
  Libra: 'The Scale Holder',
  Scorpio: 'The Veil Crosser',
  Sagittarius: 'The Arrow Seeker',
  Capricorn: 'The Stone Whisperer',
  Aquarius: 'The Current Rider',
  Pisces: 'The Dream Dweller',
};

const EMOTIONAL_TONES: Record<string, string> = {
  Aries: 'Fierce & Immediate',
  Taurus: 'Deep & Sensory',
  Gemini: 'Quick & Curious',
  Cancer: 'Intuitive & Protective',
  Leo: 'Radiant & Intense',
  Virgo: 'Precise & Observant',
  Libra: 'Balanced & Romantic',
  Scorpio: 'Magnetic & Hidden',
  Sagittarius: 'Expansive & Free',
  Capricorn: 'Steady & Ambitious',
  Aquarius: 'Detached & Visionary',
  Pisces: 'Fluid & Empathic',
};

const PERSONA_ALIGNMENTS: Record<string, string> = {
  Aries: 'The Trickster',
  Taurus: 'The Ancestor',
  Gemini: 'The Trickster',
  Cancer: 'The Guardian',
  Leo: 'The Oracle',
  Virgo: 'The Oracle',
  Libra: 'The Lover',
  Scorpio: 'The Shadow',
  Sagittarius: 'The Oracle',
  Capricorn: 'The Ancestor',
  Aquarius: 'The Oracle',
  Pisces: 'The Guardian',
};

const SUGGESTED_THEMES: Record<string, string[]> = {
  Aries: ['courage', 'new beginnings', 'rivalry', 'passion'],
  Taurus: ['abundance', 'stability', 'hidden wealth', 'sensuality'],
  Gemini: ['duality', 'communication', 'choices', 'hidden messages'],
  Cancer: ['family', 'the past', 'intuition', 'protection'],
  Leo: ['recognition', 'legacy', 'love', 'power'],
  Virgo: ['health', 'patterns', 'service', 'hidden details'],
  Libra: ['relationships', 'justice', 'beauty', 'decisions'],
  Scorpio: ['transformation', 'secrets', 'death & rebirth', 'obsession'],
  Sagittarius: ['travel', 'truth', 'philosophy', 'expansion'],
  Capricorn: ['ambition', 'time', 'legacy', 'hidden authority'],
  Aquarius: ['revolution', 'community', 'future visions', 'strange signs'],
  Pisces: ['dreams', 'grief', 'surrender', 'mysticism'],
};

export function buildBirthSignalProfile(
  birthDate: string,
  preferredPersona?: string | null
): BirthSignalProfile {
  const sunSign = getSunSign(birthDate);
  const archetype = ARCHETYPES[sunSign] ?? 'The Signal Bearer';
  const personaAlignment = preferredPersona ?? PERSONA_ALIGNMENTS[sunSign] ?? 'The Oracle';
  const emotionalTone = EMOTIONAL_TONES[sunSign] ?? 'Mysterious';
  const suggestedThemes = SUGGESTED_THEMES[sunSign] ?? ['the unknown', 'hidden truths'];

  const profileSummary = `Your symbolic birth signal marks you as ${archetype} — born under ${sunSign}, you carry the energetic frequency of ${emotionalTone.toLowerCase()} perception. The spirits suggest your questions tend toward ${suggestedThemes.slice(0, 2).join(' and ')}. Your natural spirit alignment is with ${personaAlignment}.`;

  return {
    sunSign,
    birthSignalArchetype: archetype,
    personaAlignment,
    emotionalTone,
    suggestedThemes,
    profileSummary,
  };
}
