import omniaLogo from '@/assets/omnia-logo.png';

export function PoweredByOmnia() {
  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-card/60 backdrop-blur-xl border border-border/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
      <div className="flex flex-col items-end">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70 font-medium">
          Powered by
        </span>
      </div>
      <div className="h-6 w-px bg-border/50" />
      <img 
        src={omniaLogo} 
        alt="Omnia" 
        className="h-6 w-auto object-contain opacity-80"
      />
    </div>
  );
}
