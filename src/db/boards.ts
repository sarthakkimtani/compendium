import { and, desc, eq } from "drizzle-orm";

import { getDb } from "@/db";
import { boards } from "@/db/schema";

export const listBoards = (d1: D1Database, ownerId: string) =>
  getDb(d1)
    .select()
    .from(boards)
    .where(eq(boards.ownerId, ownerId))
    .orderBy(desc(boards.updatedAt));

export const findBoard = (d1: D1Database, ownerId: string, id: string) =>
  getDb(d1)
    .select()
    .from(boards)
    .where(and(eq(boards.ownerId, ownerId), eq(boards.id, id)))
    .get();

export const insertBoard = async (d1: D1Database, ownerId: string, title: string) => {
  const now = Date.now();
  const board = { id: crypto.randomUUID(), ownerId, title, createdAt: now, updatedAt: now };
  await getDb(d1).insert(boards).values(board);
  return board;
};

export const removeBoard = (d1: D1Database, ownerId: string, id: string) =>
  getDb(d1)
    .delete(boards)
    .where(and(eq(boards.ownerId, ownerId), eq(boards.id, id)))
    .run();
