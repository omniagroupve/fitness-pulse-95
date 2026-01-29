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

  const statusColors = {
    success: 'text-success',
    warning: 'text-warning',
    destructive: 'text-destructive',
    neutral: 'text-muted-foreground'
  };

  const bgColors = {
    success: 'bg-success/10 border-success/20',
    warning: 'bg-warning/10 border-warning/20',
    destructive: 'bg-destructive/10 border-destructive/20',
    neutral: 'bg-muted border-border/40'
  };

  return (
    <div className={cn(
      "relative rounded-xl border p-4",
      "bg-card/40 backdrop-blur-sm",
      "transition-all duration-300 hover:bg-card/60",
      bgColors[status],
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
        {icon && (
          <div className={cn(
            "h-8 w-8 rounded-lg flex items-center justify-center",
            status === 'neutral' ? 'bg-muted' : `bg-${status}/20`
          )}>
            {icon}
          </div>
        )}
      </div>

      {/* Value */}
      <p className={cn(
        "font-bold tracking-tight",
        size === 'large' ? 'text-3xl' : 'text-2xl'
      )}>
        {value}
      </p>

      {/* Change indicator */}
      {change !== undefined && (
        <div className={cn(
          "flex items-center gap-1.5 mt-2 text-xs font-medium",
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
