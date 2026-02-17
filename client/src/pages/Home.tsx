import { useState, useEffect } from "react";
import { useTrendingMovies, useSearchMovies } from "@/hooks/use-movies";
import { MovieCard } from "@/components/MovieCard";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { Loader2, TrendingUp, ChevronRight, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Home() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const searchQuery = searchParams.get('s') || "";
  
  const [page, setPage] = useState(1);
  
  const trendingQuery = useTrendingMovies(page);
  const searchMoviesQuery = useSearchMovies(searchQuery);

  const isLoading = searchQuery ? searchMoviesQuery.isLoading : trendingQuery.isLoading;
  const isError = searchQuery ? searchMoviesQuery.isError : trendingQuery.isError;
  const data = searchQuery ? searchMoviesQuery.data : trendingQuery.data;

  // Reset page when search query changes
  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-muted-foreground font-medium animate-pulse">Searching for movies...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-4">
          <div className="bg-destructive/10 p-4 rounded-full">
            <SearchX className="w-12 h-12 text-destructive" />
          </div>
          <div className="text-destructive font-bold text-xl">Search failed</div>
          <p className="text-muted-foreground max-w-xs">We encountered an error while searching for movies. Please try again later.</p>
          <Button onClick={() => window.location.href = '/'} variant="outline">Back to Home</Button>
        </div>
      </div>
    );
  }

  const movies = data?.results || [];
  const heroMovie = !searchQuery ? movies[0] : null; // Only show hero on trending
  const totalPages = (data as any)?.total_pages || 1;

  const handlePageChange = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-body">
      <Navigation />
      
      <main>
        {/* Hero Section - Hidden on Search */}
        {heroMovie && (
          <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
                alt={heroMovie.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
            </div>
            
            <div className="container mx-auto px-4 h-full relative z-10 flex items-center">
              <div className="max-w-2xl space-y-6 pt-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                  <TrendingUp className="w-3 h-3" />
                  Trending #1
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight text-shadow">
                  {heroMovie.title}
                </h1>
                <p className="text-lg text-muted-foreground line-clamp-3 md:line-clamp-2 max-w-xl">
                  {heroMovie.overview}
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link href={`/watch/${heroMovie.id}`}>
                    <Button size="lg" className="rounded-full px-8 text-base font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all">
                      Watch Now
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="rounded-full px-8 bg-white/5 border-white/10 hover:bg-white/10 hover:text-white backdrop-blur-md">
                    More Info
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        <AdPlaceholder />

        {/* Movie Grid */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white flex items-center gap-2">
                {searchQuery ? `Search Results: ${searchQuery}` : "Trending Now"} 
                {!searchQuery && <div className="h-1 w-1 bg-primary rounded-full" />}
              </h2>
              <p className="text-sm text-muted-foreground">
                {searchQuery ? `Found ${movies.length} movies for your search` : "The most popular movies being watched right now"}
              </p>
            </div>
            {!searchQuery && (
              <Button variant="ghost" className="gap-2 text-primary hover:text-primary/80 hidden sm:flex">
                View All <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>

          {movies.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-x-6 gap-y-10">
                {movies.map((movie: any) => (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    posterPath={movie.poster_path}
                    voteAverage={movie.vote_average}
                    releaseDate={movie.release_date}
                    isHindi={movie.original_language === 'hi' || movie.title.toLowerCase().includes('hindi')}
                  />
                ))}
              </div>

              {/* Pagination - Only on Trending */}
              {!searchQuery && (
                <div className="mt-16 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => page > 1 && handlePageChange(page - 1)}
                          className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: Math.min(totalPages, 15) }, (_, i) => i + 1).map((p) => (
                        <PaginationItem key={p} className="hidden sm:inline-block">
                          <PaginationLink 
                            onClick={() => handlePageChange(p)}
                            isActive={page === p}
                            className="cursor-pointer"
                          >
                            {p}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => page < totalPages && handlePageChange(page + 1)}
                          className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          ) : (
            <div className="py-20 text-center space-y-4">
              <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <SearchX className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white">No movies found</h3>
              <p className="text-muted-foreground">No movies found for "{searchQuery}". Try another name.</p>
              <Button variant="outline" className="rounded-full mt-4" onClick={() => window.location.href = '/'}>
                Clear Search
              </Button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
