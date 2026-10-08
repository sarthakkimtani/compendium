import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import { BoardDetail } from "@/components/pages/board-detail";
import { getBoard } from "@/lib/boards";

export const Route = createFileRoute("/board/$boardId")({
  beforeLoad: ({ context }) => {
    if (!context.userId) throw redirect({ to: "/sign-in" });
  },
  loader: async ({ params }) => {
    const board = await getBoard({ data: params.boardId });
    if (!board) throw notFound();
    return board;
  },
  component: BoardDetailPage,
});

function BoardDetailPage() {
  const board = Route.useLoaderData();

  return <BoardDetail board={board} />;
}
