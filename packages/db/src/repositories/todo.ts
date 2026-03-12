import { eq } from "drizzle-orm";

import { db } from "../client";
import { todo } from "../schema/todo";

export const todoRepository = {
  getAll() {
    return db.select().from(todo);
  },

  create(input: { text: string }) {
    return db.insert(todo).values({
      text: input.text,
    });
  },

  toggle(input: { id: number; completed: boolean }) {
    return db.update(todo).set({ completed: input.completed }).where(eq(todo.id, input.id));
  },

  delete(input: { id: number }) {
    return db.delete(todo).where(eq(todo.id, input.id));
  },
};
