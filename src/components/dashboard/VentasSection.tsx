import { TrendingUp, TrendingDown, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { ventasPorSede, ventasDiarias } from '@/lib/mockData';

export function VentasSection() {
  const topSede = ventasPorSede.reduce((prev, current) => 
    prev.ventas > current.ventas ? prev : current
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Ventas</h2>
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-warning" />
          <span className="text-sm text-muted-foreground">
            Top hoy: <span className="font-semibold text-foreground">{topSede.sede}</span>
          </span>
        </div>
      </div>

      {/* Ventas por sede cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {ventasPorSede.map((sede) => {
          const isPositive = sede.variacion > 0;
          const isTop = sede.sede === topSede.sede;
          
          return (
            <Card 
              key={sede.sede} 
              className={`relative ${isTop ? 'ring-2 ring-warning/50' : ''}`}
            >
              {isTop && (
                <Badge className="absolute -top-2 -right-2 bg-warning text-warning-foreground">
                  #1
                </Badge>
              )}
              <CardContent className="p-4">
                <p className="text-sm font-medium text-muted-foreground truncate">{sede.sede}</p>
                <p className="text-xl font-bold text-foreground mt-1">
                  ${sede.ventas.toLocaleString()}
                </p>
                <div className={`flex items-center gap-1 mt-2 text-sm ${isPositive ? 'text-success' : 'text-destructive'}`}>
                  {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  <span>{isPositive ? '+' : ''}{sede.variacion}%</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Chart de ventas diarias */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Tendencia Semanal por Sede</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ventasDiarias} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis 
                  dataKey="dia" 
                  tick={{ fontSize: 12 }} 
                  className="text-muted-foreground"
                />
                <YAxis 
                  tick={{ fontSize: 12 }} 
                  tickFormatter={(value) => `$${value}`}
                  className="text-muted-foreground"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`$${value}`, '']}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="Galpón" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Casita" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Cabudare" 
                  stroke="hsl(var(--chart-3))" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Caracas Oeste" 
                  stroke="hsl(var(--warning))" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
