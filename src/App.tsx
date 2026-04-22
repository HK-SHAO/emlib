import { lazy, useRef } from "react";

import { AppFooter } from "@/components/app-footer";
import { AppNav } from "@/components/app-nav";
import {
  HeroPanelFallback,
  HighlightsGridFallback,
  PlaygroundStudioFallback,
  SummaryPanelsFallback,
} from "@/components/section-fallbacks";
import { LazySection } from "@/components/lazy-section";
import { getTrackedHashId, useInitialHashScroll } from "@/hooks/use-initial-hash-scroll";
import "./index.css";

const HeroPanel = lazy(() => import("@/features/eml-playground/hero-panel"));
const HighlightsGrid = lazy(() => import("@/features/eml-playground/highlights-grid"));
const SummaryPanels = lazy(() => import("@/features/eml-playground/summary-panels"));
const PlaygroundStudio = lazy(() => import("@/features/eml-playground/playground-studio"));
const sectionIds = ["overview", "highlights", "summary", "playground"] as const;

export function App() {
  const initialHashId = useRef(getTrackedHashId(sectionIds)).current;
  const initialHashIndex = initialHashId ? sectionIds.indexOf(initialHashId) : -1;
  const { isRestoring } = useInitialHashScroll(sectionIds);

  return (
    <main className="relative overflow-x-clip">
      <AppNav hashSyncEnabled={!isRestoring} />
      <section className="mx-auto flex min-h-screen w-full max-w-370 flex-col gap-5 px-3 pb-6 pt-4 sm:px-4 sm:pb-8 sm:pt-5 lg:gap-6 lg:px-6 lg:pb-10 lg:pt-6">
        <section id="overview" className="scroll-mt-28">
          <LazySection component={HeroPanel} eager fallback={<HeroPanelFallback />} />
        </section>
        <section id="highlights" className="scroll-mt-28">
          <LazySection
            component={HighlightsGrid}
            eager={initialHashIndex >= 1}
            fallback={<HighlightsGridFallback />}
          />
        </section>
        <section id="summary" className="scroll-mt-28">
          <LazySection
            component={SummaryPanels}
            eager={initialHashIndex >= 2}
            fallback={<SummaryPanelsFallback />}
          />
        </section>
        <section id="playground" className="scroll-mt-28">
          <LazySection
            component={PlaygroundStudio}
            eager={initialHashIndex >= 3}
            fallback={<PlaygroundStudioFallback />}
          />
        </section>
      </section>
      <AppFooter />
    </main>
  );
}

export default App;
