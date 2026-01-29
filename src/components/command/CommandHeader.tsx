import { Calendar, Activity } from 'lucide-react';
import { estadoGeneral } from '@/lib/mockData';
import fitnessLogo from '@/assets/fitness-factory-logo.png';

export function CommandHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/30 backdrop-blur-xl">
      <div className="flex items-center gap-6">
        <img 
          src={fitnessLogo} 
          alt="Fitness Factory" 
          className="h-10 w-auto object-contain"
        />
        <div className="h-8 w-px bg-border" />
        <div>
          <h1 className="text-lg font-semibold text-foreground tracking-tight">
            Command Center
          </h1>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
            <Calendar className="h-3 w-3" />
            <span className="capitalize">{estadoGeneral.fecha}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* System Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
          <Activity className="h-3 w-3 text-success animate-pulse" />
          <span className="text-xs font-medium text-success">Sistema Operativo</span>
        </div>
      </div>
    </header>
  );
}
