"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthenticatedPage() {
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      setError(null);

      await logout();
      onLoggedOut();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to log out.',
      );
    } finally {
      setLoggingOut(false);
    }
  };

  const displayName = user.name || user.login;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="text-[15px] font-bold text-slate-900">
            RepoPass
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="px-3 py-1.5 border border-slate-200 rounded-md text-[12px] font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            {loggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="max-w-xl">
          <div className="mb-8">
            <p className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-2">
              Authenticated
            </p>

            <h1 className="text-[28px] font-bold text-slate-900">
              Welcome, {displayName}
            </h1>

            <p className="mt-2 text-[14px] text-slate-500">
              Your RepoPass account is connected to GitHub.
            </p>
          </div>

          <section className="border border-slate-200 rounded-lg bg-white p-6">
            <div className="flex items-center gap-4">
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  {user.login.charAt(0).toUpperCase()}
                </div>
              )}

              <div>
                <div className="text-[15px] font-semibold text-slate-900">
                  {user.login}
                </div>

                {user.email && (
                  <div className="text-[12px] text-slate-500">
                    {user.email}
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="mt-4 border border-slate-200 rounded-lg bg-white p-6">
            <h2 className="text-[14px] font-semibold text-slate-900">
              GitHub App
            </h2>

            <p className="mt-2 text-[12px] text-slate-500">
              Repository access configuration will be available
              here once the GitHub App installation flow is
              connected.
            </p>
          </section>

          {error && (
            <p className="mt-4 text-[12px] text-red-600">
              {error}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
