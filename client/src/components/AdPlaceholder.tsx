export function AdPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full max-w-4xl mx-auto my-8 overflow-hidden rounded-lg bg-black/40 border border-dashed border-white/10 flex flex-col items-center justify-center p-8 text-center gap-2 ${className}`}>
      <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Advertisement</span>
      <div className="text-sm text-muted-foreground/50 font-medium">
        Adsterra Space (728x90)
      </div>
    </div>
  );
}
