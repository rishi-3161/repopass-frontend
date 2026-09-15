import Link from "next/link";
import { GitHub } from "@/components/GitHubIcon";

interface GitHubButtonProps {
  children?: React.ReactNode;
}

export default function GitHubButton({
  children = "Continue with GitHub",
}: GitHubButtonProps) {
  return (
    <Link
      href="/login"
      className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-[13px] font-medium rounded-md hover:bg-slate-800 transition-colors"
    >
      <GitHub />
      {children}
    </Link>
  );
}