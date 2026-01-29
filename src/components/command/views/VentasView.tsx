import { TrendingUp, Filter } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CommandCard, CommandCardHeader, CommandCardContent } from '../CommandCard';
import { MetricCard } from '../MetricCard';
import { SedeComparisonChart } from '../BusinessPulseChart';
import { estadoGeneral, ventasPorSede, SEDES } from '@/lib/mockData';

export function VentasView() {
  const [selectedSede, setSelectedSede] = useState<string | 'all'>('all');

  const filteredSedes = selectedSede === 'all' 
    ? ventasPorSede 
    : ventasPorSede.filter(s => s.sede === selectedSede);

  const totalVentas = filteredSedes.reduce((sum, s) => sum + s.ventas, 0);
  const avgVariacion = filteredSedes.reduce((sum, s) => sum + s.variacion, 0) / filteredSedes.length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Ventas</h2>
          <p className="text-sm text-muted-foreground">Análisis detallado de ingresos por sede</p>
        </div>

        {/* Sede Filter */}
        <div className="flex items-center gap-2 p-1 rounded-lg bg-muted/30 border border-border/50">
          <button
            onClick={() => setSelectedSede('all')}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
              selectedSede === 'all'
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Todas
          </button>
          {SEDES.map(sede => (
            <button
              key={sede}
              onClick={() => setSelectedSede(sede)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                selectedSede === sede
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {sede}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          label="Total Ventas Hoy"
          value={`$${totalVentas.toLocaleString()}`}
          change={avgVariacion}
          changeLabel="promedio"
          status={avgVariacion > 0 ? 'success' : 'destructive'}
          size="large"
        />
        <MetricCard
          label="Ventas Ayer"
          value={`$${estadoGeneral.ventasAyer.toLocaleString()}`}
          status="neutral"
        />
        <MetricCard
          label="Mejor Sede Hoy"
          value="Galpón"
          status="success"
        />
      </div>

      {/* Chart */}
      <CommandCard>
        <CommandCardHeader
          title="Tendencia Semanal por Sede"
          subtitle="Comparativo de ventas últimos 7 días"
          icon={<TrendingUp className="h-4 w-4 text-primary" />}
        />
        <CommandCardContent>
          <SedeComparisonChart className="pt-4" />
        </CommandCardContent>
      </CommandCard>

      {/* Sede Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSedes.map((sede, index) => (
          <CommandCard key={sede.sede} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s`, opacity: 0 } as React.CSSProperties}>
            <CommandCardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{sede.sede}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    ${sede.ventas.toLocaleString()}
                  </p>
                  <p className={cn(
                    "text-xs font-medium mt-1",
                    sede.variacion > 0 ? "text-success" : "text-destructive"
                  )}>
                    {sede.variacion > 0 && '+'}{sede.variacion}% vs ayer
                  </p>
                </div>
                <div className={cn(
                  "h-12 w-12 rounded-full flex items-center justify-center",
                  sede.variacion > 0 ? "bg-success/10" : "bg-destructive/10"
                )}>
                  <TrendingUp className={cn(
                    "h-5 w-5",
                    sede.variacion > 0 ? "text-success" : "text-destructive rotate-180"
                  )} />
                </div>
              </div>
            </CommandCardContent>
          </CommandCard>
        ))}
      </div>
    </div>
  );
}
