import { Users, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { asistenciaNomina } from '@/lib/mockData';

export function AsistenciaNominaSection() {
  const totalHoras = asistenciaNomina.horasPorSede.reduce((acc, sede) => acc + sede.horas, 0);
  const totalCoaches = asistenciaNomina.horasPorSede.reduce((acc, sede) => acc + sede.coaches, 0);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Asistencia & Nómina</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Resumen general */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-secondary" />
              Horas por Sede (Semana)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {asistenciaNomina.horasPorSede.map((sede) => {
              const percentage = (sede.horas / totalHoras) * 100;
              return (
                <div key={sede.sede} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{sede.sede}</span>
                    <span className="text-muted-foreground">
                      {sede.horas}h • {sede.coaches} coaches
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
            <div className="pt-2 border-t border-border flex items-center justify-between">
              <span className="font-medium text-foreground">Total</span>
              <span className="font-bold text-foreground">{totalHoras}h • {totalCoaches} coaches</span>
            </div>
          </CardContent>
        </Card>

        {/* Estado y alertas */}
        <div className="space-y-4">
          {/* Estado de nómina */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {asistenciaNomina.estadoNomina === 'ok' ? (
                    <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-success" />
                    </div>
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center">
                      <AlertCircle className="h-5 w-5 text-warning" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-foreground">Estado Nómina</p>
                    <p className="text-sm text-muted-foreground">Costo semanal</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={asistenciaNomina.estadoNomina === 'ok' ? 'default' : 'secondary'}>
                    {asistenciaNomina.estadoNomina === 'ok' ? 'Procesada' : 'Pendiente'}
                  </Badge>
                  <p className="text-lg font-bold text-foreground mt-1">
                    ${asistenciaNomina.costoTotalSemanal.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coaches con validación pendiente */}
          {asistenciaNomina.coachesValidacionPendiente.length > 0 && (
            <Card className="border-warning/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <Users className="h-4 w-4 text-warning" />
                  Validación Pendiente
                  <Badge variant="secondary" className="ml-auto">
                    {asistenciaNomina.coachesValidacionPendiente.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {asistenciaNomina.coachesValidacionPendiente.map((coach, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center justify-between p-2 rounded-lg bg-warning/5"
                  >
                    <div>
                      <p className="font-medium text-foreground">{coach.nombre}</p>
                      <p className="text-sm text-muted-foreground">{coach.sede}</p>
                    </div>
                    <Badge variant="outline" className="text-warning border-warning">
                      {coach.horasPendientes}h pendientes
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
