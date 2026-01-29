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
  XCircle
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
        <div>
          <h2 className="text-xl font-semibold text-foreground">Operaciones</h2>
          <p className="text-sm text-muted-foreground">Gestión de nómina, compras e inventario</p>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/30 border border-border/50">
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
                  "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                  subView === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content based on subview */}
      {subView === 'nomina' && <NominaContent />}
      {subView === 'compras' && <ComprasContent />}
      {subView === 'inventario' && <InventarioContent />}
    </div>
  );
}

function NominaContent() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <CommandCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Horas Semana</p>
              <p className="text-xl font-bold text-foreground">{asistenciaNomina.horasPorSede.reduce((s, h) => s + h.horas, 0)}h</p>
            </div>
          </div>
        </CommandCard>

        <CommandCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Coaches Activos</p>
              <p className="text-xl font-bold text-foreground">{asistenciaNomina.horasPorSede.reduce((s, h) => s + h.coaches, 0)}</p>
            </div>
          </div>
        </CommandCard>

        <CommandCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pendientes</p>
              <p className="text-xl font-bold text-foreground">{asistenciaNomina.coachesValidacionPendiente.length}</p>
            </div>
          </div>
        </CommandCard>

        <CommandCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Costo Semanal</p>
              <p className="text-xl font-bold text-foreground">${asistenciaNomina.costoTotalSemanal.toLocaleString()}</p>
            </div>
          </div>
        </CommandCard>
      </div>

      {/* Hours by Sede */}
      <CommandCard>
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

      {/* Pending Validations */}
      {asistenciaNomina.coachesValidacionPendiente.length > 0 && (
        <CommandCard glow="warning">
          <CommandCardHeader 
            title="Validaciones Pendientes" 
            subtitle="Coaches que requieren validación de horas"
            icon={<AlertTriangle className="h-4 w-4 text-warning" />}
          />
          <CommandCardContent>
            <div className="space-y-3">
              {asistenciaNomina.coachesValidacionPendiente.map((coach, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-warning/5 border border-warning/20">
                  <div>
                    <p className="text-sm font-medium text-foreground">{coach.nombre}</p>
                    <p className="text-xs text-muted-foreground">{coach.sede}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-warning">{coach.horasPendientes}h</p>
                    <p className="text-[10px] text-muted-foreground">pendientes</p>
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
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CommandCard className="p-4" glow="warning">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pendientes</p>
              <p className="text-xl font-bold text-foreground">{comprasInventario.comprasPendientes}</p>
            </div>
          </div>
        </CommandCard>

        <CommandCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Aprobadas</p>
              <p className="text-xl font-bold text-foreground">{comprasInventario.comprasAprobadas}</p>
            </div>
          </div>
        </CommandCard>

        <CommandCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Gasto Semanal</p>
              <p className="text-xl font-bold text-foreground">${comprasInventario.gastoSemanal.toLocaleString()}</p>
            </div>
          </div>
        </CommandCard>
      </div>

      {/* Pending Purchases */}
      <CommandCard>
        <CommandCardHeader 
          title="Solicitudes Pendientes" 
          subtitle="Compras que requieren aprobación"
        />
        <CommandCardContent>
          <div className="space-y-3">
            {comprasInventario.solicitudesPendientes.map((compra) => (
              <div key={compra.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/30 hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{compra.descripcion}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{compra.sede} • {compra.fecha}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">${compra.monto}</p>
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
    <div className="space-y-6">
      {/* Alerts */}
      <CommandCard glow="destructive">
        <CommandCardHeader 
          title="Alertas de Inventario" 
          subtitle="Productos que requieren atención"
          icon={<AlertTriangle className="h-4 w-4 text-destructive" />}
        />
        <CommandCardContent>
          <div className="space-y-3">
            {comprasInventario.alertasInventario.map((alerta, i) => (
              <div 
                key={i} 
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg border",
                  alerta.nivel === 'crítico' 
                    ? "bg-destructive/5 border-destructive/30" 
                    : "bg-warning/5 border-warning/30"
                )}
              >
                <div className="flex items-center gap-3">
                  {alerta.nivel === 'crítico' ? (
                    <XCircle className="h-5 w-5 text-destructive" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-warning" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground">{alerta.producto}</p>
                    <p className="text-xs text-muted-foreground">{alerta.sede}</p>
                  </div>
                </div>
                <span className={cn(
                  "px-2 py-1 text-xs font-medium rounded-full uppercase",
                  alerta.nivel === 'crítico' 
                    ? "bg-destructive/20 text-destructive" 
                    : "bg-warning/20 text-warning"
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
