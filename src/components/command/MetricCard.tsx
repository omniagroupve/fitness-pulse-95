import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ReactNode } from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
  status?: 'success' | 'warning' | 'destructive' | 'neutral';
  size?: 'default' | 'large';
  className?: string;
}

export function MetricCard({ 
  label, 
  value, 
  change, 
  changeLabel,
  icon,
  status = 'neutral',
  size = 'default',
  className 
}: MetricCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;
  const isNeutral = change === undefined || change === 0;

  const statusBg = {
    success: 'bg-success/5 border-success/20 hover:border-success/40',
    warning: 'bg-warning/5 border-warning/20 hover:border-warning/40',
    destructive: 'bg-destructive/5 border-destructive/20 hover:border-destructive/40',
    neutral: 'bg-card/40 border-border/40 hover:border-border/60'
  };

  const statusGlow = {
    success: 'hover:shadow-[0_0_20px_hsl(142,71%,45%,0.1)]',
    warning: 'hover:shadow-[0_0_20px_hsl(38,92%,50%,0.1)]',
    destructive: 'hover:shadow-[0_0_20px_hsl(0,72%,51%,0.1)]',
    neutral: 'hover:shadow-[0_0_20px_hsl(185,100%,50%,0.05)]'
  };

  return (
    <div className={cn(
      "relative rounded-xl border p-4 overflow-hidden",
      "backdrop-blur-sm",
      "transition-all duration-300",
      statusBg[status],
      statusGlow[status],
      className
    )}>
      {/* Subtle scanline */}
      <div className="absolute inset-0 scanline-overlay pointer-events-none" />
      
      {/* Top accent */}
      <div className={cn(
        "absolute top-0 left-[20%] right-[20%] h-px",
        status === 'success' && "bg-gradient-to-r from-transparent via-success/40 to-transparent",
        status === 'warning' && "bg-gradient-to-r from-transparent via-warning/40 to-transparent",
        status === 'destructive' && "bg-gradient-to-r from-transparent via-destructive/40 to-transparent",
        status === 'neutral' && "bg-gradient-to-r from-transparent via-primary/20 to-transparent"
      )} />

      {/* Header */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
        {icon && (
          <div className="h-8 w-8 rounded-lg bg-muted/50 flex items-center justify-center border border-border/30">
            {icon}
          </div>
        )}
      </div>

      {/* Value */}
      <p className={cn(
        "font-bold tracking-tight relative z-10 tabular-nums",
        size === 'large' ? 'text-3xl' : 'text-2xl'
      )}>
        {value}
      </p>

      {/* Change indicator */}
      {change !== undefined && (
        <div className={cn(
          "flex items-center gap-1.5 mt-2 text-xs font-medium relative z-10",
          isPositive && 'text-success',
          isNegative && 'text-destructive',
          isNeutral && 'text-muted-foreground'
        )}>
          {isPositive && <TrendingUp className="h-3 w-3" />}
          {isNegative && <TrendingDown className="h-3 w-3" />}
          {isNeutral && <Minus className="h-3 w-3" />}
          <span>
            {isPositive && '+'}
            {change}%
            {changeLabel && <span className="text-muted-foreground ml-1">{changeLabel}</span>}
          </span>
        </div>
      )}
    </div>
  );
}
