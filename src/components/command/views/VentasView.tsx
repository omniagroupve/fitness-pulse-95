import { TrendingUp, Zap } from 'lucide-react';
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
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground tracking-tight">Ventas</h2>
            <p className="text-[11px] text-muted-foreground/60">Cómo van las ventas en cada sede</p>
          </div>
        </div>

        {/* Sede Filter */}
        <div className="flex items-center gap-0.5 p-1 rounded-lg bg-muted/20 border border-border/40">
          <button
            onClick={() => setSelectedSede('all')}
            className={cn(
              "px-3 py-1.5 text-[11px] font-semibold rounded-md transition-all duration-200",
              selectedSede === 'all'
                ? "bg-primary/90 text-primary-foreground shadow-[0_0_10px_hsl(185,100%,50%,0.2)]"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
            )}
          >
            Todas
          </button>
          {SEDES.map(sede => (
            <button
              key={sede}
              onClick={() => setSelectedSede(sede)}
              className={cn(
                "px-3 py-1.5 text-[11px] font-semibold rounded-md transition-all duration-200",
                selectedSede === sede
                  ? "bg-primary/90 text-primary-foreground shadow-[0_0_10px_hsl(185,100%,50%,0.2)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
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
          icon={<Zap className="h-4 w-4 text-success" />}
        />
      </div>

      {/* Chart */}
      <CommandCard scanline>
        <CommandCardHeader
          title="Ventas de la Semana"
          subtitle="Comparando las 4 sedes en los últimos 7 días"
          icon={<TrendingUp className="h-4 w-4 text-primary" />}
        />
        <CommandCardContent>
          <SedeComparisonChart className="pt-4" />
        </CommandCardContent>
      </CommandCard>

      {/* Sede Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSedes.map((sede, index) => (
          <CommandCard 
            key={sede.sede} 
            className="animate-scale-in" 
            hudCorners
            style={{ animationDelay: `${index * 0.1}s`, opacity: 0 } as React.CSSProperties}
          >
            <CommandCardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-foreground">{sede.sede}</p>
                  <p className="text-2xl font-bold text-foreground mt-1 tabular-nums">
                    ${sede.ventas.toLocaleString()}
                  </p>
                  <p className={cn(
                    "text-xs font-semibold mt-1",
                    sede.variacion > 0 ? "text-success" : "text-destructive"
                  )}>
                    {sede.variacion > 0 && '+'}{sede.variacion}% vs ayer
                  </p>
                </div>
                <div className={cn(
                  "h-12 w-12 rounded-xl flex items-center justify-center border",
                  sede.variacion > 0 
                    ? "bg-success/5 border-success/20" 
                    : "bg-destructive/5 border-destructive/20"
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
