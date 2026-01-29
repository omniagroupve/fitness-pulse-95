import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { FuturisticCard } from '../FuturisticCard';
import { CircularProgress } from '../CircularProgress';
import { estadoGeneral, ventasDiarias, alertas, atencionCliente } from '@/lib/mockData';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

export function ResumenView() {
  const isPositive = estadoGeneral.variacionVentas > 0;
  const totalAlertas = alertas.criticas.length + alertas.advertencias.length;
  
  // Calculate total sales for sparkline
  const ventasSparkline = ventasDiarias.map(d => ({
    name: d.dia,
    total: d.Galpón + d.Casita + d.Cabudare + d['Caracas Oeste'],
  }));

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Main KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Ventas */}
        <FuturisticCard className="p-6" gradient>
          <div className="flex flex-col items-center text-center space-y-4">
            <CircularProgress
              value={estadoGeneral.variacionVentas + 100}
              max={200}
              size="lg"
              color="primary"
              showValue={false}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-[-20px]">
              <p className="text-3xl font-bold text-foreground">
                ${estadoGeneral.ventasHoy.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">Ventas Hoy</p>
              <div className={`flex items-center justify-center gap-1 text-sm ${isPositive ? 'text-success' : 'text-destructive'}`}>
                {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span>{isPositive ? '+' : ''}{estadoGeneral.variacionVentas}% vs ayer</span>
              </div>
            </div>
          </div>
        </FuturisticCard>

        {/* Nómina */}
        <FuturisticCard className="p-6" gradient>
          <div className="flex flex-col items-center text-center space-y-4">
            <CircularProgress
              value={estadoGeneral.horasTrabajadas}
              max={400}
              size="lg"
              color="secondary"
              showValue={false}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-[-20px]">
              <p className="text-3xl font-bold text-foreground">
                ${estadoGeneral.costoNomina.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">Nómina</p>
              <p className="text-sm text-muted-foreground">{estadoGeneral.horasTrabajadas}h esta semana</p>
            </div>
          </div>
        </FuturisticCard>

        {/* SLA */}
        <FuturisticCard className="p-6" gradient>
          <div className="flex flex-col items-center text-center space-y-4">
            <CircularProgress
              value={atencionCliente.respuestasMenos5Min}
              max={100}
              size="lg"
              color="success"
              sublabel="%"
            />
            <div>
              <p className="text-lg font-semibold text-foreground">SLA</p>
              <p className="text-sm text-muted-foreground">{atencionCliente.slaPromedio} min promedio</p>
            </div>
          </div>
        </FuturisticCard>

        {/* Alertas */}
        <FuturisticCard className="p-6" gradient>
          <div className="flex flex-col items-center text-center space-y-4">
            <CircularProgress
              value={totalAlertas}
              max={10}
              size="lg"
              color={totalAlertas > 3 ? 'destructive' : 'warning'}
            />
            <div>
              <p className="text-lg font-semibold text-foreground">Alertas</p>
              <p className="text-sm text-muted-foreground">{alertas.criticas.length} críticas activas</p>
            </div>
          </div>
        </FuturisticCard>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sparkline */}
        <FuturisticCard className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Tendencia Semanal</h3>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ventasSparkline}>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Ventas']}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </FuturisticCard>

        {/* Quick Alerts */}
        <FuturisticCard className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Alertas Recientes</h3>
          <div className="space-y-3">
            {[...alertas.criticas, ...alertas.advertencias].slice(0, 3).map((alerta, i) => (
              <div 
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
              >
                <AlertTriangle className={`h-5 w-5 flex-shrink-0 ${
                  alerta.prioridad === 'alta' ? 'text-destructive' : 'text-warning'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {alerta.mensaje}
                  </p>
                  <p className="text-xs text-muted-foreground">{alerta.sede}</p>
                </div>
              </div>
            ))}
          </div>
        </FuturisticCard>
      </div>
    </div>
  );
}
