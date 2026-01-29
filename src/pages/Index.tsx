import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { VentasSection } from '@/components/dashboard/VentasSection';
import { AsistenciaNominaSection } from '@/components/dashboard/AsistenciaNominaSection';
import { ComprasInventarioSection } from '@/components/dashboard/ComprasInventarioSection';
import { AtencionClienteSection } from '@/components/dashboard/AtencionClienteSection';
import { AlertasSection } from '@/components/dashboard/AlertasSection';
import { PoweredByOmnia } from '@/components/dashboard/PoweredByOmnia';

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Header con KPIs principales */}
        <DashboardHeader />
        
        {/* Grid principal de 2 columnas en desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Columna izquierda */}
          <div className="space-y-8">
            <VentasSection />
            <ComprasInventarioSection />
          </div>
          
          {/* Columna derecha */}
          <div className="space-y-8">
            <AsistenciaNominaSection />
            <AtencionClienteSection />
          </div>
        </div>
        
        {/* Alertas - full width */}
        <AlertasSection />
      </div>
      
      {/* Powered by Omnia badge */}
      <PoweredByOmnia />
    </div>
  );
};

export default Index;
