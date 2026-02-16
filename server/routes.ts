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

  // Proxy route for Trending Movies with Pagination
  app.get(api.movies.trending.path, async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      
      // Fetch Hollywood (en), South Indian (te, ta), and Bollywood (hi)
      // and ensure they have Hindi (hi) translations/dubbing
      const tmdbPagesPerSitePage = 6; 
      const startTmdbPage = (page - 1) * tmdbPagesPerSitePage + 1;
      const tmdbPages = Array.from({ length: tmdbPagesPerSitePage }, (_, i) => startTmdbPage + i);
      
      const allResults = await Promise.all(
        tmdbPages.map(async (p) => {
          // Use discover with multiple original languages but filtered by Hindi availability
          const response = await fetch(
            `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=hi-IN&with_original_language=en|hi|te|ta&with_languages=hi&sort_by=popularity.desc&page=${p}`
          );
          const data = await response.json();
          return data.results || [];
        })
      );

      let results = allResults.flat();
      
      // Ensure results are unique by ID
      const seen = new Set();
      results = results.filter((movie: any) => {
        const duplicate = seen.has(movie.id);
        seen.add(movie.id);
        return !duplicate;
      });
      
      // Return exactly 30 per page as requested
      res.json({ 
        results: results.slice(0, 30),
        page,
        total_pages: 15
      });
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
      
      // We'll relax the strict check here to ensure the page at least loads, 
      // but keep the filtering on the list views.
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
        `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&with_original_language=hi&sort_by=popularity.desc`
      );
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("TMDB Error:", error);
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  // Proxy route for Search
  app.get(api.movies.search.path, async (req, res) => {
    const { query } = req.query;
    if (!query) {
      return res.json({ results: [] });
    }
    try {
      const apiKey = '6d640c61bfb461f89f6600f4d337a17c';
      const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&query=' + encodeURIComponent(query as string) + '&language=hi-IN&include_adult=false';
      console.log('Fetching from:', url);
      console.log('TMDB Search Request for:', query);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('TMDB Search Error Response:', errorText);
        return res.status(response.status).json({ message: "TMDB API Error", details: errorText });
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Technical Search Error:", error);
      res.status(500).json({ message: "Failed to search movies", error: String(error) });
    }
  });

  return httpServer;
}
