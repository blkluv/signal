import type { SupabaseClient } from '@supabase/supabase-js';

export interface UserContext {
  firstName: string | null;
  displayName: string | null;
  birthDate: string | null;
  birthTime: string | null;
  birthCity: string | null;
  birthCountry: string | null;
  symbolicSunSign: string | null;
  symbolicBirthSignal: string | null;
  mainIntention: string | null;
  desiredTone: string | null;
  preferredPersona: string | null;
  beliefStyle: string | null;
  fearLevel: string | null;
  emotionalSensitivity: string | null;
  topicsToAvoid: string[];
  currentLifeChallenge: string | null;
  currentPlan: string | null;
}

export async function buildUserContext(
  supabase: SupabaseClient,
  userId: string
): Promise<UserContext> {
  const [profileResult, birthResult, prefResult] = await Promise.all([
    supabase
      .from('profiles')
      .select(
        'first_name, display_name, current_plan'
      )
      .eq('id', userId)
      .single(),
    supabase
      .from('birth_profiles')
      .select(
        'birth_date, birth_time, birth_city, birth_country, symbolic_sun_sign, symbolic_birth_signal'
      )
      .eq('user_id', userId)
      .maybeSingle(),
    supabase
      .from('user_preferences')
      .select(
        'main_intention, desired_tone, preferred_persona, belief_style, fear_level, emotional_sensitivity, topics_to_avoid, current_life_challenge'
      )
      .eq('user_id', userId)
      .maybeSingle(),
  ]);

  const profile = profileResult.data;
  const birth = birthResult.data;
  const prefs = prefResult.data;

  return {
    firstName: profile?.first_name ?? null,
    displayName: profile?.display_name ?? null,
    currentPlan: profile?.current_plan ?? 'free',
    birthDate: birth?.birth_date ?? null,
    birthTime: birth?.birth_time ?? null,
    birthCity: birth?.birth_city ?? null,
    birthCountry: birth?.birth_country ?? null,
    symbolicSunSign: birth?.symbolic_sun_sign ?? null,
    symbolicBirthSignal: birth?.symbolic_birth_signal ?? null,
    mainIntention: prefs?.main_intention ?? null,
    desiredTone: prefs?.desired_tone ?? null,
    preferredPersona: prefs?.preferred_persona ?? null,
    beliefStyle: prefs?.belief_style ?? null,
    fearLevel: prefs?.fear_level ?? null,
    emotionalSensitivity: prefs?.emotional_sensitivity ?? null,
    topicsToAvoid: prefs?.topics_to_avoid ?? [],
    currentLifeChallenge: prefs?.current_life_challenge ?? null,
  };
}
