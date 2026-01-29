import { MessageSquare, Clock, CheckCircle, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { atencionCliente } from '@/lib/mockData';

export function AtencionClienteSection() {
  const slaOk = atencionCliente.respuestasMenos5Min >= 85;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Atención al Cliente</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Métricas principales */}
        <Card className="lg:col-span-2">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4">
              {/* Mensajes hoy */}
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="h-12 w-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">{atencionCliente.mensajesHoy}</p>
                <p className="text-sm text-muted-foreground">Mensajes hoy</p>
              </div>

              {/* SLA Promedio */}
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="h-12 w-12 mx-auto rounded-full bg-secondary/10 flex items-center justify-center mb-2">
                  <Clock className="h-6 w-6 text-secondary" />
                </div>
                <p className="text-2xl font-bold text-foreground">{atencionCliente.slaPromedio} min</p>
                <p className="text-sm text-muted-foreground">SLA promedio</p>
              </div>

              {/* % < 5 min */}
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className={`h-12 w-12 mx-auto rounded-full flex items-center justify-center mb-2 ${
                  slaOk ? 'bg-success/10' : 'bg-warning/10'
                }`}>
                  <CheckCircle className={`h-6 w-6 ${slaOk ? 'text-success' : 'text-warning'}`} />
                </div>
                <p className="text-2xl font-bold text-foreground">{atencionCliente.respuestasMenos5Min}%</p>
                <p className="text-sm text-muted-foreground">{"< 5 minutos"}</p>
              </div>
            </div>

            {/* SLA Progress */}
            <div className="mt-4 p-3 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Cumplimiento SLA</span>
                <Badge variant={slaOk ? 'default' : 'secondary'}>
                  {slaOk ? 'En objetivo' : 'Revisar'}
                </Badge>
              </div>
              <Progress 
                value={atencionCliente.respuestasMenos5Min} 
                className="h-3"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Objetivo: 85% de respuestas en menos de 5 minutos
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Categorías más frecuentes */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Tag className="h-4 w-4 text-secondary" />
              Categorías Frecuentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {atencionCliente.categorias.map((cat, idx) => {
              const maxCantidad = Math.max(...atencionCliente.categorias.map(c => c.cantidad));
              const percentage = (cat.cantidad / maxCantidad) * 100;
              
              return (
                <div key={cat.categoria} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground flex items-center gap-2">
                      {idx === 0 && <Badge variant="secondary" className="text-xs py-0">Top</Badge>}
                      {cat.categoria}
                    </span>
                    <span className="text-muted-foreground font-medium">{cat.cantidad}</span>
                  </div>
                  <Progress value={percentage} className="h-1.5" />
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
