import { MessageSquare, Clock, CheckCircle, Zap } from 'lucide-react';
import { CommandCard, CommandCardHeader, CommandCardContent } from '../CommandCard';
import { MetricCard } from '../MetricCard';
import { atencionCliente } from '@/lib/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = [
  'hsl(185, 100%, 50%)',
  'hsl(24, 95%, 53%)',
  'hsl(142, 71%, 45%)',
  'hsl(38, 92%, 50%)',
  'hsl(270, 70%, 60%)',
];

export function AtencionView() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-6 w-6 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
          <MessageSquare className="h-3.5 w-3.5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground tracking-tight">Atención al Cliente</h2>
          <p className="text-[11px] text-muted-foreground/60">Cómo estamos respondiendo hoy</p>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          label="Mensajes Hoy"
          value={`${atencionCliente.mensajesHoy}`}
          status="neutral"
          icon={<MessageSquare className="h-4 w-4 text-primary" />}
        />
        <MetricCard
          label="Tiempo Promedio"
          value={`${atencionCliente.slaPromedio} min`}
          status={atencionCliente.slaPromedio <= 5 ? 'success' : 'warning'}
          icon={<Clock className="h-4 w-4 text-warning" />}
        />
        <MetricCard
          label="Respuestas Rápidas"
          value={`${atencionCliente.respuestasMenos5Min}%`}
          status={atencionCliente.respuestasMenos5Min >= 85 ? 'success' : 'warning'}
          icon={<CheckCircle className="h-4 w-4 text-success" />}
          change={atencionCliente.respuestasMenos5Min >= 85 ? 4.2 : -2.1}
          changeLabel="vs semana pasada"
        />
      </div>

      {/* Categories Chart */}
      <CommandCard scanline>
        <CommandCardHeader
          title="¿Sobre qué nos escriben?"
          subtitle="Categorías de mensajes de hoy"
          icon={<Zap className="h-4 w-4 text-primary" />}
        />
        <CommandCardContent>
          <div className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={atencionCliente.categorias} layout="vertical" margin={{ left: 20, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 16%)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: 'hsl(215, 20%, 55%)' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="categoria" type="category" tick={{ fontSize: 12, fill: 'hsl(210, 40%, 96%)' }} axisLine={false} tickLine={false} width={90} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(225, 25%, 9%)',
                    border: '1px solid hsl(225, 20%, 16%)',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                  formatter={(value: number) => [`${value} mensajes`, '']}
                />
                <Bar dataKey="cantidad" radius={[0, 6, 6, 0]} barSize={28}>
                  {atencionCliente.categorias.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fillOpacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CommandCardContent>
      </CommandCard>

      {/* Quick Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CommandCard hudCorners>
          <CommandCardContent>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded-lg bg-success/10 flex items-center justify-center border border-success/20">
                <CheckCircle className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Meta del día</p>
                <p className="text-[10px] text-muted-foreground/60">Responder 85%+ en menos de 5 min</p>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-success tabular-nums">{atencionCliente.respuestasMenos5Min}%</span>
              <span className="text-xs text-success font-semibold">✓ Cumpliendo</span>
            </div>
          </CommandCardContent>
        </CommandCard>

        <CommandCard hudCorners>
          <CommandCardContent>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                <MessageSquare className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Tema más frecuente</p>
                <p className="text-[10px] text-muted-foreground/60">Categoría con más mensajes hoy</p>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground tabular-nums">{atencionCliente.categorias[0].categoria}</span>
              <span className="text-xs text-muted-foreground font-semibold">{atencionCliente.categorias[0].cantidad} mensajes</span>
            </div>
          </CommandCardContent>
        </CommandCard>
      </div>
    </div>
  );
}
