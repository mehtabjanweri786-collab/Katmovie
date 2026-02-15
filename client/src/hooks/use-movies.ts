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
    queryKey: [api.movies.search.path, query],
    queryFn: async () => {
      const res = await fetch(`${api.movies.search.path}?query=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Failed to search movies");
      return api.movies.search.responses[200].parse(await res.json());
    },
    enabled: !!query,
  });
}
