import { ShoppingCart, CheckCircle, Clock, AlertTriangle, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { comprasInventario } from '@/lib/mockData';

export function ComprasInventarioSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Compras & Inventario</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Métricas principales */}
        <div className="grid grid-cols-3 gap-3 lg:col-span-1 lg:grid-cols-1">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{comprasInventario.comprasPendientes}</p>
                <p className="text-sm text-muted-foreground">Pendientes</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{comprasInventario.comprasAprobadas}</p>
                <p className="text-sm text-muted-foreground">Aprobadas</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">${comprasInventario.gastoSemanal}</p>
                <p className="text-sm text-muted-foreground">Gasto semana</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Solicitudes pendientes */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              Solicitudes Pendientes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {comprasInventario.solicitudesPendientes.map((solicitud) => (
              <div 
                key={solicitud.id}
                className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">
                      {solicitud.descripcion}
                    </p>
                    <p className="text-xs text-muted-foreground">{solicitud.sede}</p>
                  </div>
                  <Badge variant="outline" className="shrink-0">
                    ${solicitud.monto}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Alertas de inventario */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Package className="h-4 w-4 text-destructive" />
              Alertas Inventario
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {comprasInventario.alertasInventario.length > 0 ? (
              comprasInventario.alertasInventario.map((alerta, idx) => (
                <div 
                  key={idx}
                  className={`p-3 rounded-lg flex items-center gap-3 ${
                    alerta.nivel === 'crítico' 
                      ? 'bg-destructive/10 border border-destructive/30' 
                      : 'bg-warning/10 border border-warning/30'
                  }`}
                >
                  <AlertTriangle className={`h-4 w-4 shrink-0 ${
                    alerta.nivel === 'crítico' ? 'text-destructive' : 'text-warning'
                  }`} />
                  <div className="min-w-0">
                    <p className="font-medium text-foreground text-sm">{alerta.producto}</p>
                    <p className="text-xs text-muted-foreground">{alerta.sede}</p>
                  </div>
                  <Badge 
                    variant={alerta.nivel === 'crítico' ? 'destructive' : 'secondary'}
                    className="ml-auto shrink-0"
                  >
                    {alerta.nivel}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-success" />
                <p className="text-sm">Sin alertas de inventario</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
