import { cn } from '@/lib/utils';
import { MapPin, TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle, Zap } from 'lucide-react';

interface SedeData {
  sede: string;
  ventas: number;
  variacion: number;
  status?: 'ok' | 'warning' | 'critical';
}

interface SedeGridProps {
  sedes: SedeData[];
  className?: string;
}

export function SedeGrid({ sedes, className }: SedeGridProps) {
  const getStatus = (variacion: number): 'ok' | 'warning' | 'critical' => {
    if (variacion >= 5) return 'ok';
    if (variacion >= 0) return 'warning';
    return 'critical';
  };

  const statusConfig = {
    ok: {
      border: 'border-success/20 hover:border-success/50',
      glow: 'hover:shadow-[0_0_25px_hsl(142,71%,45%,0.12)]',
      indicator: 'bg-success',
      iconColor: 'text-success',
      topLine: 'via-success/40',
    },
    warning: {
      border: 'border-warning/20 hover:border-warning/50',
      glow: 'hover:shadow-[0_0_25px_hsl(38,92%,50%,0.12)]',
      indicator: 'bg-warning',
      iconColor: 'text-warning',
      topLine: 'via-warning/40',
    },
    critical: {
      border: 'border-destructive/20 hover:border-destructive/50',
      glow: 'hover:shadow-[0_0_25px_hsl(0,72%,51%,0.12)]',
      indicator: 'bg-destructive',
      iconColor: 'text-destructive',
      topLine: 'via-destructive/40',
    }
  };

  return (
    <div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {sedes.map((sede, index) => {
        const status = sede.status || getStatus(sede.variacion);
        const config = statusConfig[status];
        const isPositive = sede.variacion > 0;
        const isNegative = sede.variacion < 0;

        return (
          <div
            key={sede.sede}
            className={cn(
              "relative rounded-xl border p-4 overflow-hidden",
              "bg-card/40 backdrop-blur-sm",
              "transition-all duration-300 hover:-translate-y-0.5",
              config.border,
              config.glow,
              "animate-scale-in",
              `stagger-${index + 1}`
            )}
            style={{ opacity: 0 }}
          >
            {/* Top accent */}
            <div className={cn(
              "absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent to-transparent",
              config.topLine
            )} />

            {/* Status indicator */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={cn("h-1.5 w-1.5 rounded-full", config.indicator)} />
                <span className="text-xs font-bold text-foreground tracking-tight">{sede.sede}</span>
              </div>
              <MapPin className="h-3 w-3 text-muted-foreground/40" />
            </div>

            {/* Value */}
            <p className="text-2xl font-bold text-foreground tracking-tight tabular-nums mb-2">
              ${sede.ventas.toLocaleString()}
            </p>

            {/* Change */}
            <div className={cn(
              "flex items-center gap-1 text-xs font-semibold",
              isPositive && "text-success",
              isNegative && "text-destructive",
              !isPositive && !isNegative && "text-muted-foreground"
            )}>
              {isPositive && <TrendingUp className="h-3 w-3" />}
              {isNegative && <TrendingDown className="h-3 w-3" />}
              {!isPositive && !isNegative && <Minus className="h-3 w-3" />}
              <span>{isPositive && '+'}{sede.variacion}%</span>
              <span className="text-muted-foreground/50 font-normal ml-0.5">vs ayer</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
