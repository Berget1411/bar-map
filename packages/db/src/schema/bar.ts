import { boolean, doublePrecision, pgTable, real, serial, text } from "drizzle-orm/pg-core";

export const bar = pgTable("bar", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  rating: real("rating"),
  hours: text("hours"),
  isOpen: boolean("is_open").default(true).notNull(),
});
