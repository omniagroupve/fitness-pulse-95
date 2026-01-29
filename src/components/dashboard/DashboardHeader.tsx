import { TrendingUp, TrendingDown, Clock, DollarSign, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { estadoGeneral } from '@/lib/mockData';
import fitnessLogo from '@/assets/fitness-factory-logo.png';

export function DashboardHeader() {
  const isPositive = estadoGeneral.variacionVentas > 0;

  return (
    <div className="space-y-6">
      {/* Top bar with logo and date */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Ejecutivo</h1>
          <div className="flex items-center gap-2 text-muted-foreground mt-1">
            <Calendar className="h-4 w-4" />
            <span className="capitalize">{estadoGeneral.fecha}</span>
          </div>
        </div>
        <img 
          src={fitnessLogo} 
          alt="Fitness Factory" 
          className="h-16 w-auto object-contain"
        />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Ventas del día */}
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ventas Hoy</p>
                <p className="text-2xl font-bold text-foreground">
                  ${estadoGeneral.ventasHoy.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className={`flex items-center gap-1 mt-2 text-sm ${isPositive ? 'text-success' : 'text-destructive'}`}>
              {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span>{isPositive ? '+' : ''}{estadoGeneral.variacionVentas}% vs ayer</span>
            </div>
          </CardContent>
        </Card>

        {/* Ventas ayer */}
        <Card className="border-l-4 border-l-secondary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ventas Ayer</p>
                <p className="text-2xl font-bold text-foreground">
                  ${estadoGeneral.ventasAyer.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-secondary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Referencia comparativa</p>
          </CardContent>
        </Card>

        {/* Horas trabajadas */}
        <Card className="border-l-4 border-l-chart-3">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Horas Semana</p>
                <p className="text-2xl font-bold text-foreground">
                  {estadoGeneral.horasTrabajadas}h
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <Clock className="h-6 w-6 text-chart-3" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Total todas las sedes</p>
          </CardContent>
        </Card>

        {/* Costo nómina */}
        <Card className="border-l-4 border-l-warning">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Costo Nómina</p>
                <p className="text-2xl font-bold text-foreground">
                  ${estadoGeneral.costoNomina.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-warning" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Estimado semanal</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
