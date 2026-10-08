import { auth } from "@clerk/tanstack-react-start/server";
import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";

import { findBoard, insertBoard, listBoards, removeBoard } from "@/db/boards";

async function requireOwner() {
  const { userId } = await auth();
  if (!userId) throw new Error("You must be signed in to manage boards.");
  return userId;
}

export const getBoards = createServerFn({ method: "GET" }).handler(async () => {
  const ownerId = await requireOwner();
  return listBoards(env.DB, ownerId);
});

export const getBoard = createServerFn({ method: "GET" })
  .validator((boardId: string) => boardId)
  .handler(async ({ data: boardId }) => {
    const ownerId = await requireOwner();
    return findBoard(env.DB, ownerId, boardId) ?? null;
  });

export const createBoard = createServerFn({ method: "POST" })
  .validator((title: string) => title)
  .handler(async ({ data }) => {
    const ownerId = await requireOwner();
    const title = data.trim().slice(0, 80);
    if (!title) throw new Error("Give your board a name.");
    return insertBoard(env.DB, ownerId, title);
  });

export const deleteBoard = createServerFn({ method: "POST" })
  .validator((boardId: string) => boardId)
  .handler(async ({ data: boardId }) => {
    const ownerId = await requireOwner();
    await removeBoard(env.DB, ownerId, boardId);
    return { success: true };
  });

export type Board = Awaited<ReturnType<typeof getBoards>>[number];
