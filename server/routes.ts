import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

const TMDB_API_KEY = "6d640c61bfb461f89f6600f4d337a17c";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Proxy route for Trending Movies
  app.get(api.movies.trending.path, async (req, res) => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/trending/movie/day?api_key=${TMDB_API_KEY}&language=en-US`
      );
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("TMDB Error:", error);
      res.status(500).json({ message: "Failed to fetch from TMDB" });
    }
  });

  // Proxy route for Movie Details
  app.get(api.movies.detail.path, async (req, res) => {
    const { id } = req.params;
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`
      );
      if (!response.ok) {
        return res.status(404).json({ message: "Movie not found" });
      }
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("TMDB Error:", error);
      res.status(500).json({ message: "Failed to fetch movie details" });
    }
  });

  // Proxy route for Categories (Discover)
  app.get(api.movies.category.path, async (req, res) => {
    const { genreId } = req.params;
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`
      );
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("TMDB Error:", error);
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  return httpServer;
}
