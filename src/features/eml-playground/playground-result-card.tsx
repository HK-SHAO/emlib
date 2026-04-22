import { Button } from "@/components/ui/button";
import { StatPill } from "@/features/eml-playground/playground-shared";
import type { ExpressionTransform } from "@/features/eml-playground/use-expression-analysis";
import { formatSignedDelta, formatTypeSet } from "@/features/eml-playground/utils";

export function ResultCard({
  active,
  title,
  description,
  apiLabel,
  transform,
  standardMetrics,
  previewLabel,
  deltaLabel,
  typesLabel,
  formatNumber,
  onPreview,
}: {
  active: boolean;
  title: string;
  description: string;
  apiLabel: string;
  transform: ExpressionTransform;
  standardMetrics: {
    tokenCount: number;
    typeCount: number;
  };
  previewLabel: string;
  deltaLabel: string;
  typesLabel: string;
  formatNumber: (value: number) => string;
  onPreview: () => void;
}) {
  const tokenDelta = transform.metrics.tokenCount - standardMetrics.tokenCount;
  const typeDelta = transform.metrics.typeCount - standardMetrics.typeCount;

  return (
    <div
      className={[
        "min-w-0 rounded-[0.95rem] border p-3 transition-colors",
        active
          ? "border-[color:var(--accent-strong)] bg-[color:var(--accent-soft)]/32"
          : "border-[color:var(--line)] bg-white/80",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-2.5">
        <div className="min-w-0">
          <div className="text-[10px] font-semibold tracking-[0.18em] text-[color:var(--ink-soft)] uppercase">
            {apiLabel}
          </div>
          <div className="mt-1 text-[15px] font-semibold text-[color:var(--ink)]">{title}</div>
          <p className="mt-1 text-sm leading-5 text-[color:var(--ink-soft)]">{description}</p>
        </div>
        <Button
          type="button"
          variant={active ? "default" : "outline"}
          size="sm"
          className="rounded-full"
          onClick={onPreview}
        >
          {previewLabel}
        </Button>
      </div>

      <pre className="mt-3 max-h-32 max-w-full overflow-auto rounded-[0.8rem] border border-[color:var(--line)] bg-[color:var(--paper-strong)] p-2.5 font-mono text-xs leading-5 text-[color:var(--ink)]">
        {transform.text}
      </pre>

      <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        <StatPill label="Nodes" value={formatNumber(transform.metrics.tokenCount)} />
        <StatPill label="Operators" value={formatNumber(transform.metrics.typeCount)} />
        <StatPill
          label={deltaLabel}
          value={`${formatSignedDelta(tokenDelta)} / ${formatSignedDelta(typeDelta)}`}
        />
        <StatPill label={typesLabel} value={formatTypeSet(transform.metrics.types)} />
      </div>
    </div>
  );
}
