import { Calendar, Activity, Sun, Moon, Wifi, Upload, Loader2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import fitnessLogo from '@/assets/fitness-factory-logo.png';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import { useRef } from 'react';

export function CommandHeader() {
  const { theme, setTheme } = useTheme();
  const { handleFileUpload, isLoading, lastUpdated } = useData();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileUpload(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const formattedDate = lastUpdated
    ? lastUpdated.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

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
            Centro de Control
          </h1>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
            <Calendar className="h-3 w-3 text-primary/60" />
            <span className="capitalize">{formattedDate}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Drop to Sync Input */}
        <div>
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            ref={fileInputRef}
            onChange={onFileChange}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="h-8 gap-2 border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary uppercase tracking-wider text-[10px] font-bold"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
            Sincronizar Excel
          </Button>
        </div>

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

        {/* System Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/5 border border-success/20">
          <div className="relative">
            <Activity className="h-3 w-3 text-success" />
            <div className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
          </div>
          <span className="text-[11px] font-semibold text-success">
            {isLoading ? 'SYNCING...' : 'LIVE'}
          </span>
        </div>
      </div>
    </header>
  );
}
