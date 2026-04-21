export function AppFooter() {
  return (
    <footer className="w-full border-t border-[color:var(--line)]/70 py-6 sm:py-8">
      <div className="mx-auto flex max-w-370 items-center justify-center px-3 sm:px-4 lg:px-6">
        <a
          href="https://github.com/HK-SHAO"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[color:var(--ink-soft)] transition-colors hover:text-[color:var(--ink)]"
        >
          © {new Date().getFullYear()} HK-SHAO. All rights reserved.
        </a>
      </div>
    </footer>
  );
}
