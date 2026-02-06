import { Link } from "wouter";
import { PlayCircle, Star, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string | null;
  voteAverage: number;
  releaseDate?: string;
  isHindi?: boolean;
}

export function MovieCard({ id, title, posterPath, voteAverage, releaseDate, isHindi }: MovieCardProps) {
  const imageUrl = posterPath 
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const year = releaseDate ? new Date(releaseDate).getFullYear() : null;

  return (
    <Link href={`/watch/${id}`} className="group relative flex flex-col gap-3 w-full cursor-pointer">
      {/* Poster Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-card border border-white/5 shadow-lg shadow-black/20 transition-all duration-500 group-hover:shadow-primary/25 group-hover:scale-[1.02] group-hover:-translate-y-1">
        <img 
          src={imageUrl} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
          <div className="bg-primary/90 text-white p-4 rounded-full backdrop-blur-sm shadow-2xl shadow-primary/50">
            <PlayCircle className="w-8 h-8 fill-current" />
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isHindi && (
            <Badge className="bg-yellow-500/90 hover:bg-yellow-500 text-black font-bold backdrop-blur-sm shadow-sm">
              Hindi
            </Badge>
          )}
          <Badge variant="secondary" className="bg-black/60 hover:bg-black/70 backdrop-blur-md text-white border-white/10 font-mono text-xs">
            HD
          </Badge>
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-bold text-white">{voteAverage.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1">
        <h3 className="font-display font-semibold text-base leading-tight text-white group-hover:text-primary transition-colors line-clamp-1" title={title}>
          {title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {year && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{year}</span>
            </div>
          )}
          <span>•</span>
          <span>Movie</span>
        </div>
      </div>
    </Link>
  );
}
