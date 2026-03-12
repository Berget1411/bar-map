import { eq } from "drizzle-orm";

import { db } from "../client";
import { bar } from "../schema/bar";

export const barRepository = {
  getAll() {
    return db.select().from(bar);
  },

  getOpen() {
    return db.select().from(bar).where(eq(bar.isOpen, true));
  },

  create(input: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    description?: string;
    imageUrl?: string;
    rating?: number;
    hours?: string;
    isOpen?: boolean;
  }) {
    return db.insert(bar).values(input).returning();
  },

  delete(input: { id: number }) {
    return db.delete(bar).where(eq(bar.id, input.id));
  },
};
