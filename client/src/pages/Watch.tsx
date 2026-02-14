import { useParams } from "wouter";
import { useMovieDetail } from "@/hooks/use-movies";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { Loader2, Play, Download, Share2, Heart, Calendar, Clock, Star, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Watch() {
  const params = useParams<{ id: string }>();
  const id = params.id ? parseInt(params.id) : 0;
  const { data: movie, isLoading, error } = useMovieDetail(id);

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

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-4">
          <h1 className="text-4xl font-display font-bold text-white mb-2">404</h1>
          <p className="text-muted-foreground">Movie not found.</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  return (
    <div className="min-h-screen bg-background flex flex-col font-body">
      <Navigation />
      
      <main className="flex-1">
        {/* Backdrop Header */}
        <div className="relative w-full h-[50vh] overflow-hidden">
          {backdropUrl && (
            <img 
              src={backdropUrl} 
              alt={movie.title}
              className="w-full h-full object-cover opacity-40 blur-sm scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 -mt-64 relative z-10 pb-20">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left: Poster */}
            <div className="shrink-0 mx-auto lg:mx-0">
              <div className="w-64 md:w-80 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 relative group">
                 <img 
                   src={posterUrl} 
                   alt={movie.title} 
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="icon" className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90">
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </Button>
                 </div>
              </div>
              <div className="flex gap-2 mt-4 justify-center">
                 <Button className="w-full gap-2 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                   <Download className="w-4 h-4" /> Download
                 </Button>
                 <Button variant="outline" size="icon" className="shrink-0 bg-white/5 border-white/10 hover:bg-white/10">
                   <Heart className="w-4 h-4" />
                 </Button>
                 <Button variant="outline" size="icon" className="shrink-0 bg-white/5 border-white/10 hover:bg-white/10">
                   <Share2 className="w-4 h-4" />
                 </Button>
              </div>
            </div>

            {/* Right: Info */}
            <div className="flex-1 space-y-6 pt-4 lg:pt-20">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 text-shadow">
                  {movie.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                   <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      <span className="text-white font-medium">{movie.vote_average?.toFixed(1)}</span>
                   </div>
                   <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>{movie.release_date?.split('-')[0]}</span>
                   </div>
                   <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{movie.runtime || '120'} min</span>
                   </div>
                   <div className="flex items-center gap-1.5">
                      <Globe className="w-4 h-4" />
                      <span>{movie.original_language?.toUpperCase()}</span>
                   </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres?.map((g: any) => (
                    <Badge key={g.id} variant="secondary" className="bg-white/5 hover:bg-white/10 text-white border-white/10 px-3 py-1">
                      {g.name}
                    </Badge>
                  ))}
                </div>

                <p className="text-lg leading-relaxed text-muted-foreground max-w-3xl">
                  {movie.overview}
                </p>
              </div>

              {/* Player Section */}
              <div className="mt-12 space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-display font-bold text-white">Stream Now</h3>
                  <Badge className="bg-primary text-white hover:bg-primary/90">Server 1</Badge>
                  <Badge variant="outline" className="text-muted-foreground hover:text-white cursor-pointer">Server 2</Badge>
                </div>
                
                <div className="w-full aspect-video bg-black rounded-xl overflow-hidden border border-white/10 relative shadow-2xl flex items-center justify-center group">
                  <iframe
                    src={`https://embed.smashystream.com/playere.php?tmdb=${movie.id}`}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                    frameBorder="0"
                    scrolling="no"
                  />
                </div>
                
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-sm text-yellow-500/80 flex items-start gap-3">
                   <div className="mt-0.5">⚠️</div>
                   <p>If the video doesn't play, please try switching servers or disable your adblocker. This is a demo player placeholder.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AdPlaceholder className="mb-20" />
      </main>

      <Footer />
    </div>
  );
}
