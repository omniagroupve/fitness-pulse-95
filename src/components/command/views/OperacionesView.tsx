import { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Settings2, 
  Users, 
  ShoppingCart, 
  Package,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Zap
} from 'lucide-react';
import { CommandCard, CommandCardHeader, CommandCardContent } from '../CommandCard';
import { StatusRing } from '../StatusRing';
import { asistenciaNomina, comprasInventario } from '@/lib/mockData';

type SubView = 'nomina' | 'compras' | 'inventario';

export function OperacionesView() {
  const [subView, setSubView] = useState<SubView>('nomina');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-lg bg-secondary/10 flex items-center justify-center border border-secondary/20">
            <Settings2 className="h-3.5 w-3.5 text-secondary" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground tracking-tight">Operaciones</h2>
            <p className="text-[11px] text-muted-foreground/60">Gestión de nómina, compras e inventario</p>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center gap-0.5 p-1 rounded-lg bg-muted/20 border border-border/40">
          {[
            { id: 'nomina' as const, label: 'Nómina', icon: Users },
            { id: 'compras' as const, label: 'Compras', icon: ShoppingCart },
            { id: 'inventario' as const, label: 'Inventario', icon: Package },
          ].map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setSubView(item.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold rounded-md transition-all duration-200",
                  subView === item.id
                    ? "bg-primary/90 text-primary-foreground shadow-[0_0_10px_hsl(185,100%,50%,0.2)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                )}
              >
                <Icon className="h-3 w-3" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {subView === 'nomina' && <NominaContent />}
      {subView === 'compras' && <ComprasContent />}
      {subView === 'inventario' && <InventarioContent />}
    </div>
  );
}

function NominaContent() {
  const stats = [
    { label: 'Horas Semana', value: `${asistenciaNomina.horasPorSede.reduce((s, h) => s + h.horas, 0)}h`, icon: Clock, color: 'text-primary', bg: 'bg-primary/10 border-primary/20' },
    { label: 'Coaches Activos', value: asistenciaNomina.horasPorSede.reduce((s, h) => s + h.coaches, 0), icon: Users, color: 'text-secondary', bg: 'bg-secondary/10 border-secondary/20' },
    { label: 'Pendientes', value: asistenciaNomina.coachesValidacionPendiente.length, icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10 border-warning/20' },
    { label: 'Costo Semanal', value: `$${asistenciaNomina.costoTotalSemanal.toLocaleString()}`, icon: CheckCircle, color: 'text-success', bg: 'bg-success/10 border-success/20' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <CommandCard key={stat.label} className="p-4 animate-scale-in" style={{ animationDelay: `${i * 0.05}s`, opacity: 0 } as React.CSSProperties}>
              <div className="flex items-center gap-3">
                <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center border", stat.bg)}>
                  <Icon className={cn("h-4.5 w-4.5", stat.color)} />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground/60 uppercase font-bold tracking-wider">{stat.label}</p>
                  <p className="text-xl font-bold text-foreground tabular-nums">{stat.value}</p>
                </div>
              </div>
            </CommandCard>
          );
        })}
      </div>

      <CommandCard scanline>
        <CommandCardHeader 
          title="Horas por Sede" 
          subtitle="Distribución semanal de horas operativas"
        />
        <CommandCardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {asistenciaNomina.horasPorSede.map(sede => (
              <StatusRing
                key={sede.sede}
                value={sede.horas}
                max={120}
                size="md"
                color="primary"
                label={sede.sede}
                sublabel={`${sede.coaches} coaches`}
              />
            ))}
          </div>
        </CommandCardContent>
      </CommandCard>

      {asistenciaNomina.coachesValidacionPendiente.length > 0 && (
        <CommandCard glow="warning" hudCorners>
          <CommandCardHeader 
            title="Validaciones Pendientes" 
            subtitle="Coaches que requieren validación de horas"
            icon={<AlertTriangle className="h-4 w-4 text-warning" />}
          />
          <CommandCardContent>
            <div className="space-y-2">
              {asistenciaNomina.coachesValidacionPendiente.map((coach, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-warning/5 border border-warning/20 hover:border-warning/40 transition-colors">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{coach.nombre}</p>
                    <p className="text-[10px] text-muted-foreground/60">{coach.sede}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-warning tabular-nums">{coach.horasPendientes}h</p>
                    <p className="text-[9px] text-muted-foreground/40 uppercase tracking-wider font-bold">pendientes</p>
                  </div>
                </div>
              ))}
            </div>
          </CommandCardContent>
        </CommandCard>
      )}
    </div>
  );
}

function ComprasContent() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CommandCard className="p-4" glow="warning">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-warning/10 flex items-center justify-center border border-warning/20">
              <Clock className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground/60 uppercase font-bold tracking-wider">Pendientes</p>
              <p className="text-xl font-bold text-foreground tabular-nums">{comprasInventario.comprasPendientes}</p>
            </div>
          </div>
        </CommandCard>

        <CommandCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-success/10 flex items-center justify-center border border-success/20">
              <CheckCircle className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground/60 uppercase font-bold tracking-wider">Aprobadas</p>
              <p className="text-xl font-bold text-foreground tabular-nums">{comprasInventario.comprasAprobadas}</p>
            </div>
          </div>
        </CommandCard>

        <CommandCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/20">
              <ShoppingCart className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground/60 uppercase font-bold tracking-wider">Gasto Semanal</p>
              <p className="text-xl font-bold text-foreground tabular-nums">${comprasInventario.gastoSemanal.toLocaleString()}</p>
            </div>
          </div>
        </CommandCard>
      </div>

      <CommandCard scanline>
        <CommandCardHeader 
          title="Solicitudes Pendientes" 
          subtitle="Compras que requieren aprobación"
        />
        <CommandCardContent>
          <div className="space-y-2">
            {comprasInventario.solicitudesPendientes.map((compra) => (
              <div key={compra.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/10 border border-border/30 hover:border-primary/20 hover:bg-muted/20 transition-all duration-200">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{compra.descripcion}</p>
                  <p className="text-[10px] text-muted-foreground/50 mt-0.5">{compra.sede} • {compra.fecha}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground tabular-nums">${compra.monto}</p>
                </div>
              </div>
            ))}
          </div>
        </CommandCardContent>
      </CommandCard>
    </div>
  );
}

function InventarioContent() {
  return (
    <div className="space-y-6 animate-fade-in">
      <CommandCard glow="destructive" hudCorners>
        <CommandCardHeader 
          title="Alertas de Inventario" 
          subtitle="Productos que requieren atención"
          icon={<AlertTriangle className="h-4 w-4 text-destructive" />}
        />
        <CommandCardContent>
          <div className="space-y-2">
            {comprasInventario.alertasInventario.map((alerta, i) => (
              <div 
                key={i} 
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg border transition-colors",
                  alerta.nivel === 'crítico' 
                    ? "bg-destructive/5 border-destructive/20 hover:border-destructive/40" 
                    : "bg-warning/5 border-warning/20 hover:border-warning/40"
                )}
              >
                <div className="flex items-center gap-3">
                  {alerta.nivel === 'crítico' ? (
                    <XCircle className="h-5 w-5 text-destructive" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-warning" />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-foreground">{alerta.producto}</p>
                    <p className="text-[10px] text-muted-foreground/50">{alerta.sede}</p>
                  </div>
                </div>
                <span className={cn(
                  "px-2.5 py-1 text-[9px] font-bold rounded-lg uppercase tracking-wider",
                  alerta.nivel === 'crítico' 
                    ? "bg-destructive/10 text-destructive border border-destructive/20" 
                    : "bg-warning/10 text-warning border border-warning/20"
                )}>
                  {alerta.nivel}
                </span>
              </div>
            ))}
          </div>
        </CommandCardContent>
      </CommandCard>
    </div>
  );
}
