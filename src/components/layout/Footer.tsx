import Image from "next/image";

import { publicAsset } from "@/lib/public-asset";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200/90 bg-zinc-50/95 dark:border-zinc-800/90 dark:bg-zinc-950/60">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="flex flex-col items-center gap-3">
          <Image
            src={publicAsset("/abails-logo.png")}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-lg object-cover opacity-90 ring-1 ring-zinc-200/80 dark:ring-zinc-700/80"
          />
          <p className="text-balance text-center text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            © 2026 Abigail Bales. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
