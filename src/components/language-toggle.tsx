import { startTransition } from "react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";

export function LanguageToggle() {
  const { locale, locales, messages, setLocale } = useI18n();

  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--line)] bg-white/82 p-1.5 shadow-[0_10px_26px_rgba(37,43,63,0.08)]">
      <span className="px-2 text-[11px] font-semibold tracking-[0.16em] text-[color:var(--ink-soft)] uppercase">
        {messages.app.languageLabel}
      </span>
      {locales.map((option) => {
        const isActive = option === locale;

        return (
          <Button
            key={option}
            type="button"
            size="sm"
            variant={isActive ? "default" : "ghost"}
            lang={option}
            aria-pressed={isActive}
            className={
              isActive
                ? "rounded-full bg-[color:var(--accent-strong)] px-3 text-white hover:bg-[color:var(--accent-strong)]/92"
                : "rounded-full px-3 text-[color:var(--ink-soft)] hover:bg-[color:var(--paper-strong)]"
            }
            onClick={() => {
              if (isActive) return;

              startTransition(() => {
                setLocale(option);
              });
            }}
          >
            <span className="sr-only">{messages.app.localeNames[option]}</span>
            {messages.app.localeShortLabels[option]}
          </Button>
        );
      })}
    </div>
  );
}
