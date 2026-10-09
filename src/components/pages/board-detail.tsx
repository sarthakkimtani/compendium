import { Link } from "@tanstack/react-router";
import { Layers2 } from "lucide-react";

import compendiumMark from "@/assets/logos/compendium.svg";

type Board = {
  id: string;
  ownerId: string;
  title: string;
  createdAt: number;
  updatedAt: number;
};

export const BoardDetail = ({ board }: { board: Board }) => {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-ink-951 text-ink-240">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-ink-800)_1px,transparent_1px)] bg-size-[26px_26px] opacity-50"
      />
      <header className="relative z-10 flex h-13 items-center gap-3 border-b border-ink-890 bg-ink-970/95 px-4 sm:px-5">
        <Link
          to="/"
          aria-label="All boards"
          className="inline-flex shrink-0 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-ring"
        >
          <img src={compendiumMark} alt="" className="size-4" />
        </Link>
        <span className="max-w-[42vw] truncate font-serif text-[16px]">{board.title}</span>
        <span className="font-mono text-[10px] text-ink-500">0 objects</span>
        <div className="flex-1" />
        <Link
          to="/"
          className="font-mono text-[10px] text-ink-500 transition-colors hover:text-ink-240 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-ring sm:text-[11px]"
        >
          all boards
        </Link>
      </header>

      <section className="relative flex min-h-[calc(100dvh-3.25rem)] items-center justify-center px-5 pb-16 text-center">
        <div className="max-w-xl">
          <Layers2 aria-hidden className="mx-auto mb-6 size-7 text-oxblood" strokeWidth={1.2} />
          <h1 className="font-serif text-[36px] leading-tight sm:text-[44px]">
            A canvas for {board.title}.
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink-500">
            Your board is ready. Board management is set up; collecting and working with information
            will come next.
          </p>
          <Link
            to="/"
            className="mt-8 inline-block border-b border-ink-820 pb-1 font-mono text-[10px] tracking-widest text-ink-500 uppercase transition-colors hover:border-oxblood-line hover:text-oxblood-text"
          >
            ← All boards
          </Link>
        </div>
      </section>
    </main>
  );
};
