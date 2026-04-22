import { useEffect, useMemo, useRef, useState } from "react";

const HASH_SYNC_RESUME_DELAY_MS = 120;
const HASH_SYNC_MAX_PAUSE_MS = 2400;

type ScrollSectionHashOptions = {
  anchorOffsetRatio?: number;
  enabled?: boolean;
  replaceHistory?: boolean;
};

function getCurrentHashId() {
  if (typeof window === "undefined") return "";
  return decodeURIComponent(window.location.hash.slice(1));
}

export function useScrollSectionHash(
  sectionIds: readonly string[],
  {
    anchorOffsetRatio = 0.28,
    enabled = true,
    replaceHistory = true,
  }: ScrollSectionHashOptions = {},
) {
  const normalizedIds = useMemo(() => sectionIds.filter((id) => id.length > 0), [sectionIds]);
  const idsKey = normalizedIds.join("|");
  const suppressScrollSyncRef = useRef(false);
  const resumeTimeoutRef = useRef<number | null>(null);
  const maxPauseTimeoutRef = useRef<number | null>(null);
  const [activeId, setActiveId] = useState(() => {
    const hashId = getCurrentHashId();
    if (normalizedIds.includes(hashId)) return hashId;

    return normalizedIds[0] ?? "";
  });

  useEffect(() => {
    if (typeof window === "undefined" || normalizedIds.length === 0 || !enabled) return;

    let frame = 0;

    const clearResumeTimeout = () => {
      if (resumeTimeoutRef.current === null) return;
      window.clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    };

    const clearMaxPauseTimeout = () => {
      if (maxPauseTimeoutRef.current === null) return;
      window.clearTimeout(maxPauseTimeoutRef.current);
      maxPauseTimeoutRef.current = null;
    };

    const resumeScrollSync = () => {
      suppressScrollSyncRef.current = false;
      clearResumeTimeout();
      clearMaxPauseTimeout();
      scheduleSync();
    };

    const pauseScrollSync = () => {
      suppressScrollSyncRef.current = true;
      clearResumeTimeout();
      resumeTimeoutRef.current = window.setTimeout(resumeScrollSync, HASH_SYNC_RESUME_DELAY_MS);

      if (maxPauseTimeoutRef.current === null) {
        maxPauseTimeoutRef.current = window.setTimeout(resumeScrollSync, HASH_SYNC_MAX_PAUSE_MS);
      }
    };

    const syncActiveSection = () => {
      if (suppressScrollSyncRef.current) return;

      const anchorLine = window.innerHeight * anchorOffsetRatio;
      const sections = normalizedIds
        .map((id) => {
          const element = document.getElementById(id);
          return element ? { id, rect: element.getBoundingClientRect() } : null;
        })
        .filter((section): section is { id: string; rect: DOMRect } => section !== null);

      if (sections.length === 0) return;

      let nextId = sections[0]!.id;

      for (const section of sections) {
        if (section.rect.top <= anchorLine) {
          nextId = section.id;
        }

        if (section.rect.top <= anchorLine && section.rect.bottom > anchorLine) {
          nextId = section.id;
          break;
        }
      }

      setActiveId((previous) => (previous === nextId ? previous : nextId));

      const nextHash = `#${nextId}`;
      if (window.location.hash === nextHash) return;

      const nextUrl = `${window.location.pathname}${window.location.search}${nextHash}`;
      if (replaceHistory) {
        window.history.replaceState(window.history.state, "", nextUrl);
      } else {
        window.history.pushState(window.history.state, "", nextUrl);
      }
    };

    const scheduleSync = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(syncActiveSection);
    };

    const handleScroll = () => {
      if (suppressScrollSyncRef.current) {
        clearResumeTimeout();
        resumeTimeoutRef.current = window.setTimeout(resumeScrollSync, HASH_SYNC_RESUME_DELAY_MS);
      }
      scheduleSync();
    };

    const handleHashChange = () => {
      const hashId = getCurrentHashId();
      if (!normalizedIds.includes(hashId)) {
        resumeScrollSync();
        return;
      }

      pauseScrollSync();
      setActiveId(hashId);
      scheduleSync();
    };

    handleHashChange();
    scheduleSync();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", scheduleSync);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.cancelAnimationFrame(frame);
      clearResumeTimeout();
      clearMaxPauseTimeout();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", scheduleSync);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [anchorOffsetRatio, enabled, idsKey, normalizedIds, replaceHistory]);

  return { activeId };
}
