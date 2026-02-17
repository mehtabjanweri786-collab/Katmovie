import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-body">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-display font-bold text-white mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-4xl text-muted-foreground space-y-6">
          <p>At KatMovieHD, we prioritize the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by KatMovieHD and how we use it.</p>
          <p>We follow a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.</p>
          <p>Our website uses "cookies" to store information about visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}