"use client";

import { useRouter } from "next/navigation";
import { Grid2X2, Check } from "lucide-react";
import { GitHub } from "@/components/GitHubIcon";
import { startDemoSession } from "@/lib/demo-session";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  const router = useRouter();

  function handleDemoSignIn() {
    startDemoSession("GitHub sign-in simulated successfully.");
    router.push("/dashboard/");
  }

  function handleDemoInstall() {
    startDemoSession("GitHub App installation simulated successfully.");
    router.push("/dashboard/");
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <button
            onClick={() => router.push("/")}
            className="text-sm font-semibold tracking-tight"
          >
            RepoPass
          </button>

          <span className="text-xs text-muted-foreground">
            GitHub access setup
          </span>
        </div>
      </header>

      <div className="mx-auto flex min-h-[calc(100vh-57px)] w-full max-w-lg flex-col justify-center px-6 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Set up RepoPass
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Connect your GitHub account, then authorize RepoPass to access
            your repositories.
          </p>
        </div>

        <div className="mb-8 flex items-center">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <GitHub className="size-4" />
            </div>

            <span className="text-sm font-medium">Sign in</span>
          </div>

          <Separator className="mx-3 flex-1" />

          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="flex size-7 items-center justify-center rounded-full border">
              <Grid2X2 className="size-4" />
            </div>

            <span className="text-sm">Install App</span>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <GitHub className="size-5" />
                </div>

                <div className="flex-1">
                  <Badge variant="secondary" className="mb-2 font-mono text-[10px]">
                    STEP 1
                  </Badge>

                  <CardTitle className="text-base">
                    Sign in with GitHub
                  </CardTitle>

                  <CardDescription className="mt-1">
                    Create or access your RepoPass account using your GitHub
                    identity.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <Button onClick={handleDemoSignIn} className="w-full sm:w-auto">
                <GitHub />
                Continue with GitHub
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-muted/40">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-background text-muted-foreground">
                  <Grid2X2 className="size-5" />
                </div>

                <div className="flex-1">
                  <Badge variant="outline" className="mb-2 font-mono text-[10px]">
                    STEP 2
                  </Badge>

                  <CardTitle className="text-base">
                    Install GitHub App
                  </CardTitle>

                  <CardDescription className="mt-1">
                    Install the RepoPass GitHub App on your personal account or
                    organization and choose which repositories RepoPass can
                    access.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <Button
                variant="outline"
                onClick={handleDemoInstall}
                className="w-full sm:w-auto"
              >
                <Grid2X2 />
                Install GitHub App
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 bg-muted/40">
          <CardHeader className="pb-3">
            <CardTitle className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Why two steps?
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3 text-xs text-muted-foreground">
            <div className="flex gap-2">
              <Check className="mt-0.5 size-3.5 shrink-0 text-foreground" />

              <p>
                <span className="font-medium text-foreground">
                  GitHub sign-in
                </span>{" "}
                establishes your RepoPass identity.
              </p>
            </div>

            <div className="flex gap-2">
              <Check className="mt-0.5 size-3.5 shrink-0 text-foreground" />

              <p>
                <span className="font-medium text-foreground">
                  GitHub App installation
                </span>{" "}
                authorizes RepoPass to access your selected repositories.
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          Reviewers access shared links directly and do not need a RepoPass
          account.
        </p>
      </div>
    </main>
  );
}
