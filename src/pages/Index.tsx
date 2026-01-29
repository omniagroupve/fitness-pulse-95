import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { DashboardNav, type DashboardView } from '@/components/dashboard/DashboardNav';
import { ResumenView } from '@/components/dashboard/views/ResumenView';
import { VentasView } from '@/components/dashboard/views/VentasView';
import { OperacionesView } from '@/components/dashboard/views/OperacionesView';
import { AlertasView } from '@/components/dashboard/views/AlertasView';
import { PoweredByOmnia } from '@/components/dashboard/PoweredByOmnia';
import { estadoGeneral } from '@/lib/mockData';
import fitnessLogo from '@/assets/fitness-factory-logo.png';

const Index = () => {
  const [activeView, setActiveView] = useState<DashboardView>('resumen');

  const renderView = () => {
    switch (activeView) {
      case 'resumen': return <ResumenView />;
      case 'ventas': return <VentasView />;
      case 'operaciones': return <OperacionesView />;
      case 'alertas': return <AlertasView />;
      default: return <ResumenView />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 pb-20">
      <div className="container max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <img 
              src={fitnessLogo} 
              alt="Fitness Factory" 
              className="h-14 w-auto object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard Ejecutivo</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                <Calendar className="h-4 w-4" />
                <span className="capitalize">{estadoGeneral.fecha}</span>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <DashboardNav activeView={activeView} onViewChange={setActiveView} />
        </header>
        
        {/* Dynamic Content */}
        <main key={activeView}>
          {renderView()}
        </main>
      </div>
      
      {/* Powered by Omnia badge */}
      <PoweredByOmnia />
    </div>
  );
};

export default Index;
