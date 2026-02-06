import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const movies = pgTable("movies", {
  id: serial("id").primaryKey(),
  tmdbId: integer("tmdb_id").notNull().unique(),
  title: text("title").notNull(),
  posterPath: text("poster_path"),
  overview: text("overview"),
  mediaType: text("media_type").default("movie"),
  isHindiDubbed: boolean("is_hindi_dubbed").default(false),
});

export const insertMovieSchema = createInsertSchema(movies).omit({ id: true });

export type Movie = typeof movies.$inferSelect;
export type InsertMovie = z.infer<typeof insertMovieSchema>;
