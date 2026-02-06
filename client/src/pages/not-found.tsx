import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md mx-4 border-white/10 bg-card/50 backdrop-blur-xl">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <h1 className="text-2xl font-bold font-display text-white">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            The page you are looking for does not exist. It might have been moved or deleted.
          </p>

          <div className="mt-8 flex justify-end">
             <Link href="/">
               <Button className="bg-primary hover:bg-primary/90 text-white font-bold">
                 Return Home
               </Button>
             </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
