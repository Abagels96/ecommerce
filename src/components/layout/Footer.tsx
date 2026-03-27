export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-zinc-200/90 bg-zinc-50/95 dark:border-zinc-800/90 dark:bg-zinc-950/60">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <p className="text-balance text-center text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          © {year} ABails Shop · Portfolio demo · Mock data only
        </p>
      </div>
    </footer>
  );
}
