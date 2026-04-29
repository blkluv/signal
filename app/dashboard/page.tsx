"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Session {
  id: string;
  spirit: string;
  question: string;
  answer: string;
  created_at: string;
}

export default function DashboardPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSessions() {
      try {
        const res = await fetch("/api/sessions");
        if (res.ok) {
          const data = await res.json();
          setSessions(data.sessions ?? []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchSessions();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-purple-400">🕯️ Spirit Signal Dashboard</h1>
          <Link href="/" className="text-sm text-purple-300 hover:text-purple-100 underline">
            ← Back to Board
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-purple-900/30 border border-purple-700 rounded-xl p-4">
            <p className="text-xs text-purple-400 uppercase tracking-wider">Total Sessions</p>
            <p className="text-4xl font-bold mt-1">{sessions.length}</p>
          </div>
          <div className="bg-purple-900/30 border border-purple-700 rounded-xl p-4">
            <p className="text-xs text-purple-400 uppercase tracking-wider">Spirits Called</p>
            <p className="text-4xl font-bold mt-1">
              {new Set(sessions.map((s) => s.spirit)).size}
            </p>
          </div>
          <div className="bg-purple-900/30 border border-purple-700 rounded-xl p-4">
            <p className="text-xs text-purple-400 uppercase tracking-wider">Most Popular Spirit</p>
            <p className="text-2xl font-bold mt-1 capitalize">
              {sessions.length > 0
                ? Object.entries(
                    sessions.reduce((acc: Record<string, number>, s) => {
                      acc[s.spirit] = (acc[s.spirit] ?? 0) + 1;
                      return acc;
                    }, {})
                  ).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—"
                : "—"}
            </p>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold text-purple-300">Recent Sessions</h2>
          </div>
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading sessions...</div>
          ) : sessions.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No sessions yet. Ask the spirits something!</div>
          ) : (
            <div className="divide-y divide-gray-800">
              {sessions.slice(0, 20).map((s) => (
                <div key={s.id} className="px-6 py-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-800 text-purple-200">
                      {s.spirit}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(s.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">❓ {s.question}</p>
                  <p className="text-sm text-purple-200 mt-1">👻 {s.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
