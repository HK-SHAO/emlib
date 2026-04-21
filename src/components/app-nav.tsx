import { LanguageToggle } from "@/components/language-toggle";
import { useI18n } from "@/i18n";
import logoUrl from "@/logo.svg";

const navItems = [
  { href: "#overview", key: "overview" },
  { href: "#highlights", key: "highlights" },
  { href: "#summary", key: "summary" },
  { href: "#playground", key: "playground" },
] as const;

export function AppNav() {
  const { messages } = useI18n();

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4 lg:px-6 lg:pt-5">
      <div className="app-nav-shell mx-auto max-w-370">
        <div className="app-nav flex flex-col gap-3 px-3 py-3 sm:px-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <a
              href="#overview"
              className="inline-flex items-center gap-3 text-[color:var(--ink)] no-underline"
            >
              <img
                src={logoUrl}
                alt=""
                aria-hidden="true"
                className="size-9 rounded-[0.9rem] border border-[color:var(--line)]/80 bg-black/92 p-1 shadow-[0_10px_24px_rgba(23,33,44,0.12)]"
              />
              <span className="font-display text-[1.35rem] leading-none">
                {messages.app.title}
              </span>
            </a>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:flex-1 lg:justify-end">
            <nav
              aria-label="Primary"
              className="flex min-w-0 items-center gap-1 overflow-x-auto pb-1 sm:pb-0"
            >
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="app-nav-link">
                  {messages.app.nav[item.key]}
                </a>
              ))}
            </nav>
            <LanguageToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
