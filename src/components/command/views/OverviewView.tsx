import { 
  DollarSign, 
  Users, 
  AlertTriangle,
  TrendingUp,
  Activity,
  ShoppingCart,
  MessageSquare,
  Zap
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
  const ventasTarget = 5500;
  const ventasProgress = (totalVentas / ventasTarget) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Executive Snapshot */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-5 w-5 rounded-md bg-primary/10 flex items-center justify-center border border-primary/20">
            <Zap className="h-3 w-3 text-primary" />
          </div>
          <h2 className="text-xs font-bold text-foreground uppercase tracking-[0.15em]">
            Resumen del Día
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-border/50 to-transparent ml-3" />
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
            label="Tiempo de Respuesta"
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
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Business Pulse */}
          <CommandCard scanline>
            <CommandCardHeader 
              title="Tendencia de Ventas"
              subtitle="Cómo se han movido las ventas en los últimos 7 días"
              icon={<TrendingUp className="h-4 w-4 text-primary" />}
            />
            <CommandCardContent>
              <BusinessPulseChart />
            </CommandCardContent>
          </CommandCard>

          {/* Sedes Grid */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-5 w-5 rounded-md bg-secondary/10 flex items-center justify-center border border-secondary/20">
                <Activity className="h-3 w-3 text-secondary" />
              </div>
              <h2 className="text-xs font-bold text-foreground uppercase tracking-[0.15em]">
                Cómo van las Sedes
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-border/50 to-transparent ml-3" />
            </div>
            <SedeGrid sedes={ventasPorSede} />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Operations Intelligence */}
          <CommandCard hudCorners>
            <CommandCardHeader 
              title="Qué necesita tu atención"
              subtitle="Puntos importantes del día"
              icon={<Activity className="h-4 w-4 text-warning" />}
            />
            <CommandCardContent className="space-y-4">
              {/* Status Rings */}
              <div className="grid grid-cols-3 gap-3">
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
                  sublabel="Trabajadas"
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
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-lg bg-muted/20 border border-border/30 hover:border-warning/30 transition-colors">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Users className="h-3 w-3 text-warning" />
                    <span className="text-[9px] text-muted-foreground/60 uppercase font-bold tracking-wider">Por Revisar</span>
                  </div>
                  <p className="text-lg font-bold text-foreground tabular-nums">
                    {asistenciaNomina.coachesValidacionPendiente.length}
                  </p>
                  <p className="text-[10px] text-muted-foreground/50">Coaches por revisar</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/20 border border-border/30 hover:border-warning/30 transition-colors">
                  <div className="flex items-center gap-1.5 mb-1">
                    <ShoppingCart className="h-3 w-3 text-warning" />
                  <span className="text-[9px] text-muted-foreground/60 uppercase font-bold tracking-wider">Compras</span>

                  </div>
                  <p className="text-lg font-bold text-foreground tabular-nums">
                    {comprasInventario.comprasPendientes}
                  </p>
                  <p className="text-[10px] text-muted-foreground/50">Por aprobar</p>

                </div>
              </div>
            </CommandCardContent>
          </CommandCard>

          {/* Alerts */}
          <CommandCard glow={alertas.criticas.length > 0 ? 'destructive' : 'none'}>
            <CommandCardHeader 
              title="Alertas Activas"
              subtitle={`${allAlerts.length} cosas por revisar`}
              icon={<AlertTriangle className="h-4 w-4 text-destructive" />}
            />
            <CommandCardContent>
              <AlertTimeline alerts={allAlerts} maxItems={4} />
            </CommandCardContent>
          </CommandCard>
        </div>
      </div>

      {/* Ask OMNIA */}
      <section>
        <AskOmnia />
      </section>
    </div>
  );
}
