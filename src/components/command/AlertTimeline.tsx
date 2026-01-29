import { cn } from '@/lib/utils';
import { AlertTriangle, AlertCircle, Info, Clock } from 'lucide-react';

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
          bg: 'bg-destructive/10',
          border: 'border-destructive/30',
          dot: 'bg-destructive'
        };
      case 'media':
        return {
          icon: AlertCircle,
          color: 'text-warning',
          bg: 'bg-warning/10',
          border: 'border-warning/30',
          dot: 'bg-warning'
        };
      default:
        return {
          icon: Info,
          color: 'text-muted-foreground',
          bg: 'bg-muted',
          border: 'border-border',
          dot: 'bg-muted-foreground'
        };
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      {displayAlerts.map((alert, index) => {
        const config = getPriorityConfig(alert.prioridad);
        const Icon = config.icon;

        return (
          <div 
            key={index}
            className={cn(
              "relative flex items-start gap-3 p-3 rounded-lg border",
              "transition-all duration-200 hover:bg-card/80",
              config.bg,
              config.border,
              "animate-fade-in",
              `stagger-${index + 1}`
            )}
            style={{ opacity: 0 }}
          >
            {/* Timeline dot */}
            <div className={cn(
              "h-2 w-2 rounded-full mt-2 flex-shrink-0",
              config.dot,
              alert.prioridad === 'alta' && "animate-pulse"
            )} />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-foreground leading-tight">
                  {alert.mensaje}
                </p>
                <Icon className={cn("h-4 w-4 flex-shrink-0", config.color)} />
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                  {alert.tipo}
                </span>
                <span className="text-[10px] text-muted-foreground/50">•</span>
                <span className="text-[10px] text-muted-foreground">
                  {alert.sede}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
