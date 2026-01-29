import { useState } from 'react';
import { Clock, ShoppingCart, Package, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { FuturisticCard } from '../FuturisticCard';
import { CircularProgress } from '../CircularProgress';
import { asistenciaNomina, comprasInventario } from '@/lib/mockData';
import { cn } from '@/lib/utils';

type SubView = 'nomina' | 'compras' | 'inventario';

export function OperacionesView() {
  const [subView, setSubView] = useState<SubView>('nomina');

  const subNavItems = [
    { id: 'nomina' as const, label: 'Nómina', icon: Clock },
    { id: 'compras' as const, label: 'Compras', icon: ShoppingCart },
    { id: 'inventario' as const, label: 'Inventario', icon: Package },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Sub Navigation */}
      <div className="flex gap-2">
        {subNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = subView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setSubView(item.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Nómina View */}
      {subView === 'nomina' && (
        <div className="space-y-6">
          {/* Hours by Sede */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {asistenciaNomina.horasPorSede.map((sede) => (
              <FuturisticCard key={sede.sede} className="p-5">
                <div className="flex flex-col items-center text-center space-y-3">
                  <CircularProgress
                    value={sede.horas}
                    max={120}
                    size="md"
                    color="secondary"
                    sublabel="hrs"
                  />
                  <div>
                    <p className="font-medium text-foreground">{sede.sede}</p>
                    <p className="text-sm text-muted-foreground">{sede.coaches} coaches</p>
                  </div>
                </div>
              </FuturisticCard>
            ))}
          </div>

          {/* Pending Validations */}
          <FuturisticCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Validaciones Pendientes</h3>
              <span className={cn(
                "px-3 py-1 rounded-full text-xs font-medium",
                asistenciaNomina.estadoNomina === 'ok' 
                  ? "bg-success/10 text-success" 
                  : "bg-warning/10 text-warning"
              )}>
                {asistenciaNomina.estadoNomina === 'ok' ? 'Nómina OK' : 'Pendiente'}
              </span>
            </div>
            
            <div className="space-y-3">
              {asistenciaNomina.coachesValidacionPendiente.map((coach, i) => (
                <div 
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                >
                  <div>
                    <p className="font-medium text-foreground">{coach.nombre}</p>
                    <p className="text-sm text-muted-foreground">{coach.sede}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-warning">{coach.horasPendientes}h</p>
                    <p className="text-xs text-muted-foreground">pendientes</p>
                  </div>
                </div>
              ))}
            </div>
          </FuturisticCard>
        </div>
      )}

      {/* Compras View */}
      {subView === 'compras' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            <FuturisticCard className="p-5 text-center">
              <p className="text-3xl font-bold text-warning">{comprasInventario.comprasPendientes}</p>
              <p className="text-sm text-muted-foreground mt-1">Pendientes</p>
            </FuturisticCard>
            <FuturisticCard className="p-5 text-center">
              <p className="text-3xl font-bold text-success">{comprasInventario.comprasAprobadas}</p>
              <p className="text-sm text-muted-foreground mt-1">Aprobadas</p>
            </FuturisticCard>
            <FuturisticCard className="p-5 text-center">
              <p className="text-3xl font-bold text-foreground">${comprasInventario.gastoSemanal.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-1">Gasto Semanal</p>
            </FuturisticCard>
          </div>

          {/* Pending Purchases */}
          <FuturisticCard className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Solicitudes Pendientes</h3>
            <div className="space-y-3">
              {comprasInventario.solicitudesPendientes.map((solicitud) => (
                <div 
                  key={solicitud.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{solicitud.descripcion}</p>
                    <p className="text-sm text-muted-foreground">{solicitud.sede} • {solicitud.fecha}</p>
                  </div>
                  <p className="font-semibold text-foreground">${solicitud.monto}</p>
                </div>
              ))}
            </div>
          </FuturisticCard>
        </div>
      )}

      {/* Inventario View */}
      {subView === 'inventario' && (
        <div className="space-y-6">
          <FuturisticCard className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Alertas de Inventario</h3>
            <div className="space-y-3">
              {comprasInventario.alertasInventario.map((alerta, i) => (
                <div 
                  key={i}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-lg",
                    alerta.nivel === 'crítico' ? "bg-destructive/10" : "bg-warning/10"
                  )}
                >
                  {alerta.nivel === 'crítico' ? (
                    <XCircle className="h-5 w-5 text-destructive" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-warning" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{alerta.producto}</p>
                    <p className="text-sm text-muted-foreground">{alerta.sede}</p>
                  </div>
                  <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium uppercase",
                    alerta.nivel === 'crítico' 
                      ? "bg-destructive/20 text-destructive" 
                      : "bg-warning/20 text-warning"
                  )}>
                    {alerta.nivel}
                  </span>
                </div>
              ))}
              
              {comprasInventario.alertasInventario.length === 0 && (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-success/10">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <p className="text-success">Todos los niveles de inventario están OK</p>
                </div>
              )}
            </div>
          </FuturisticCard>
        </div>
      )}
    </div>
  );
}
