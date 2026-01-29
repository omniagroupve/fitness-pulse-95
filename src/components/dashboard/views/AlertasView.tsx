import { useState } from 'react';
import { AlertTriangle, AlertCircle, Info, Clock } from 'lucide-react';
import { FuturisticCard } from '../FuturisticCard';
import { alertas } from '@/lib/mockData';
import { cn } from '@/lib/utils';

type FilterType = 'todas' | 'criticas' | 'advertencias' | 'info';

const allAlertas = [
  ...alertas.criticas.map(a => ({ ...a, level: 'critica' as const })),
  ...alertas.advertencias.map(a => ({ ...a, level: 'advertencia' as const })),
  ...alertas.informativas.map(a => ({ ...a, level: 'info' as const })),
];

export function AlertasView() {
  const [filter, setFilter] = useState<FilterType>('todas');

  const filteredAlertas = allAlertas.filter(a => {
    if (filter === 'todas') return true;
    if (filter === 'criticas') return a.level === 'critica';
    if (filter === 'advertencias') return a.level === 'advertencia';
    return a.level === 'info';
  });

  const getIcon = (level: string) => {
    switch (level) {
      case 'critica': return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case 'advertencia': return <AlertCircle className="h-5 w-5 text-warning" />;
      default: return <Info className="h-5 w-5 text-secondary" />;
    }
  };

  const getLevelStyles = (level: string) => {
    switch (level) {
      case 'critica': return 'border-l-destructive bg-destructive/5';
      case 'advertencia': return 'border-l-warning bg-warning/5';
      default: return 'border-l-secondary bg-secondary/5';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'todas' as const, label: 'Todas', count: allAlertas.length },
          { id: 'criticas' as const, label: 'Críticas', count: alertas.criticas.length },
          { id: 'advertencias' as const, label: 'Advertencias', count: alertas.advertencias.length },
          { id: 'info' as const, label: 'Informativas', count: alertas.informativas.length },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
              filter === item.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {item.label}
            <span className={cn(
              "px-2 py-0.5 rounded-full text-xs",
              filter === item.id
                ? "bg-primary-foreground/20"
                : "bg-foreground/10"
            )}>
              {item.count}
            </span>
          </button>
        ))}
      </div>

      {/* Timeline */}
      <FuturisticCard className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Centro de Alertas</h3>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
          
          <div className="space-y-4">
            {filteredAlertas.map((alerta, i) => (
              <div 
                key={i}
                className={cn(
                  "relative pl-14 pr-4 py-4 rounded-lg border-l-4",
                  getLevelStyles(alerta.level)
                )}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-card border-2 border-border flex items-center justify-center">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    alerta.level === 'critica' && "bg-destructive",
                    alerta.level === 'advertencia' && "bg-warning",
                    alerta.level === 'info' && "bg-secondary"
                  )} />
                </div>
                
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    {getIcon(alerta.level)}
                    <div>
                      <p className="font-medium text-foreground">{alerta.mensaje}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-muted-foreground">{alerta.sede}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground capitalize">{alerta.tipo}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Hoy</span>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredAlertas.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No hay alertas en esta categoría
              </div>
            )}
          </div>
        </div>
      </FuturisticCard>
    </div>
  );
}
