import { Button } from "@/components/ui/button";
import { InfoTip } from "@/components/ui/info-tip";
import { StatPill } from "@/features/eml-playground/playground-shared";
import type { ExpressionTransform } from "@/features/eml-playground/use-expression-analysis";
import { formatSignedDelta, formatTypeSet } from "@/features/eml-playground/utils";

export function ResultCard({
  active,
  title,
  summary,
  description,
  apiLabel,
  transform,
  standardMetrics,
  previewLabel,
  deltaLabel,
  tokenNodeLabel,
  typesLabel,
  operatorTypeLabel,
  formatNumber,
  onPreview,
}: {
  active: boolean;
  title: string;
  summary: string;
  description: string;
  apiLabel: string;
  transform: ExpressionTransform;
  standardMetrics: {
    tokenCount: number;
    typeCount: number;
  };
  previewLabel: string;
  deltaLabel: string;
  tokenNodeLabel: string;
  typesLabel: string;
  operatorTypeLabel: string;
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
          <div className="mt-1 flex items-start gap-2">
            <div className="min-w-0 text-[15px] font-semibold text-[color:var(--ink)]">{title}</div>
            <InfoTip label={description} className="shrink-0" />
          </div>
          <p className="mt-1 text-sm leading-5 text-[color:var(--ink-soft)]">{summary}</p>
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

      <div className="mt-3 grid gap-2 grid-cols-2 xl:grid-cols-4">
        <StatPill label={tokenNodeLabel} value={formatNumber(transform.metrics.tokenCount)} />
        <StatPill label={operatorTypeLabel} value={formatNumber(transform.metrics.typeCount)} />
        <StatPill
          label={deltaLabel}
          value={`${formatSignedDelta(tokenDelta)} / ${formatSignedDelta(typeDelta)}`}
        />
        <StatPill label={typesLabel} value={formatTypeSet(transform.metrics.types)} />
      </div>
    </div>
  );
}
