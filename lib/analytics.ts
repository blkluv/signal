import { createClient } from '@/lib/supabase/client';

export type AnalyticsEvent =
  | 'landing_view'
  | 'register_started'
  | 'register_completed'
  | 'onboarding_started'
  | 'onboarding_step_completed'
  | 'onboarding_completed'
  | 'dashboard_viewed'
  | 'ask_started'
  | 'question_submitted'
  | 'reading_generated'
  | 'paywall_seen'
  | 'pricing_click'
  | 'checkout_started'
  | 'purchase_completed'
  | 'profile_updated'
  | 'email_consent_given';

export async function trackEvent(
  event: AnalyticsEvent,
  metadata?: Record<string, unknown>,
  userId?: string
): Promise<void> {
  if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.log('[Spirit Signal Analytics]', event, metadata);
    return;
  }

  try {
    const supabase = createClient();
    await supabase.from('usage_events').insert({
      user_id: userId ?? null,
      event_name: event,
      metadata: metadata ?? {},
    });
  } catch (err) {
    // Non-fatal — never throw analytics errors
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Analytics error]', err);
    }
  }
}
