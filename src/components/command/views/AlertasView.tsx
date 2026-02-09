import { useState } from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle, AlertCircle, Info, Shield } from 'lucide-react';
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
    alta: { icon: AlertTriangle, color: 'text-destructive', bg: 'bg-destructive/5', border: 'border-destructive/20', label: 'Crítico', dot: 'bg-destructive shadow-[0_0_6px_hsl(0,72%,51%,0.5)]' },
    media: { icon: AlertCircle, color: 'text-warning', bg: 'bg-warning/5', border: 'border-warning/20', label: 'Advertencia', dot: 'bg-warning shadow-[0_0_6px_hsl(38,92%,50%,0.5)]' },
    baja: { icon: Info, color: 'text-muted-foreground', bg: 'bg-muted/20', border: 'border-border/40', label: 'Info', dot: 'bg-muted-foreground' }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-lg bg-destructive/10 flex items-center justify-center border border-destructive/20">
            <Shield className="h-3.5 w-3.5 text-destructive" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground tracking-tight">Alertas</h2>
            <p className="text-[11px] text-muted-foreground/60">{allAlerts.length} cosas que necesitan tu atención</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-0.5 p-1 rounded-lg bg-muted/20 border border-border/40">
          {[
            { id: 'all' as const, label: 'Todas' },
            { id: 'alta' as const, label: 'Críticas' },
            { id: 'media' as const, label: 'Advertencias' },
            { id: 'baja' as const, label: 'Info' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              className={cn(
                "px-3 py-1.5 text-[11px] font-semibold rounded-md transition-all duration-200",
                filter === item.id
                  ? "bg-card text-foreground border border-border/50"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
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
            <div className="h-10 w-10 rounded-xl bg-destructive/10 flex items-center justify-center border border-destructive/20">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground/60 uppercase font-bold tracking-wider">Críticas</p>
              <p className="text-2xl font-bold text-destructive tabular-nums">{alertas.criticas.length}</p>
            </div>
          </div>
        </CommandCard>

        <CommandCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-warning/10 flex items-center justify-center border border-warning/20">
              <AlertCircle className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground/60 uppercase font-bold tracking-wider">Advertencias</p>
              <p className="text-2xl font-bold text-warning tabular-nums">{alertas.advertencias.length}</p>
            </div>
          </div>
        </CommandCard>

        <CommandCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-muted/30 flex items-center justify-center border border-border/30">
              <Info className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground/60 uppercase font-bold tracking-wider">Informativas</p>
              <p className="text-2xl font-bold text-muted-foreground tabular-nums">{alertas.informativas.length}</p>
            </div>
          </div>
        </CommandCard>
      </div>

      {/* Alert Timeline */}
      <CommandCard scanline>
        <CommandCardHeader 
          title="Detalle de Alertas"
          subtitle="De más urgente a menos urgente"
          icon={<AlertTriangle className="h-4 w-4 text-primary" />}
        />
        <CommandCardContent>
          <div className="space-y-3">
            {filteredAlerts.length === 0 ? (
              <div className="text-center py-8">
                <Info className="h-8 w-8 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground/50">No hay alertas con este filtro</p>
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
                      "transition-all duration-200 hover:bg-card/60",
                      config.bg,
                      config.border,
                      "animate-fade-in"
                    )}
                    style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
                  >
                    {/* Timeline connector */}
                    {index < filteredAlerts.length - 1 && (
                      <div className="absolute left-[1.625rem] top-14 w-px h-[calc(100%-0.5rem)] bg-gradient-to-b from-border/40 to-transparent" />
                    )}

                    {/* Icon */}
                    <div className={cn(
                      "h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 z-10 border",
                      config.bg,
                      config.border
                    )}>
                      <Icon className={cn("h-4 w-4", config.color)} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[13px] font-semibold text-foreground">{alert.mensaje}</p>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-[10px] text-muted-foreground/50">{alert.sede}</span>
                            <span className="text-[10px] text-muted-foreground/30">•</span>
                            <span className="text-[9px] uppercase tracking-widest text-muted-foreground/40 font-bold">
                              {alert.tipo}
                            </span>
                          </div>
                        </div>
                        <span className={cn(
                          "px-2 py-1 text-[9px] font-bold rounded-lg uppercase tracking-wider flex-shrink-0 border",
                          alert.prioridad === 'alta' && "bg-destructive/10 text-destructive border-destructive/20",
                          alert.prioridad === 'media' && "bg-warning/10 text-warning border-warning/20",
                          alert.prioridad === 'baja' && "bg-muted/30 text-muted-foreground border-border/40"
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
