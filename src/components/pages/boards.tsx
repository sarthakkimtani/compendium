import { useNavigate, useRouter } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState, useTransition } from "react";

import { BoardDialogs } from "@/components/boards/board-dialogs";
import { BoardEmptyState } from "@/components/boards/board-empty-state";
import { BoardGrid } from "@/components/boards/board-grid";
import { BoardWorkspaceHeader } from "@/components/boards/board-workspace-header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import type { Viewer } from "@/lib/auth";
import { createBoard, deleteBoard } from "@/lib/boards";
import type { Board } from "@/lib/boards";

export const Boards = ({
  initialBoards,
  viewer,
}: {
  initialBoards: Board[];
  viewer: Viewer | null;
}) => {
  const [creating, setCreating] = useState(false);
  const [deletingBoard, setDeletingBoard] = useState<Board | null>(null);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const [busy, startTransition] = useTransition();
  const navigate = useNavigate();
  const router = useRouter();

  const openCreateDialog = () => {
    setTitle("");
    setError("");
  };

  const handleCreateOpenChange = (open: boolean) => {
    setCreating(open);
    if (!open) setError("");
  };

  const handleCreate = () => {
    const name = title.trim();
    if (!name || busy) return;
    setError("");
    startTransition(async () => {
      try {
        const board = await createBoard({ data: name });
        await router.invalidate();
        await navigate({ to: "/board/$boardId", params: { boardId: board.id } });
      } catch {
        setError("Could not create this board. Please try again.");
      }
    });
  };

  const handleDelete = () => {
    if (!deletingBoard || busy) return;
    startTransition(async () => {
      try {
        await deleteBoard({ data: deletingBoard.id });
        await router.invalidate();
        setDeletingBoard(null);
      } catch {
        setError("Could not delete this board. Please try again.");
      }
    });
  };

  return (
    <Dialog open={creating} onOpenChange={handleCreateOpenChange}>
      <main className="min-h-dvh bg-ink-951 text-ink-240">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 bg-[radial-gradient(var(--color-ink-800)_1px,transparent_1px)] bg-size-[26px_26px] opacity-45"
        />
        <BoardWorkspaceHeader viewer={viewer} />

        <section className="relative mx-auto max-w-6xl px-6 pt-4 pb-20 sm:px-10 sm:pt-24">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-3 font-mono text-[10px] tracking-[0.15em] text-oxblood-text uppercase">
                A place to think with what you collect
              </p>
              <h1 className="font-serif text-4xl leading-tight sm:text-[48px]">Your boards</h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-ink-500">
                Each one is a canvas for a question, a project, or a problem you're working through.
              </p>
            </div>
            <DialogTrigger asChild>
              <Button type="button" onClick={openCreateDialog} className="h-10 px-4 text-[13px]">
                <Plus className="size-4" strokeWidth={1.6} /> New board
              </Button>
            </DialogTrigger>
          </div>

          {error && (
            <p
              role="alert"
              className="mb-5 rounded-control border border-oxblood-line bg-ink-995 px-4 py-3 text-sm text-oxblood-text"
            >
              {error}
            </p>
          )}

          {initialBoards.length ? (
            <BoardGrid boards={initialBoards} onDelete={setDeletingBoard} />
          ) : (
            <BoardEmptyState onCreate={openCreateDialog} />
          )}
        </section>

        <BoardDialogs
          title={title}
          onTitleChange={setTitle}
          error={error}
          busy={busy}
          onCreate={handleCreate}
          deletingBoard={deletingBoard}
          onDeleteOpenChange={(open) => {
            if (!open) setDeletingBoard(null);
          }}
          onDelete={handleDelete}
        />
      </main>
    </Dialog>
  );
};
