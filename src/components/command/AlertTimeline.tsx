import { cn } from '@/lib/utils';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface Alert {
  tipo: string;
  mensaje: string;
  sede: string;
  prioridad: 'alta' | 'media' | 'baja';
}

interface AlertTimelineProps {
  alerts: Alert[];
  maxItems?: number;
  className?: string;
}

export function AlertTimeline({ alerts, maxItems = 5, className }: AlertTimelineProps) {
  const displayAlerts = alerts.slice(0, maxItems);

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'alta':
        return {
          icon: AlertTriangle,
          color: 'text-destructive',
          bg: 'bg-destructive/5',
          border: 'border-destructive/20',
          dot: 'bg-destructive shadow-[0_0_6px_hsl(0,72%,51%,0.5)]'
        };
      case 'media':
        return {
          icon: AlertCircle,
          color: 'text-warning',
          bg: 'bg-warning/5',
          border: 'border-warning/20',
          dot: 'bg-warning shadow-[0_0_6px_hsl(38,92%,50%,0.5)]'
        };
      default:
        return {
          icon: Info,
          color: 'text-muted-foreground',
          bg: 'bg-muted/30',
          border: 'border-border/40',
          dot: 'bg-muted-foreground'
        };
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {displayAlerts.map((alert, index) => {
        const config = getPriorityConfig(alert.prioridad);
        const Icon = config.icon;

        return (
          <div 
            key={index}
            className={cn(
              "relative flex items-start gap-3 p-3 rounded-lg border",
              "transition-all duration-200 hover:bg-card/60",
              config.bg,
              config.border,
              "animate-fade-in",
              `stagger-${index + 1}`
            )}
            style={{ opacity: 0 }}
          >
            {/* Glowing dot */}
            <div className={cn(
              "h-2 w-2 rounded-full mt-1.5 flex-shrink-0",
              config.dot,
              alert.prioridad === 'alta' && "animate-pulse"
            )} />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-foreground leading-tight">
                {alert.mensaje}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[9px] uppercase tracking-widest text-muted-foreground/60 font-bold">
                  {alert.tipo}
                </span>
                <span className="text-[9px] text-muted-foreground/30">•</span>
                <span className="text-[10px] text-muted-foreground/50">
                  {alert.sede}
                </span>
              </div>
            </div>
            <Icon className={cn("h-3.5 w-3.5 flex-shrink-0 mt-0.5", config.color)} />
          </div>
        );
      })}
    </div>
  );
}
