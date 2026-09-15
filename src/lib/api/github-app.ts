const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export function installGitHubApp(): void {
  window.location.href = `${API_URL}/api/github/app/install`;
}
