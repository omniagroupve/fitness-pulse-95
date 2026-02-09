import { Calendar, Activity, Sun, Moon, Wifi, Shield } from 'lucide-react';
import { useTheme } from 'next-themes';
import { estadoGeneral } from '@/lib/mockData';
import fitnessLogo from '@/assets/fitness-factory-logo.png';
import { Button } from '@/components/ui/button';

export function CommandHeader() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="relative flex items-center justify-between px-6 py-3 border-b border-border/50 bg-card/20 backdrop-blur-2xl">
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="flex items-center gap-6">
        <img 
          src={fitnessLogo} 
          alt="Fitness Factory" 
          className="h-9 w-auto object-contain"
        />
        <div className="h-6 w-px bg-border/50" />
        <div>
          <h1 className="text-base font-bold text-foreground tracking-tight">
            Command Center
          </h1>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
            <Calendar className="h-3 w-3 text-primary/60" />
            <span className="capitalize">{estadoGeneral.fecha}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="h-8 w-8 rounded-lg border border-border/50 bg-muted/30"
        >
          <Sun className="h-3.5 w-3.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-3.5 w-3.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Network Status */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/30 border border-border/50">
          <Wifi className="h-3 w-3 text-primary/70" />
          <span className="text-[10px] font-medium text-muted-foreground">4 sedes</span>
        </div>

        {/* System Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/5 border border-success/20">
          <div className="relative">
            <Activity className="h-3 w-3 text-success" />
            <div className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
          </div>
          <span className="text-[11px] font-semibold text-success">LIVE</span>
        </div>
      </div>
    </header>
  );
}
