import { LuCheck, LuCopy } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AsyncMessage, SegmentedTabs } from "@/features/eml-playground/playground-shared";
import type { PlaygroundStudioState } from "@/features/eml-playground/use-playground-studio";

export function PlaygroundPreviewPanel({ studio }: { studio: PlaygroundStudioState }) {
  const {
    messages,
    diagramSource,
    setDiagramSource,
    layoutMode,
    previewActivation,
    diagramPayload,
    d2Preview,
    copyState,
    handleCopyD2,
    expressionViews,
  } = studio;

  return (
    <div ref={previewActivation.ref} className="min-w-0 space-y-2.5 xl:sticky xl:top-5">
      <div className="diagram-shell overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--line)] px-3.5 py-3">
          <div>
            <div className="text-[10px] font-semibold tracking-[0.18em] text-[color:var(--ink-soft)] uppercase">
              {messages.playground.diagram.eyebrow}
            </div>
          </div>
          <div className="rounded-full border border-[color:var(--line)] bg-white/80 px-3 py-1 text-xs font-semibold text-[color:var(--ink-soft)]">
            {messages.playground.diagram.layoutBadge({ layout: layoutMode })}
          </div>
        </div>

        <div className="border-b border-[color:var(--line)] px-3.5 py-2.5">
          <SegmentedTabs
            value={diagramSource}
            onChange={setDiagramSource}
            items={expressionViews.map((view) => ({
              value: view.key,
              label: view.title,
              shortLabel: view.title.split(" ")[0] ?? view.title,
            }))}
          />
        </div>

        <div className="diagram-canvas px-3.5 py-3.5">
          {!previewActivation.isActivated && diagramPayload.canRender ? (
            <AsyncMessage>{messages.playground.diagram.deferredHint}</AsyncMessage>
          ) : diagramPayload.reason ? (
            <AsyncMessage>{diagramPayload.reason}</AsyncMessage>
          ) : d2Preview.renderError ? (
            <AsyncMessage tone="warning">
              {messages.playground.diagram.renderError({
                detail: d2Preview.renderError,
              })}
            </AsyncMessage>
          ) : d2Preview.isRendering ? (
            <AsyncMessage>{messages.playground.diagram.loading}</AsyncMessage>
          ) : d2Preview.svgUrl ? (
            <div className="d2-viewport rounded-[0.9rem] border border-[color:var(--line)]">
              <img
                src={d2Preview.svgUrl}
                alt={messages.playground.diagram.previewAriaLabel({
                  mode: messages.playground.diagram.eyebrow,
                })}
                className="d2-preview-image"
                onError={d2Preview.handleImageError}
              />
            </div>
          ) : (
            <AsyncMessage>{messages.playground.diagram.empty}</AsyncMessage>
          )}
        </div>
      </div>

      <div className="min-w-0 rounded-[1rem] border border-[color:var(--line)] bg-white/78 p-3.5">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs font-semibold tracking-[0.18em] text-[color:var(--ink-soft)] uppercase">
            {messages.playground.d2Source.title}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full border-[color:var(--line)] bg-[color:var(--paper-strong)]"
            onClick={() => {
              void handleCopyD2();
            }}
          >
            {copyState === "copied" ? (
              <LuCheck className="size-4" />
            ) : (
              <LuCopy className="size-4" />
            )}
            {copyState === "copied"
              ? messages.playground.d2Source.copySuccess
              : copyState === "failed"
                ? messages.playground.d2Source.copyFailed
                : messages.playground.d2Source.copyIdle}
          </Button>
        </div>
        <Textarea
          readOnly
          value={diagramPayload.d2Source}
          className="mt-2.5 h-32 min-h-0 rounded-[0.85rem] border-[color:var(--line)] bg-[color:var(--paper-strong)] font-mono text-xs leading-5"
        />
      </div>
    </div>
  );
}
