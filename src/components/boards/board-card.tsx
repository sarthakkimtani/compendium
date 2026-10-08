import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Ellipsis, Layers2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { Board } from "@/lib/boards";

type BoardCardProps = {
  board: Board;
  onDelete: () => void;
};

export function BoardCard({ board, onDelete }: BoardCardProps) {
  return (
    <article className="group relative rounded-control border border-ink-860 bg-ink-995 transition-colors hover:border-ink-800">
      <Link
        to="/board/$boardId"
        params={{ boardId: board.id }}
        className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-ring"
      >
        <div className="relative h-40 overflow-hidden border-b border-ink-890 bg-ink-951 bg-[radial-gradient(var(--color-ink-820)_1px,transparent_1px)] bg-size-[20px_20px]">
          <div className="absolute top-[25%] left-[18%] h-20 w-16 rotate-[-4deg] border border-ink-860 bg-ink-995 shadow-sm" />
          <div className="absolute top-[33%] left-[46%] h-16 w-24 rotate-3 border border-ink-860 bg-note shadow-sm" />
          <div className="absolute top-[18%] left-[65%] h-14 w-12 rotate-[5deg] border border-ink-860 bg-ink-995 shadow-sm" />
          <span className="absolute bottom-3 left-4 font-mono text-[9px] tracking-[0.12em] text-ink-500 uppercase">
            Canvas · 0 objects
          </span>
          <ArrowUpRight
            className="absolute top-3 right-3 size-4 text-ink-500 opacity-0 transition-opacity group-hover:opacity-100"
            strokeWidth={1.4}
          />
        </div>
        <div className="flex min-h-17 items-center gap-3 px-4 py-3 pr-12">
          <Layers2 className="size-4 shrink-0 text-oxblood" strokeWidth={1.3} />
          <div className="min-w-0">
            <h2 className="truncate font-serif text-[17px]">{board.title}</h2>
            <p className="mt-1 font-mono text-[10px] text-ink-500">
              Created {formatDate(board.createdAt)}
            </p>
          </div>
        </div>
      </Link>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`Options for ${board.title}`}
            className="absolute right-3 bottom-5 text-ink-500 hover:bg-ink-910 hover:text-ink-240"
          >
            <Ellipsis className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" side="top" sideOffset={4} className="w-auto min-w-36 p-1">
          <Button
            type="button"
            variant="ghost"
            onClick={onDelete}
            className="h-auto w-full justify-start px-3 py-2 text-left text-xs text-oxblood-text hover:bg-ink-951 hover:text-oxblood-text"
          >
            <Trash2 className="size-3.5" strokeWidth={1.5} /> Delete board
          </Button>
        </PopoverContent>
      </Popover>
    </article>
  );
}

function formatDate(timestamp: number) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(timestamp);
}
