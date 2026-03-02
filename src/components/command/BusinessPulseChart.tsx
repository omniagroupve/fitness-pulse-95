import { AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ventasDiarias } from '@/lib/mockData';

interface BusinessPulseChartProps {
  className?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { color: string; value: number }[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload) return null;
  return (
    <div className="rounded-lg border border-border/60 bg-card/95 backdrop-blur-xl px-3 py-2 shadow-xl shadow-black/20">
      <p className="text-xs font-semibold text-foreground mb-1">{label}</p>
      {payload.map((entry: { color: string; value: number }, i: number) => (
        <p key={i} className="text-[11px] text-muted-foreground">
          <span style={{ color: entry.color }} className="font-semibold">${entry.value.toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
};

export function BusinessPulseChart({ className }: BusinessPulseChartProps) {
  const chartData = ventasDiarias.map(day => ({
    name: day.dia,
    total: day.Galpón + day.Casita + day.Cabudare + day['Caracas Oeste'],
  }));

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <defs>
            <linearGradient id="gradientPrimary" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(185, 100%, 50%)" stopOpacity={0.25} />
              <stop offset="100%" stopColor="hsl(185, 100%, 50%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(215, 20%, 45%)', fontSize: 10, fontWeight: 500 }}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="total"
            stroke="hsl(185, 100%, 50%)"
            strokeWidth={2}
            fill="url(#gradientPrimary)"
            dot={false}
            activeDot={{ r: 4, strokeWidth: 2, stroke: 'hsl(185, 100%, 50%)', fill: 'hsl(225, 25%, 9%)' }}
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
            tick={{ fill: 'hsl(215, 20%, 45%)', fontSize: 10, fontWeight: 500 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(215, 20%, 45%)', fontSize: 10 }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="Galpón" stroke="hsl(185, 100%, 50%)" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Casita" stroke="hsl(24, 95%, 53%)" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Cabudare" stroke="hsl(142, 71%, 45%)" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Caracas Oeste" stroke="hsl(270, 70%, 60%)" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center justify-center gap-5 mt-3">
        {[
          { name: 'Galpón', color: 'bg-primary' },
          { name: 'Casita', color: 'bg-secondary' },
          { name: 'Cabudare', color: 'bg-success' },
          { name: 'Caracas O.', color: 'bg-chart-5' }
        ].map(item => (
          <div key={item.name} className="flex items-center gap-1.5">
            <div className={`h-1.5 w-1.5 rounded-full ${item.color}`} />
            <span className="text-[10px] font-medium text-muted-foreground">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
