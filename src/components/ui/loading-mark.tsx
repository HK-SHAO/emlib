import { LuLoaderCircle } from "react-icons/lu";

import { cn } from "@/lib/utils";

export function LoadingMark({ className }: { className?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("flex items-center justify-center text-[color:var(--ink-soft)]", className)}
    >
      <LuLoaderCircle
        aria-hidden="true"
        className="size-9 animate-spin text-[color:var(--accent-strong)]/85 motion-reduce:animate-none"
      />
      <span className="sr-only">Loading</span>
    </div>
  );
}
