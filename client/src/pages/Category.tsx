import { useParams } from "wouter";
import { useMoviesByCategory } from "@/hooks/use-movies";
import { MovieCard } from "@/components/MovieCard";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { Loader2, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

const CATEGORIES: Record<string, string> = {
  "28": "Action",
  "35": "Comedy",
  "27": "Horror",
  "878": "Sci-Fi",
  "10749": "Romance",
  "53": "Thriller",
  "18": "Drama",
  "9648": "Mystery",
  "80": "Crime",
  "16": "Animation",
  "12": "Adventure",
  "14": "Fantasy",
};

export default function Category() {
  const params = useParams<{ id: string }>();
  const categoryId = parseInt(params.id || "28");
  const categoryName = CATEGORIES[String(categoryId)] || "Category";

  const { data, isLoading, error } = useMoviesByCategory(categoryId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-4">
          <div className="text-destructive font-bold text-xl">Oops! Something went wrong.</div>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  const movies = data?.results || [];

  return (
    <div className="min-h-screen bg-background flex flex-col font-body">
      <Navigation />
      
      <main className="flex-1">
        {/* Header */}
        <div className="relative bg-secondary/30 py-16 border-b border-white/5">
          <div className="container mx-auto px-4">
             <div className="flex items-center gap-3 mb-4">
               <div className="p-3 rounded-xl bg-primary/10 text-primary">
                 <Layers className="w-6 h-6" />
               </div>
               <span className="text-sm font-bold text-primary tracking-wider uppercase">Browse Category</span>
             </div>
             <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">{categoryName} Movies</h1>
             <p className="text-muted-foreground max-w-2xl text-lg">
               Explore our vast collection of {categoryName.toLowerCase()} movies. From classic hits to the latest releases, we have something for everyone.
             </p>
          </div>
        </div>

        <AdPlaceholder />

        {/* Content */}
        <section className="container mx-auto px-4 py-12">
          {movies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8">
              {movies.map((movie: any) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  posterPath={movie.poster_path}
                  voteAverage={movie.vote_average}
                  releaseDate={movie.release_date}
                  isHindi={movie.original_language === 'hi'}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No movies found in this category.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
