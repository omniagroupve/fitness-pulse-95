import { AlertTriangle, AlertCircle, Info, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { alertas } from '@/lib/mockData';

type Prioridad = 'alta' | 'media' | 'baja';

const prioridadConfig: Record<Prioridad, { icon: typeof AlertTriangle; color: string; bgColor: string; borderColor: string }> = {
  alta: { 
    icon: AlertTriangle, 
    color: 'text-destructive', 
    bgColor: 'bg-destructive/10',
    borderColor: 'border-destructive/30'
  },
  media: { 
    icon: AlertCircle, 
    color: 'text-warning', 
    bgColor: 'bg-warning/10',
    borderColor: 'border-warning/30'
  },
  baja: { 
    icon: Info, 
    color: 'text-secondary', 
    bgColor: 'bg-secondary/10',
    borderColor: 'border-secondary/30'
  },
};

export function AlertasSection() {
  const allAlertas = [
    ...alertas.criticas.map(a => ({ ...a, prioridadLabel: 'Crítica' as const })),
    ...alertas.advertencias.map(a => ({ ...a, prioridadLabel: 'Advertencia' as const })),
    ...alertas.informativas.map(a => ({ ...a, prioridadLabel: 'Info' as const })),
  ];

  const criticalCount = alertas.criticas.length;
  const warningCount = alertas.advertencias.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Alertas Operativas</h2>
        <div className="flex items-center gap-2">
          {criticalCount > 0 && (
            <Badge variant="destructive">
              {criticalCount} crítica{criticalCount > 1 ? 's' : ''}
            </Badge>
          )}
          {warningCount > 0 && (
            <Badge variant="secondary" className="bg-warning/20 text-warning border-warning/30">
              {warningCount} advertencia{warningCount > 1 ? 's' : ''}
            </Badge>
          )}
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {allAlertas.map((alerta, idx) => {
              const config = prioridadConfig[alerta.prioridad as Prioridad];
              const Icon = config.icon;
              
              return (
                <div 
                  key={idx}
                  className={`p-4 flex items-center gap-4 hover:bg-muted/30 transition-colors cursor-pointer ${
                    idx === 0 ? 'rounded-t-lg' : ''
                  } ${idx === allAlertas.length - 1 ? 'rounded-b-lg' : ''}`}
                >
                  <div className={`h-10 w-10 rounded-full ${config.bgColor} flex items-center justify-center shrink-0`}>
                    <Icon className={`h-5 w-5 ${config.color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{alerta.mensaje}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {alerta.tipo}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{alerta.sede}</span>
                    </div>
                  </div>

                  <Badge 
                    variant={alerta.prioridad === 'alta' ? 'destructive' : 'secondary'}
                    className={alerta.prioridad === 'media' ? 'bg-warning/20 text-warning' : ''}
                  >
                    {alerta.prioridadLabel}
                  </Badge>
                  
                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
