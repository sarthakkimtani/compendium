import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const boards = sqliteTable(
  "boards",
  {
    id: text().primaryKey(),
    ownerId: text("owner_id").notNull(),
    title: text().notNull(),
    createdAt: integer("created_at").notNull(),
    updatedAt: integer("updated_at").notNull(),
  },
  (table) => [index("boards_owner_updated_idx").on(table.ownerId, table.updatedAt)],
);
