import type { Board } from "@/lib/boards";

import { BoardCard } from "./board-card";

type BoardGridProps = {
  boards: Board[];
  onDelete: (board: Board) => void;
};

export function BoardGrid({ boards, onDelete }: BoardGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {boards.map((board) => (
        <BoardCard key={board.id} board={board} onDelete={() => onDelete(board)} />
      ))}
    </div>
  );
}
