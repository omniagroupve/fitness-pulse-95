import { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { FuturisticCard } from '../FuturisticCard';
import { ventasPorSede, ventasDiarias, SEDES } from '@/lib/mockData';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { cn } from '@/lib/utils';

const SEDE_COLORS = {
  'Galpón': 'hsl(var(--primary))',
  'Casita': 'hsl(var(--secondary))',
  'Cabudare': 'hsl(var(--chart-3))',
  'Caracas Oeste': 'hsl(var(--chart-4))',
};

export function VentasView() {
  const [selectedSede, setSelectedSede] = useState<string | null>(null);
  
  const filteredData = selectedSede 
    ? ventasPorSede.filter(s => s.sede === selectedSede)
    : ventasPorSede;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Sede Selector */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedSede(null)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all",
            !selectedSede 
              ? "bg-primary text-primary-foreground" 
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          )}
        >
          Todas
        </button>
        {SEDES.map(sede => (
          <button
            key={sede}
            onClick={() => setSelectedSede(sede)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              selectedSede === sede 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {sede}
          </button>
        ))}
      </div>

      {/* Sales Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredData.map((sede) => {
          const isPositive = sede.variacion > 0;
          return (
            <FuturisticCard key={sede.sede} className="p-5">
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">{sede.sede}</p>
                <p className="text-2xl font-bold text-foreground">
                  ${sede.ventas.toLocaleString()}
                </p>
                <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-success' : 'text-destructive'}`}>
                  {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span>{isPositive ? '+' : ''}{sede.variacion}%</span>
                </div>
              </div>
            </FuturisticCard>
          );
        })}
      </div>

      {/* Main Chart */}
      <FuturisticCard className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Ventas Semanales por Sede</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ventasDiarias}>
              <XAxis 
                dataKey="dia" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              />
              <Legend />
              {(!selectedSede || selectedSede === 'Galpón') && (
                <Line
                  type="monotone"
                  dataKey="Galpón"
                  stroke={SEDE_COLORS['Galpón']}
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              )}
              {(!selectedSede || selectedSede === 'Casita') && (
                <Line
                  type="monotone"
                  dataKey="Casita"
                  stroke={SEDE_COLORS['Casita']}
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              )}
              {(!selectedSede || selectedSede === 'Cabudare') && (
                <Line
                  type="monotone"
                  dataKey="Cabudare"
                  stroke={SEDE_COLORS['Cabudare']}
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              )}
              {(!selectedSede || selectedSede === 'Caracas Oeste') && (
                <Line
                  type="monotone"
                  dataKey="Caracas Oeste"
                  stroke={SEDE_COLORS['Caracas Oeste']}
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </FuturisticCard>
    </div>
  );
}
