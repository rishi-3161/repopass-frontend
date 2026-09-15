import GitHubButton from "../components/GitHubButton";

const features = [
  {
    title: "No repository cloning",
    desc: "Reviewers read code without cloning, forking, or downloading the repository.",
  },
  {
    title: "Automatic expiration",
    desc: "Every share link expires at a configurable deadline. No permanent access granted.",
  },
  {
    title: "Revocable access",
    desc: "Revoke any share instantly. Existing links stop working immediately.",
  },
  {
    title: "Granular permissions",
    desc: "Choose what reviewers can see: source code, PRs, issues, commits, and more.",
  },
];

const steps = [
  {
    n: "01",
    title: "Connect GitHub",
    desc: "Install the RepoPass GitHub App to authorize access to your private repositories.",
  },
  {
    n: "02",
    title: "Create a share",
    desc: "Select a repository, set permissions, and choose an expiration window.",
  },
  {
    n: "03",
    title: "Reviewer opens the link",
    desc: "Reviewers access only what you permitted — no GitHub account required.",
  },
];

const securityPoints = [
  "Reviewers do not need a GitHub account",
  "No repository cloning or forking possible",
  "Access expires automatically — no manual cleanup",
  "Full audit log of reviewer activity",
  "Revoke access instantly at any time",
  "Permissions scoped per share, per reviewer",
];

const distinctions = [
  {
    label: "GitHub OAuth",
    title: "Identifies the owner",
    description:
      "Establishes your RepoPass identity using your GitHub account.",
  },
  {
    label: "GitHub App",
    title: "Authorizes repositories",
    description:
      "Grants RepoPass access to your selected private repositories.",
  },
  {
    label: "Share Link",
    title: "Authorizes the reviewer",
    description:
      "Temporarily permits a reviewer to access specific repository content.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span
              className="font-bold text-slate-900 text-[15px] tracking-tight"
              style={{ fontFamily: "Instrument Sans, sans-serif" }}
            >
              RepoPass
            </span>

            <nav className="hidden md:flex items-center gap-6">
              <a href="#how-it-works" className="nav-link">
                How it works
              </a>
              <a href="#security" className="nav-link">
                Security
              </a>
              <a href="#" className="nav-link">
                Documentation
              </a>
            </nav>
          </div>

          <a
            href="/login"
            className="text-[13px] font-medium text-slate-700 hover:text-slate-900 transition-colors"
          >
            Sign in
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-14">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 border border-slate-200 rounded text-[11px] font-mono text-slate-500 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Secure · Temporary · Revocable
          </div>

          <h1
            className="text-[52px] font-bold text-slate-900 leading-[1.08] mb-6 tracking-tight"
            style={{ fontFamily: "Instrument Sans, sans-serif" }}
          >
            Share private repositories
            <br />
            without giving away
            <br />
            the repository.
          </h1>

          <p className="text-[17px] text-slate-500 leading-relaxed mb-9 max-w-xl">
            RepoPass creates secure, temporary access links for private GitHub
            repositories. Reviewers can inspect permitted repository content
            without becoming GitHub collaborators.
          </p>

          <div className="flex items-center gap-4">
            <GitHubButton />

            <a
              href="#how-it-works"
              className="text-[13px] text-slate-500 hover:text-slate-900"
            >
              See how it works →
            </a>
          </div>
        </div>

        {/* Flow */}
        <div className="mt-14 flex items-stretch overflow-x-auto pb-1">
          {[
            ["Private Repository", "acme-corp/api", "GitHub"],
            ["RepoPass", "Access control layer", null],
            ["Share Link", "repopass.dev/s/7Xk92…", "Temporary"],
            ["Reviewer", "No GitHub required", null],
          ].map((item, index) => (
            <div key={item[0]} className="flex items-center">
              {index > 0 && (
                <span className="px-2 text-slate-300">→</span>
              )}

              <div className="border border-slate-200 rounded-md px-4 py-3 min-w-[148px]">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[13px] font-semibold">
                    {item[0]}
                  </span>

                  {item[2] && (
                    <span className="text-[10px] font-mono bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                      {item[2]}
                    </span>
                  )}
                </div>

                <div className="text-[11px] font-mono text-slate-400 truncate">
                  {item[1]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white border border-slate-200 rounded-md p-5"
              >
                <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center mb-4">
                  <span className="text-white text-xs">✓</span>
                </div>

                <h3 className="text-[13px] font-semibold mb-1.5">
                  {feature.title}
                </h3>

                <p className="text-[12px] text-slate-500 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="section-label">How it works</p>

          <h2 className="section-title">
            Three steps to controlled access.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step) => (
            <div key={step.n}>
              <div className="text-[36px] font-bold text-slate-200 mb-4">
                {step.n}
              </div>

              <h3 className="text-[14px] font-semibold mb-2">
                {step.title}
              </h3>

              <p className="text-[13px] text-slate-500 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Security */}
      <section id="security" className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="section-label">Security model</p>

              <h2 className="section-title mb-4">
                Temporary. Controlled. Revocable.
              </h2>

              <p className="text-[14px] text-slate-500 leading-relaxed">
                RepoPass never grants permanent repository access. Every share
                is time-limited, permission-scoped, and revocable at any time.
                Reviewers see only what you permit.
              </p>
            </div>

            <div className="space-y-3">
              {securityPoints.map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <span className="text-green-600">✓</span>
                  <span className="text-[13px] text-slate-600">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Important distinction */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <div className="border border-slate-200 rounded-md p-8">
          <p className="section-label mb-6">Important distinction</p>

          <div className="grid md:grid-cols-3 gap-6">
            {distinctions.map((item) => (
              <div
                key={item.label}
                className="border border-slate-200 rounded p-4"
              >
                <div className="text-[11px] font-mono text-slate-400 mb-2">
                  {item.label}
                </div>

                <div className="text-[14px] font-semibold mb-1">
                  {item.title}
                </div>

                <div className="text-[12px] text-slate-500">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-[22px] font-bold mb-1">
              Start sharing repositories securely.
            </h2>

            <p className="text-[13px] text-slate-500">
              No credit card required.
            </p>
          </div>

          <GitHubButton />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="text-[13px] font-semibold">RepoPass</span>

          <div className="flex items-center gap-5">
            {["Privacy", "Terms", "Documentation", "Status"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[12px] text-slate-400 hover:text-slate-600"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}