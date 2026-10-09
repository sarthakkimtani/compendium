import { Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Board } from "@/lib/boards";

type BoardDialogsProps = {
  title: string;
  onTitleChange: (title: string) => void;
  error: string;
  busy: boolean;
  onCreate: () => void;
  deletingBoard: Board | null;
  onDeleteOpenChange: (open: boolean) => void;
  onDelete: () => void;
};

export function BoardDialogs({
  title,
  onTitleChange,
  error,
  busy,
  onCreate,
  deletingBoard,
  onDeleteOpenChange,
  onDelete,
}: BoardDialogsProps) {
  return (
    <>
      <DialogContent className="max-w-md gap-0 p-7 sm:p-9">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onCreate();
          }}
        >
          <DialogHeader className="items-start gap-2 text-left">
            <p className="font-mono text-[10px] tracking-[0.14em] text-ink-500 uppercase">
              New board
            </p>
            <DialogTitle className="font-serif text-[26px] leading-tight font-normal">
              What are you working through?
            </DialogTitle>
            <DialogDescription className="sr-only">
              Name a board to open its canvas.
            </DialogDescription>
          </DialogHeader>
          <label htmlFor="board-name" className="sr-only">
            Board name
          </label>
          <input
            id="board-name"
            autoFocus
            maxLength={80}
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            placeholder="A question, a project, a problem…"
            className="mt-7 w-full border-0 border-b border-ink-820 bg-transparent px-0 py-3 font-serif text-xl text-ink-240 outline-none placeholder:font-sans placeholder:text-[13px] placeholder:text-ink-500 focus:border-teal"
          />
          {error && (
            <p role="alert" className="mt-3 text-xs text-oxblood-text">
              {error}
            </p>
          )}
          <DialogFooter className="mt-7 flex-row items-center justify-between gap-4">
            <span className="font-mono text-[10px] text-ink-500">
              Enter to create · Esc to cancel
            </span>
            <Button
              disabled={!title.trim() || busy}
              type="submit"
              className="h-10 px-4 text-xs font-medium"
            >
              {busy ? "Creating…" : "Create canvas"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>

      <AlertDialog open={deletingBoard !== null} onOpenChange={onDeleteOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader className="place-items-start gap-2 text-left">
            <p className="font-mono text-[10px] tracking-[0.14em] text-oxblood-text uppercase">
              Delete board
            </p>
            <AlertDialogTitle className="font-serif text-2xl leading-tight font-normal">
              Remove “{deletingBoard?.title}”?
            </AlertDialogTitle>
            <AlertDialogDescription className="mt-1 leading-6">
              This removes the board and its canvas. This action can’t be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {error && (
            <p role="alert" className="mt-3 text-xs text-oxblood-text">
              {error}
            </p>
          )}
          <AlertDialogFooter className="mt-7 gap-3">
            <AlertDialogCancel disabled={busy} className="h-9 px-3 text-xs">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              className="h-9 px-3 text-xs"
              onClick={(event) => {
                event.preventDefault();
                onDelete();
              }}
              disabled={busy}
            >
              <Trash2 className="size-3.5" /> {busy ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
