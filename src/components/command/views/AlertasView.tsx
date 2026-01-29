import { useState } from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle, AlertCircle, Info, Filter } from 'lucide-react';
import { CommandCard, CommandCardHeader, CommandCardContent } from '../CommandCard';
import { alertas } from '@/lib/mockData';

type Priority = 'all' | 'alta' | 'media' | 'baja';

export function AlertasView() {
  const [filter, setFilter] = useState<Priority>('all');

  const allAlerts = [
    ...alertas.criticas.map(a => ({ ...a, prioridad: 'alta' as const })),
    ...alertas.advertencias.map(a => ({ ...a, prioridad: 'media' as const })),
    ...alertas.informativas.map(a => ({ ...a, prioridad: 'baja' as const })),
  ];

  const filteredAlerts = filter === 'all' 
    ? allAlerts 
    : allAlerts.filter(a => a.prioridad === filter);

  const priorityConfig = {
    alta: { icon: AlertTriangle, color: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/30', label: 'Crítico' },
    media: { icon: AlertCircle, color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30', label: 'Advertencia' },
    baja: { icon: Info, color: 'text-muted-foreground', bg: 'bg-muted', border: 'border-border', label: 'Info' }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Centro de Alertas</h2>
          <p className="text-sm text-muted-foreground">{allAlerts.length} señales detectadas por el sistema</p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 p-1 rounded-lg bg-muted/30 border border-border/50">
          {[
            { id: 'all' as const, label: 'Todas' },
            { id: 'alta' as const, label: 'Críticas', color: 'text-destructive' },
            { id: 'media' as const, label: 'Advertencias', color: 'text-warning' },
            { id: 'baja' as const, label: 'Info', color: 'text-muted-foreground' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                filter === item.id
                  ? "bg-card text-foreground"
                  : item.color || "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <CommandCard className="p-4" glow={alertas.criticas.length > 0 ? 'destructive' : 'none'}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Críticas</p>
              <p className="text-2xl font-bold text-destructive">{alertas.criticas.length}</p>
            </div>
          </div>
        </CommandCard>

        <CommandCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Advertencias</p>
              <p className="text-2xl font-bold text-warning">{alertas.advertencias.length}</p>
            </div>
          </div>
        </CommandCard>

        <CommandCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
              <Info className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Informativas</p>
              <p className="text-2xl font-bold text-muted-foreground">{alertas.informativas.length}</p>
            </div>
          </div>
        </CommandCard>
      </div>

      {/* Alert Timeline */}
      <CommandCard>
        <CommandCardHeader 
          title="Timeline de Alertas"
          subtitle="Ordenadas por prioridad"
          icon={<AlertTriangle className="h-4 w-4 text-primary" />}
        />
        <CommandCardContent>
          <div className="space-y-4">
            {filteredAlerts.length === 0 ? (
              <div className="text-center py-8">
                <Info className="h-8 w-8 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No hay alertas con este filtro</p>
              </div>
            ) : (
              filteredAlerts.map((alert, index) => {
                const config = priorityConfig[alert.prioridad];
                const Icon = config.icon;

                return (
                  <div 
                    key={index}
                    className={cn(
                      "relative flex items-start gap-4 p-4 rounded-xl border",
                      "transition-all duration-200 hover:bg-card/80",
                      config.bg,
                      config.border,
                      "animate-fade-in"
                    )}
                    style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
                  >
                    {/* Timeline Line */}
                    {index < filteredAlerts.length - 1 && (
                      <div className="absolute left-[1.625rem] top-12 w-0.5 h-[calc(100%+1rem)] bg-border/50" />
                    )}

                    {/* Icon */}
                    <div className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 z-10",
                      config.bg,
                      "border",
                      config.border
                    )}>
                      <Icon className={cn("h-4 w-4", config.color)} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium text-foreground">{alert.mensaje}</p>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-xs text-muted-foreground">{alert.sede}</span>
                            <span className="text-xs text-muted-foreground/50">•</span>
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                              {alert.tipo}
                            </span>
                          </div>
                        </div>
                        <span className={cn(
                          "px-2 py-1 text-[10px] font-bold rounded-full uppercase flex-shrink-0",
                          alert.prioridad === 'alta' && "bg-destructive/20 text-destructive",
                          alert.prioridad === 'media' && "bg-warning/20 text-warning",
                          alert.prioridad === 'baja' && "bg-muted text-muted-foreground"
                        )}>
                          {config.label}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CommandCardContent>
      </CommandCard>
    </div>
  );
}
