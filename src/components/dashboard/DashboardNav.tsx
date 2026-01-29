import { cn } from '@/lib/utils';
import { LayoutDashboard, TrendingUp, Settings2, AlertTriangle } from 'lucide-react';

export type DashboardView = 'resumen' | 'ventas' | 'operaciones' | 'alertas';

interface DashboardNavProps {
  activeView: DashboardView;
  onViewChange: (view: DashboardView) => void;
}

const navItems = [
  { id: 'resumen' as const, label: 'Resumen', icon: LayoutDashboard },
  { id: 'ventas' as const, label: 'Ventas', icon: TrendingUp },
  { id: 'operaciones' as const, label: 'Operaciones', icon: Settings2 },
  { id: 'alertas' as const, label: 'Alertas', icon: AlertTriangle },
];

export function DashboardNav({ activeView, onViewChange }: DashboardNavProps) {
  return (
    <nav className="flex items-center gap-2 p-1.5 rounded-xl bg-muted/50 backdrop-blur-sm border border-border/50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeView === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium",
              "transition-all duration-300",
              isActive
                ? "bg-card text-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-card/50"
            )}
          >
            <Icon className={cn(
              "h-4 w-4 transition-colors",
              isActive ? "text-primary" : ""
            )} />
            <span className="hidden sm:inline">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
