import { useState } from 'react';
import { CommandSidebar, type CommandView } from '@/components/command/CommandSidebar';
import { CommandHeader } from '@/components/command/CommandHeader';
import { OverviewView } from '@/components/command/views/OverviewView';
import { VentasView } from '@/components/command/views/VentasView';
import { OperacionesView } from '@/components/command/views/OperacionesView';
import { AlertasView } from '@/components/command/views/AlertasView';
import { AtencionView } from '@/components/command/views/AtencionView';

const Index = () => {
  const [activeView, setActiveView] = useState<CommandView>('overview');

  const renderView = () => {
    switch (activeView) {
      case 'overview': return <OverviewView />;
      case 'ventas': return <VentasView />;
      case 'operaciones': return <OperacionesView />;
      case 'nomina': return <OperacionesView initialTab="nomina" />;
      case 'compras': return <OperacionesView initialTab="compras" />;
      case 'atencion': return <AtencionView />;
      case 'alertas': return <AlertasView />;
      default: return <OverviewView />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex noise-overlay">
      <div className="fixed inset-0 pattern-dots pointer-events-none opacity-50" />
      <div className="fixed inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-secondary/[0.02] pointer-events-none" />
      
      <CommandSidebar 
        activeView={activeView} 
        onViewChange={setActiveView} 
      />
      
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden relative">
        <CommandHeader />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto" key={activeView}>
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
