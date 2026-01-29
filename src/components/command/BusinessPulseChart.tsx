import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ventasDiarias } from '@/lib/mockData';

interface BusinessPulseChartProps {
  className?: string;
}

export function BusinessPulseChart({ className }: BusinessPulseChartProps) {
  // Calculate totals per day
  const chartData = ventasDiarias.map(day => ({
    name: day.dia,
    total: day.Galpón + day.Casita + day.Cabudare + day['Caracas Oeste'],
    galpon: day.Galpón,
    casita: day.Casita,
    cabudare: day.Cabudare,
    caracas: day['Caracas Oeste']
  }));

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <defs>
            <linearGradient id="gradientPrimary" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(185, 100%, 50%)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(185, 100%, 50%)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="gradientSecondary" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(24, 95%, 53%)" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="hsl(24, 95%, 53%)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 11 }}
          />
          <YAxis hide />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(225, 25%, 9%)',
              border: '1px solid hsl(225, 20%, 16%)',
              borderRadius: '8px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
            }}
            labelStyle={{ color: 'hsl(210, 40%, 96%)', fontWeight: 600 }}
            itemStyle={{ color: 'hsl(215, 20%, 55%)' }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="hsl(185, 100%, 50%)"
            strokeWidth={2}
            fill="url(#gradientPrimary)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SedeComparisonChart({ className }: { className?: string }) {
  const chartData = ventasDiarias.map(day => ({
    name: day.dia,
    Galpón: day.Galpón,
    Casita: day.Casita,
    Cabudare: day.Cabudare,
    'Caracas Oeste': day['Caracas Oeste']
  }));

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 11 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 11 }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(225, 25%, 9%)',
              border: '1px solid hsl(225, 20%, 16%)',
              borderRadius: '8px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
            }}
            labelStyle={{ color: 'hsl(210, 40%, 96%)', fontWeight: 600 }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
          />
          <Line type="monotone" dataKey="Galpón" stroke="hsl(185, 100%, 50%)" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Casita" stroke="hsl(24, 95%, 53%)" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Cabudare" stroke="hsl(142, 71%, 45%)" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Caracas Oeste" stroke="hsl(270, 70%, 60%)" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        {[
          { name: 'Galpón', color: 'bg-primary' },
          { name: 'Casita', color: 'bg-secondary' },
          { name: 'Cabudare', color: 'bg-success' },
          { name: 'Caracas O.', color: 'bg-chart-5' }
        ].map(item => (
          <div key={item.name} className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${item.color}`} />
            <span className="text-xs text-muted-foreground">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
