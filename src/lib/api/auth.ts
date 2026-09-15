import { ApiError, apiFetch } from "./client";

export interface CurrentUser {
  id: string;
  login: string;
  name: string | null;
  email: string | null;
  avatar_url: string | null;
  onboarding_completed: boolean;
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    return await apiFetch<CurrentUser>("/api/auth/me");
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return null;
    }

    throw error;
  }
}

export function signInWithGitHub(): void {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL ?? ""}/api/auth/github/login`;
}

export async function logout(): Promise<void> {
  await apiFetch("/api/auth/logout", {
    method: "POST",
  });
}
