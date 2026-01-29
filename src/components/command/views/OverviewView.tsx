import { 
  DollarSign, 
  Clock, 
  Users, 
  AlertTriangle,
  TrendingUp,
  Activity,
  ShoppingCart,
  MessageSquare
} from 'lucide-react';
import { CommandCard, CommandCardHeader, CommandCardContent } from '../CommandCard';
import { MetricCard } from '../MetricCard';
import { StatusRing } from '../StatusRing';
import { SedeGrid } from '../SedeGrid';
import { AlertTimeline } from '../AlertTimeline';
import { BusinessPulseChart } from '../BusinessPulseChart';
import { AskOmnia } from '../AskOmnia';
import { 
  estadoGeneral, 
  ventasPorSede, 
  asistenciaNomina, 
  comprasInventario,
  atencionCliente,
  alertas 
} from '@/lib/mockData';

export function OverviewView() {
  const allAlerts = [
    ...alertas.criticas.map(a => ({ ...a, prioridad: 'alta' as const })),
    ...alertas.advertencias.map(a => ({ ...a, prioridad: 'media' as const })),
    ...alertas.informativas.map(a => ({ ...a, prioridad: 'baja' as const })),
  ];

  const totalVentas = ventasPorSede.reduce((sum, s) => sum + s.ventas, 0);
  const ventasTarget = 5500; // Target diario
  const ventasProgress = (totalVentas / ventasTarget) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Executive Snapshot - Top Row */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
            Executive Snapshot
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Ventas Hoy"
            value={`$${estadoGeneral.ventasHoy.toLocaleString()}`}
            change={estadoGeneral.variacionVentas}
            changeLabel="vs ayer"
            status={estadoGeneral.variacionVentas > 0 ? 'success' : 'destructive'}
            icon={<DollarSign className="h-4 w-4 text-success" />}
          />
          
          <MetricCard
            label="Costo Nómina"
            value={`$${estadoGeneral.costoNomina.toLocaleString()}`}
            status="neutral"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
          
          <MetricCard
            label="SLA Atención"
            value={`${atencionCliente.respuestasMenos5Min}%`}
            status={atencionCliente.respuestasMenos5Min >= 85 ? 'success' : 'warning'}
            icon={<MessageSquare className="h-4 w-4 text-primary" />}
          />
          
          <MetricCard
            label="Alertas Activas"
            value={`${allAlerts.length}`}
            status={alertas.criticas.length > 0 ? 'destructive' : 'warning'}
            icon={<AlertTriangle className="h-4 w-4 text-destructive" />}
          />
        </div>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts & Sedes */}
        <div className="lg:col-span-2 space-y-6">
          {/* Business Pulse */}
          <CommandCard>
            <CommandCardHeader 
              title="Business Pulse"
              subtitle="Tendencia de ventas últimos 7 días"
              icon={<TrendingUp className="h-4 w-4 text-primary" />}
            />
            <CommandCardContent>
              <BusinessPulseChart />
            </CommandCardContent>
          </CommandCard>

          {/* Sedes Grid */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-4 w-4 text-secondary" />
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Performance por Sede
              </h2>
            </div>
            <SedeGrid sedes={ventasPorSede} />
          </div>
        </div>

        {/* Right Column - Status & Alerts */}
        <div className="space-y-6">
          {/* Operations Intelligence */}
          <CommandCard>
            <CommandCardHeader 
              title="Operations Intelligence"
              subtitle="Señales que requieren atención"
              icon={<Activity className="h-4 w-4 text-warning" />}
            />
            <CommandCardContent className="space-y-4">
              {/* Status Rings */}
              <div className="grid grid-cols-3 gap-4">
                <StatusRing 
                  value={ventasProgress} 
                  max={100}
                  size="sm"
                  color={ventasProgress >= 80 ? 'success' : 'warning'}
                  label="Objetivo"
                  sublabel="Ventas"
                />
                <StatusRing 
                  value={asistenciaNomina.horasPorSede.reduce((s, h) => s + h.horas, 0)} 
                  max={400}
                  size="sm"
                  color="primary"
                  label="Horas"
                  sublabel="Operativas"
                />
                <StatusRing 
                  value={atencionCliente.respuestasMenos5Min} 
                  max={100}
                  size="sm"
                  color={atencionCliente.respuestasMenos5Min >= 85 ? 'success' : 'warning'}
                  label="SLA"
                  sublabel="< 5min"
                />
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="h-3 w-3 text-warning" />
                    <span className="text-[10px] text-muted-foreground uppercase">Pendientes</span>
                  </div>
                  <p className="text-lg font-bold text-foreground">
                    {asistenciaNomina.coachesValidacionPendiente.length}
                  </p>
                  <p className="text-[10px] text-muted-foreground">Coaches sin validar</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
                  <div className="flex items-center gap-2 mb-1">
                    <ShoppingCart className="h-3 w-3 text-warning" />
                    <span className="text-[10px] text-muted-foreground uppercase">Compras</span>
                  </div>
                  <p className="text-lg font-bold text-foreground">
                    {comprasInventario.comprasPendientes}
                  </p>
                  <p className="text-[10px] text-muted-foreground">Por aprobar</p>
                </div>
              </div>
            </CommandCardContent>
          </CommandCard>

          {/* Alerts */}
          <CommandCard glow={alertas.criticas.length > 0 ? 'destructive' : 'none'}>
            <CommandCardHeader 
              title="Alertas Activas"
              subtitle={`${allAlerts.length} señales detectadas`}
              icon={<AlertTriangle className="h-4 w-4 text-destructive" />}
            />
            <CommandCardContent>
              <AlertTimeline alerts={allAlerts} maxItems={4} />
            </CommandCardContent>
          </CommandCard>
        </div>
      </div>

      {/* Ask OMNIA - AI Panel */}
      <section>
        <AskOmnia />
      </section>
    </div>
  );
}
