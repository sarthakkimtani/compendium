import type { ReactNode } from "react";

import compendiumMark from "@/assets/logos/compendium.svg";

export const AuthShell = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-ink-951 p-4">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-ink-800)_1px,transparent_1px)] bg-size-[26px_26px] opacity-50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-225 w-360 -translate-1/2 opacity-[0.38] max-sm:hidden"
      >
        <div className="absolute top-37.5 left-30 h-43 w-60.5 -rotate-2 rounded-control border border-ink-870 bg-ink-990" />
        <div className="absolute top-107.5 left-50 h-63 w-50.5 rotate-[1.5deg] rounded-control border border-ink-870 bg-ink-990" />
        <div className="absolute top-47.5 right-37.5 h-50.5 w-65.5 rotate-2 rounded-control border border-ink-870 bg-ink-990" />
        <div className="absolute top-125 right-57.5 size-45.5 -rotate-3 rounded-control border border-note-line bg-note" />
      </div>

      <div className="relative w-full max-w-118.5 rounded-card border border-ink-860 bg-ink-995 px-10 pt-10 pb-7 shadow-lifted max-sm:px-6">
        <div className="mb-7 flex items-center gap-2.25">
          <img src={compendiumMark} alt="" className="block size-5" />
          <span className="font-serif text-[19px] tracking-[-0.01em] text-ink-240">Compendium</span>
        </div>
        {children}
      </div>
    </main>
  );
};
