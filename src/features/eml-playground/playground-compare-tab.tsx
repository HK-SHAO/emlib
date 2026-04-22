import { LuArrowRight } from "react-icons/lu";

import { AsyncMessage } from "@/features/eml-playground/playground-shared";
import { ResultCard } from "@/features/eml-playground/playground-result-card";
import type { PlaygroundStudioState } from "@/features/eml-playground/use-playground-studio";

export default function PlaygroundCompareTab({ studio }: { studio: PlaygroundStudioState }) {
  const {
    analysisState,
    expressionViews,
    diagramSource,
    setDiagramSource,
    messages,
    formatNumber,
  } = studio;

  if (!analysisState.ok) {
    return (
      <AsyncMessage tone="warning">
        {messages.playground.parseError({ detail: analysisState.error })}
      </AsyncMessage>
    );
  }

  return (
    <div className="space-y-3.5">
      <div className="flex items-center gap-2 text-sm font-semibold tracking-[0.15em] text-[color:var(--ink-soft)] uppercase">
        <span>{messages.playground.transforms.title}</span>
        <LuArrowRight className="size-4" />
      </div>
      <div className="grid gap-3">
        {expressionViews.map((view) => (
          <ResultCard
            key={view.key}
            active={view.key === diagramSource}
            title={view.title}
            description={view.description}
            apiLabel={view.apiLabel}
            transform={view.transform}
            standardMetrics={analysisState.standard.metrics}
            formatNumber={formatNumber}
            deltaLabel={messages.playground.transforms.deltaLabel}
            typesLabel={messages.playground.transforms.typesLabel}
            previewLabel={messages.playground.transforms.previewButton}
            onPreview={() => setDiagramSource(view.key)}
          />
        ))}
      </div>
    </div>
  );
}
