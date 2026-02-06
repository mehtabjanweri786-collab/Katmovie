import { movies, type Movie, type InsertMovie } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // We primarily use the API, but storage could be used for caching or favorites later
  createMovie(movie: InsertMovie): Promise<Movie>;
  getMovieByTmdbId(tmdbId: number): Promise<Movie | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createMovie(insertMovie: InsertMovie): Promise<Movie> {
    const [movie] = await db.insert(movies).values(insertMovie).returning();
    return movie;
  }

  async getMovieByTmdbId(tmdbId: number): Promise<Movie | undefined> {
    const [movie] = await db.select().from(movies).where(eq(movies.tmdbId, tmdbId));
    return movie;
  }
}

export const storage = new DatabaseStorage();
