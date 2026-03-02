import { MessageSquare, Clock, CheckCircle, Zap } from 'lucide-react';
import { CommandCard, CommandCardHeader, CommandCardContent } from '../CommandCard';
import { MetricCard } from '../MetricCard';
import { atencionCliente } from '@/lib/mockData';
import { useData } from '@/contexts/DataContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = [
  'hsl(185, 100%, 50%)',
  'hsl(24, 95%, 53%)',
  'hsl(142, 71%, 45%)',
  'hsl(38, 92%, 50%)',
  'hsl(270, 70%, 60%)',
];

export function AtencionView() {
  const { data } = useData();
  const hasAtencionData = data.operacionesAtencion.length > 0;

  const totalMensajes = hasAtencionData
    ? data.operacionesAtencion.length
    : atencionCliente.mensajesHoy;

  const totalTiempoRespuestas = hasAtencionData
    ? data.operacionesAtencion.reduce((sum, item) => sum + item.Tiempo_Respuesta_Minutos, 0)
    : 0;

  const tiempoPromedio = hasAtencionData
    ? (totalMensajes > 0 ? Math.round(totalTiempoRespuestas / totalMensajes) : 0)
    : atencionCliente.slaPromedio;

  const ticketsMenos5Min = hasAtencionData
    ? data.operacionesAtencion.filter(t => t.Tiempo_Respuesta_Minutos <= 5).length
    : 0;

  const porcentajeRapidas = hasAtencionData
    ? (totalMensajes > 0 ? Math.round((ticketsMenos5Min / totalMensajes) * 100) : 0)
    : atencionCliente.respuestasMenos5Min;

  // Categories fallback since we didn't add the Categories sheet yet to match the mock
  const categoriasData = atencionCliente.categorias;

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
          value={`${totalMensajes}`}
          status="neutral"
          icon={<MessageSquare className="h-4 w-4 text-primary" />}
        />
        <MetricCard
          label="Tiempo Promedio"
          value={`${tiempoPromedio} min`}
          status={tiempoPromedio <= 5 ? 'success' : 'warning'}
          icon={<Clock className="h-4 w-4 text-warning" />}
        />
        <MetricCard
          label="Respuestas Rápidas"
          value={`${porcentajeRapidas}%`}
          status={porcentajeRapidas >= 85 ? 'success' : 'warning'}
          icon={<CheckCircle className="h-4 w-4 text-success" />}
          change={porcentajeRapidas >= 85 ? 4.2 : -2.1}
          changeLabel="vs semana pasada"
        />
      </div>

      {/* Categories Chart */}
      <CommandCard scanline>
        <CommandCardHeader
          title="¿Sobre qué nos escriben? (Demo)"
          subtitle="Categorías de mensajes de hoy"
          icon={<Zap className="h-4 w-4 text-primary" />}
        />
        <CommandCardContent>
          <div className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoriasData} layout="vertical" margin={{ left: 20, right: 20 }}>
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
                  {categoriasData.map((_, index) => (
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
              <span className="text-3xl font-bold text-success tabular-nums">{porcentajeRapidas}%</span>
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
              <span className="text-3xl font-bold text-foreground tabular-nums">{categoriasData[0].categoria}</span>
              <span className="text-xs text-muted-foreground font-semibold">{categoriasData[0].cantidad} mensajes</span>
            </div>
          </CommandCardContent>
        </CommandCard>
      </div>
    </div>
  );
}
