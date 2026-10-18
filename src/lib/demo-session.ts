const DEMO_USER = {
  id: "demo-user-1",
  login: "repopass-demo",
  name: "RepoPass Demo",
  email: "demo@repopass.local",
  avatar_url: null,
  onboarding_completed: true,
};

export function startDemoSession(message = "Demo sign-in successful."): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem("repopass-demo-user", JSON.stringify(DEMO_USER));
  window.sessionStorage.setItem("repopass-demo-success", message);
}

export function endDemoSession(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem("repopass-demo-user");
}

export function getDemoUser() {
  if (typeof window === "undefined") return null;
  const saved = window.localStorage.getItem("repopass-demo-user");
  if (!saved) return null;

  try {
    return JSON.parse(saved) as typeof DEMO_USER;
  } catch {
    window.localStorage.removeItem("repopass-demo-user");
    return null;
  }
}
