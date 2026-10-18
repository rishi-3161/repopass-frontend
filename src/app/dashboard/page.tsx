
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  endDemoSession,
  getDemoUser,
  startDemoSession,
} from "@/lib/demo-session";

type DemoUser = NonNullable<ReturnType<typeof getDemoUser>>;

const FALLBACK_USER = {
  login: "demo-user",
  name: "Demo User",
  email: "demo@example.com",
} as DemoUser;

export default function DashboardPage() {
  // Start with a usable demo user so the page never depends on a fetch.
  const [user, setUser] = useState<DemoUser>(FALLBACK_USER);
  const [notice, setNotice] = useState(
    "Dashboard opened successfully in demo mode."
  );
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      let currentUser = getDemoUser();

      if (!currentUser) {
        try {
          startDemoSession(
            "Demo session started successfully."
          );
          currentUser = getDemoUser();
        } catch (error) {
          console.warn(
            "Could not create demo session; using fallback account.",
            error
          );
        }
      }

      // Never leave the dashboard waiting for a session.
      setUser(currentUser ?? FALLBACK_USER);

      try {
        const success = window.sessionStorage.getItem(
          "repopass-demo-success"
        );

        if (success) {
          setNotice(success);
          window.sessionStorage.removeItem(
            "repopass-demo-success"
          );
        }
      } catch {
        // Storage may be unavailable; keep the default success notice.
      }
    } catch (error) {
      console.warn(
        "Demo session loading failed; using fallback account.",
        error
      );

      setUser(FALLBACK_USER);
      setNotice(
        "Dashboard loaded successfully using the fallback demo account."
      );
    }
  }, []);

  function handleLogout() {
    setLoggingOut(true);

    try {
      endDemoSession();
    } catch (error) {
      console.warn("Could not clear demo session.", error);
    }

    setNotice("Demo session ended successfully.");
    router.push("/login/");
  }

  const displayName = user.name || user.login;

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <a
            href="/repopass-frontend/"
            className="text-sm font-bold tracking-tight"
          >
            RepoPass
          </a>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="text-xs font-medium text-muted-foreground hover:text-foreground disabled:opacity-50"
          >
            {loggingOut ? "Logging out…" : "Logout"}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="max-w-xl">
          <div className="mb-8">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Dashboard · Demo mode
            </p>

            <h1 className="text-2xl font-bold tracking-tight">
              Welcome, {displayName}
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              You're viewing the RepoPass frontend test dashboard.
              No backend or real GitHub authorization is required.
            </p>
          </div>

          {notice && (
            <div
              role="status"
              className="mb-4 rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800"
            >
              {notice}
            </div>
          )}

          <section className="rounded-lg border bg-background p-6">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-muted text-lg font-semibold text-foreground">
                {user.login.charAt(0).toUpperCase()}
              </div>

              <div>
                <div className="text-sm font-semibold">
                  {user.login}
                </div>

                {user.email && (
                  <div className="text-xs text-muted-foreground">
                    {user.email}
                  </div>
                )}

                <div className="mt-1 text-xs text-green-700">
                  Demo account connected
                </div>
              </div>
            </div>
          </section>

          <section className="mt-4 rounded-lg border bg-background p-6">
            <h2 className="text-sm font-semibold">GitHub App</h2>

            <p className="mt-2 text-xs text-muted-foreground">
              Mock installation is enabled for frontend testing.
              These actions do not install an actual GitHub App or
              grant repository access.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() =>
                  setNotice(
                    "GitHub App status check successful (simulated)."
                  )
                }
                className="rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90"
              >
                Check installation
              </button>

              <button
                type="button"
                onClick={() =>
                  setNotice(
                    "Demo repository list loaded successfully."
                  )
                }
                className="rounded-md border px-4 py-2 text-xs font-medium hover:bg-muted"
              >
                Load repositories
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
