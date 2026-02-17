import { Link } from "wouter";
import { Clapperboard, Github, Twitter, Instagram } from "lucide-react";
import { AdPlaceholder } from "./AdPlaceholder";

export function Footer() {
  return (
    <footer className="bg-card border-t border-white/5 pt-12 pb-8 mt-auto">
      <div className="container mx-auto px-4">
        <AdPlaceholder className="mb-12" />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="bg-primary/20 p-2 rounded-lg">
                <Clapperboard className="w-6 h-6 text-primary" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                Kat<span className="text-primary">Movie</span>HD
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The best place to discover trending movies, explore detailed information, and find your next favorite watch. Premium quality, curated for you.
            </p>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-white mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/category/28" className="hover:text-primary transition-colors">Action</Link></li>
              <li><Link href="/category/35" className="hover:text-primary transition-colors">Comedy</Link></li>
              <li><Link href="/category/27" className="hover:text-primary transition-colors">Horror</Link></li>
              <li><Link href="/category/878" className="hover:text-primary transition-colors">Sci-Fi</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/dmca" className="hover:text-primary transition-colors">DMCA</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-white mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} KatMovieHD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
