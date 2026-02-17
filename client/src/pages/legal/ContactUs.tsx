import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-body">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-display font-bold text-white mb-8">Contact Us</h1>
        <div className="max-w-2xl text-muted-foreground space-y-8">
          <p>Have questions or feedback? We'd love to hear from you. Please fill out the form below and we will get back to you as soon as possible.</p>
          
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully!'); }}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Name</label>
              <Input placeholder="Your Name" className="bg-white/5 border-white/10" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Email</label>
              <Input type="email" placeholder="your@email.com" className="bg-white/5 border-white/10" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Message</label>
              <Textarea placeholder="How can we help?" className="bg-white/5 border-white/10 min-h-[150px]" required />
            </div>
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}