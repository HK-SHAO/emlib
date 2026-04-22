import { LuCircleHelp } from "react-icons/lu";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function InfoTip({ label, className }: { label: string; className?: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label={label}
            className={cn(
              "inline-flex size-5 items-center justify-center rounded-full border border-[color:var(--line)] bg-white/84 text-[color:var(--ink-soft)] transition-colors hover:text-[color:var(--ink)] focus-visible:border-[color:var(--accent-strong)] focus-visible:outline-none",
              className,
            )}
          >
            <LuCircleHelp className="size-3.5" />
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          align="end"
          sideOffset={8}
          className="max-w-[18rem] rounded-[0.85rem] border border-[color:var(--line)] bg-[color:var(--paper-strong)] px-3 py-2 text-left text-[13px] leading-6 text-[color:var(--ink-soft)] [overflow-wrap:anywhere] shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
        >
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
