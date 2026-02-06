import { Link, useLocation } from "wouter";
import { Clapperboard, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

const CATEGORIES = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 27, name: "Horror" },
  { id: 878, name: "Sci-Fi" },
  { id: 10749, name: "Romance" },
  { id: 53, name: "Thriller" },
  { id: 18, name: "Drama" },
  { id: 9648, name: "Mystery" },
  { id: 80, name: "Crime" },
  { id: 16, name: "Animation" },
  { id: 12, name: "Adventure" },
  { id: 14, name: "Fantasy" },
];

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors">
            <Clapperboard className="w-6 h-6 text-primary" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-white">
            Kat<span className="text-primary">Movie</span>HD
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link href="/" className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${location === '/' ? 'bg-white/10 text-white' : 'text-muted-foreground hover:text-white hover:bg-white/5'}`}>
            Home
          </Link>
          {CATEGORIES.slice(0, 5).map(cat => (
            <Link 
              key={cat.id} 
              href={`/category/${cat.id}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${location === `/category/${cat.id}` ? 'bg-white/10 text-white' : 'text-muted-foreground hover:text-white hover:bg-white/5'}`}
            >
              {cat.name}
            </Link>
          ))}
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="ml-2 gap-2 text-muted-foreground hover:text-white">
                <Menu className="w-4 h-4" />
                <span>More</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card border-l border-white/10 w-72 p-0">
              <ScrollArea className="h-full py-6">
                <div className="px-6 mb-6">
                  <h3 className="font-display text-lg font-bold text-white mb-2">Categories</h3>
                  <p className="text-sm text-muted-foreground">Explore our full catalog</p>
                </div>
                <div className="px-3 flex flex-col gap-1">
                  {CATEGORIES.map(cat => (
                    <Link 
                      key={cat.id} 
                      href={`/category/${cat.id}`}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-between group ${location === `/category/${cat.id}` ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-white/5 hover:text-white'}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {cat.name}
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary transition-colors" />
                    </Link>
                  ))}
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </nav>

        {/* Search / Mobile Menu */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white rounded-full">
            <Search className="w-5 h-5" />
          </Button>
          
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-card border-r border-white/10 p-0 w-[80%]">
                <div className="p-6 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/20 p-2 rounded-lg">
                      <Clapperboard className="w-6 h-6 text-primary" />
                    </div>
                    <span className="font-display font-bold text-xl text-white">
                      Kat<span className="text-primary">Movie</span>HD
                    </span>
                  </div>
                </div>
                <ScrollArea className="h-[calc(100vh-80px)]">
                  <div className="p-4 flex flex-col gap-1">
                    <Link 
                      href="/" 
                      className={`px-4 py-3 rounded-lg font-medium ${location === '/' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-white'}`}
                      onClick={() => setIsOpen(false)}
                    >
                      Home
                    </Link>
                    <div className="my-2 px-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Categories</div>
                    {CATEGORIES.map(cat => (
                      <Link 
                        key={cat.id} 
                        href={`/category/${cat.id}`}
                        className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${location === `/category/${cat.id}` ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-white/5 hover:text-white'}`}
                        onClick={() => setIsOpen(false)}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
