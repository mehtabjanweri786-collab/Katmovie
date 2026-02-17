import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function DMCA() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-body">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-display font-bold text-white mb-8">DMCA Policy</h1>
        <div className="prose prose-invert max-w-4xl text-muted-foreground space-y-6">
          <p>KatMovieHD respects the intellectual property rights of others. In accordance with the Digital Millennium Copyright Act (DMCA), we will respond promptly to notices of alleged infringement that are reported to our designated copyright agent.</p>
          <p>If you are a copyright owner, authorized to act on behalf of one, or authorized to act under any exclusive right under copyright, please report alleged copyright infringements taking place on or through the Site by completing a DMCA Notice of Alleged Infringement and delivering it to our designated copyright agent.</p>
          <p>Upon receipt of a valid DMCA notice, we will take whatever action, in our sole discretion, it deems appropriate, including removal of the challenged content from the Site.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}