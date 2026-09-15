"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError } from "@/lib/api/client";
import { CurrentUser, getCurrentUser, logout } from "@/lib/api/auth";

export default function DashboardPage() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
          router.replace("/login");
          return;
        }

        if (!currentUser.onboarding_completed) {
          router.replace("/login");
          return;
        }

        setUser(currentUser);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load your account.",
        );
      } finally {
        setLoading(false);
      }
    }

    void loadUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      setError(null);

      await logout();
      router.replace("/login");
    } catch (err) {
      setError(
        err instanceof ApiError || err instanceof Error
          ? err.message
          : "Unable to log out.",
      );
    } finally {
      setLoggingOut(false);
    }
  };

  if (loading || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </main>
    );
  }

  const displayName = user.name || user.login;

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="text-sm font-bold tracking-tight">RepoPass</div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="text-xs font-medium text-muted-foreground hover:text-foreground disabled:opacity-50"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="max-w-xl">
          <div className="mb-8">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Dashboard
            </p>

            <h1 className="text-2xl font-bold tracking-tight">
              Welcome, {displayName}
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Your RepoPass account is connected to GitHub.
            </p>
          </div>

          <section className="rounded-lg border bg-background p-6">
            <div className="flex items-center gap-4">
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt=""
                  className="size-12 rounded-full"
                />
              ) : (
                <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  {user.login.charAt(0).toUpperCase()}
                </div>
              )}

              <div>
                <div className="text-sm font-semibold">{user.login}</div>

                {user.email && (
                  <div className="text-xs text-muted-foreground">
                    {user.email}
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="mt-4 rounded-lg border bg-background p-6">
            <h2 className="text-sm font-semibold">GitHub App</h2>

            <p className="mt-2 text-xs text-muted-foreground">
              Repository access configuration will be available here once the
              GitHub App installation flow is connected.
            </p>
          </section>

          {error && (
            <p className="mt-4 text-xs text-destructive">{error}</p>
          )}
        </div>
      </main>
    </div>
  );
}
