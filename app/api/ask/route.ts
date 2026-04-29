import { NextRequest, NextResponse } from "next/server";
import { askSpirit, SPIRITS } from "@/lib/gemini";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { question, spirit, sessionId } = await req.json();
    if (!question || !spirit || !SPIRITS[spirit as keyof typeof SPIRITS])
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });

    const supabaseAdmin = getSupabaseAdmin();
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    const today = new Date().toISOString().split("T")[0];

    // Rate-limit check — gracefully skip if table doesn't exist yet
    let sessionCount = 0;
    try {
      const { count } = await supabaseAdmin
        .from("sessions")
        .select("*", { count: "exact", head: true })
        .eq("ip_address", ip)
        .gte("created_at", `${today}T00:00:00`);
      sessionCount = count ?? 0;
    } catch {
      // Table not yet created — allow request through
    }

    if (sessionCount >= 10)
      return NextResponse.json({ error: "FREE_LIMIT_REACHED" }, { status: 429 });

    // Call Gemini AI
    const answer = await askSpirit(question, spirit as keyof typeof SPIRITS);

    // Log session — gracefully skip if table doesn't exist yet
    try {
      await supabaseAdmin
        .from("sessions")
        .insert({ session_id: sessionId, ip_address: ip, spirit, question, answer });
    } catch {
      // Table not yet created — log skipped
    }

    return NextResponse.json({ answer });
  } catch (err) {
    console.error("[/api/ask] Error:", err);
    return NextResponse.json({ error: "Spirit unavailable" }, { status: 500 });
  }
}
