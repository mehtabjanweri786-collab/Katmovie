import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useTrendingMovies(page: number = 1) {
  return useQuery({
    queryKey: [api.movies.trending.path, page],
    queryFn: async () => {
      const res = await fetch(`${api.movies.trending.path}?page=${page}`);
      if (!res.ok) throw new Error("Failed to fetch trending movies");
      return api.movies.trending.responses[200].parse(await res.json());
    },
  });
}

export function useMovieDetail(id: number) {
  return useQuery({
    queryKey: [api.movies.detail.path, id],
    queryFn: async () => {
      const url = buildUrl(api.movies.detail.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch movie details");
      return api.movies.detail.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

export function useMoviesByCategory(genreId: number) {
  return useQuery({
    queryKey: [api.movies.category.path, genreId],
    queryFn: async () => {
      const url = buildUrl(api.movies.category.path, { genreId });
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch category movies");
      return api.movies.category.responses[200].parse(await res.json());
    },
  });
}

export function useSearchMovies(query: string) {
  return useQuery({
    queryKey: ['tmdb-search', query],
    queryFn: async () => {
      const apiKey = '6d640c61bfb461f89f6600f4d337a17c';
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=en-US`;
      
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Search Error:', error);
        alert('Search is not working properly. Check Console.');
        throw error;
      }
    },
    enabled: !!query,
  });
}
