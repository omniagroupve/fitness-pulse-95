import { cn } from '@/lib/utils';
import { MapPin, TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle } from 'lucide-react';

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
      bg: 'bg-success/5 hover:bg-success/10',
      border: 'border-success/20 hover:border-success/40',
      icon: CheckCircle,
      iconColor: 'text-success',
      glow: 'hover:shadow-[0_0_20px_hsl(142,71%,45%,0.15)]'
    },
    warning: {
      bg: 'bg-warning/5 hover:bg-warning/10',
      border: 'border-warning/20 hover:border-warning/40',
      icon: AlertTriangle,
      iconColor: 'text-warning',
      glow: 'hover:shadow-[0_0_20px_hsl(38,92%,50%,0.15)]'
    },
    critical: {
      bg: 'bg-destructive/5 hover:bg-destructive/10',
      border: 'border-destructive/20 hover:border-destructive/40',
      icon: AlertTriangle,
      iconColor: 'text-destructive',
      glow: 'hover:shadow-[0_0_20px_hsl(0,72%,51%,0.15)]'
    }
  };

  return (
    <div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {sedes.map((sede, index) => {
        const status = sede.status || getStatus(sede.variacion);
        const config = statusConfig[status];
        const StatusIcon = config.icon;
        const isPositive = sede.variacion > 0;
        const isNegative = sede.variacion < 0;

        return (
          <div
            key={sede.sede}
            className={cn(
              "relative rounded-xl border p-4",
              "transition-all duration-300",
              config.bg,
              config.border,
              config.glow,
              "animate-scale-in",
              `stagger-${index + 1}`
            )}
            style={{ opacity: 0 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg bg-muted/50 flex items-center justify-center">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                </div>
                <span className="text-xs font-semibold text-foreground">{sede.sede}</span>
              </div>
              <StatusIcon className={cn("h-4 w-4", config.iconColor)} />
            </div>

            {/* Value */}
            <div className="mb-2">
              <p className="text-2xl font-bold text-foreground tracking-tight">
                ${sede.ventas.toLocaleString()}
              </p>
            </div>

            {/* Change */}
            <div className={cn(
              "flex items-center gap-1 text-xs font-medium",
              isPositive && "text-success",
              isNegative && "text-destructive",
              !isPositive && !isNegative && "text-muted-foreground"
            )}>
              {isPositive && <TrendingUp className="h-3 w-3" />}
              {isNegative && <TrendingDown className="h-3 w-3" />}
              {!isPositive && !isNegative && <Minus className="h-3 w-3" />}
              <span>{isPositive && '+'}{sede.variacion}% vs ayer</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
