import omniaLogo from '@/assets/omnia-logo.png';

export function PoweredByOmnia() {
  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-card/80 backdrop-blur-sm border border-border shadow-sm">
      <span className="text-xs text-muted-foreground">Powered by</span>
      <img 
        src={omniaLogo} 
        alt="Omnia" 
        className="h-5 w-auto object-contain"
      />
    </div>
  );
}
