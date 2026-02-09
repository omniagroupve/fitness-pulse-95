import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface CommandCardProps {
  children: ReactNode;
  className?: string;
  glow?: 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'none';
  hover?: boolean;
  scanline?: boolean;
  hudCorners?: boolean;
  style?: React.CSSProperties;
}

export function CommandCard({ 
  children, 
  className,
  glow = 'none',
  hover = true,
  scanline = false,
  hudCorners = false,
  style
}: CommandCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-border/60",
        "bg-card/60 backdrop-blur-xl",
        "animate-data-pulse",
        hover && "transition-all duration-300 hover:border-primary/30 hover:bg-card/80",
        scanline && "scanline-overlay",
        hudCorners && "hud-corners",
        glow === 'primary' && "glow-primary",
        glow === 'secondary' && "glow-secondary",
        glow === 'success' && "glow-success",
        glow === 'warning' && "glow-warning",
        glow === 'destructive' && "glow-destructive",
        className
      )}
      style={style}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      {children}
    </div>
  );
}

interface CommandCardHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function CommandCardHeader({ title, subtitle, icon, action }: CommandCardHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border/40">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-muted to-muted/60 flex items-center justify-center border border-border/30">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-sm font-semibold text-foreground tracking-tight">{title}</h3>
          {subtitle && (
            <p className="text-[11px] text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {action}
    </div>
  );
}

export function CommandCardContent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("p-4", className)}>
      {children}
    </div>
  );
}
