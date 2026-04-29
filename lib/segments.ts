import { createClient } from '@/lib/supabase/client';

export type SegmentKey =
  | 'love_seeker'
  | 'career_money'
  | 'grief_closure'
  | 'astrology_focused'
  | 'paranormal_fan'
  | 'high_intent_buyer'
  | 'daily_content_subscriber'
  | 'premium_report_candidate';

export async function assignSegments(
  userId: string,
  preferences: {
    mainIntention?: string | null;
    beliefStyle?: string | null;
    contentPreferences?: string[] | null;
    emailFrequency?: string | null;
    currentPlan?: string | null;
  }
): Promise<void> {
  const supabase = createClient();
  const segments: SegmentKey[] = [];

  if (
    preferences.mainIntention === 'love_relationships' ||
    preferences.mainIntention === 'decision_guidance'
  ) {
    segments.push('love_seeker');
  }
  if (preferences.mainIntention === 'career_money') {
    segments.push('career_money');
  }
  if (preferences.mainIntention === 'grief_closure') {
    segments.push('grief_closure');
  }
  if (preferences.beliefStyle === 'astrology_focused') {
    segments.push('astrology_focused');
  }
  if (preferences.beliefStyle === 'paranormal_fan') {
    segments.push('paranormal_fan');
  }
  if (preferences.emailFrequency === 'daily') {
    segments.push('daily_content_subscriber');
  }
  if (
    preferences.contentPreferences?.includes('natal_insights') ||
    preferences.contentPreferences?.includes('compatibility_reports') ||
    preferences.contentPreferences?.includes('premium_ritual_content')
  ) {
    segments.push('premium_report_candidate');
  }
  if (preferences.currentPlan && preferences.currentPlan !== 'free') {
    segments.push('high_intent_buyer');
  }

  if (segments.length === 0) return;

  const rows = segments.map((key) => ({
    user_id: userId,
    segment_key: key,
    source: 'onboarding',
  }));

  await supabase.from('email_segments').upsert(rows, {
    onConflict: 'user_id, segment_key',
    ignoreDuplicates: true,
  });
}
