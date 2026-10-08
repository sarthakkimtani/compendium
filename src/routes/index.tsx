import { createFileRoute, redirect } from "@tanstack/react-router";

import { Boards } from "@/components/pages/boards";
import { getViewer } from "@/lib/auth";
import { getBoards } from "@/lib/boards";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    if (!context.userId) throw redirect({ to: "/sign-in" });
  },
  loader: async () => ({ viewer: await getViewer(), boards: await getBoards() }),
  component: BoardsPage,
});

function BoardsPage() {
  const { boards, viewer } = Route.useLoaderData();

  return <Boards initialBoards={boards} viewer={viewer} />;
}
