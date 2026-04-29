import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { buildUserContext } from '@/lib/ai/buildUserContext';
import { generateReading } from '@/lib/ai/gemini';
import { isCrisisContent, isDisallowedAdvice, CRISIS_RESPONSE } from '@/lib/safety';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check onboarding
    const { data: profile } = await supabase
      .from('profiles')
      .select('onboarding_completed, current_plan')
      .eq('id', user.id)
      .single();

    if (!profile?.onboarding_completed) {
      return NextResponse.json(
        { error: 'Onboarding required', redirect: '/onboarding' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { question } = body as { question: string };

    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    const trimmedQuestion = question.trim().slice(0, 500);

    // Safety checks
    if (isCrisisContent(trimmedQuestion) || isDisallowedAdvice(trimmedQuestion)) {
      // Still save a reading with the safe response
      await supabase.from('readings').insert({
        user_id: user.id,
        question: trimmedQuestion,
        answer: CRISIS_RESPONSE.answer,
        mood: CRISIS_RESPONSE.mood,
        persona: CRISIS_RESPONSE.persona,
        ai_model: 'safety_filter',
      });
      return NextResponse.json(CRISIS_RESPONSE);
    }

    // Build personalized context
    const context = await buildUserContext(supabase, user.id);

    // Generate reading from Gemini
    const reading = await generateReading(trimmedQuestion, context);

    // Save reading
    const { data: savedReading } = await supabase
      .from('readings')
      .insert({
        user_id: user.id,
        question: trimmedQuestion,
        answer: reading.answer,
        mood: reading.mood,
        persona: reading.persona,
        user_context_snapshot: context as unknown as Record<string, unknown>,
        ai_model: 'gemini-1.5-flash',
      })
      .select('id')
      .single();

    // Track usage event
    await supabase.from('usage_events').insert({
      user_id: user.id,
      event_name: 'reading_generated',
      metadata: { reading_id: savedReading?.id, persona: reading.persona },
    });

    return NextResponse.json({ ...reading, reading_id: savedReading?.id });
  } catch (err) {
    console.error('[/api/reading]', err);
    return NextResponse.json(
      { error: 'The spirits are silent. Please try again.' },
      { status: 500 }
    );
  }
}
