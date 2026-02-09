import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Settings2, 
  AlertTriangle,
  Users,
  ShoppingCart,
  MessageSquare,
  Sparkles,
  Zap
} from 'lucide-react';
import omniaLogo from '@/assets/omnia-logo.png';

export type CommandView = 'overview' | 'ventas' | 'operaciones' | 'nomina' | 'compras' | 'atencion' | 'alertas';

interface CommandSidebarProps {
  activeView: CommandView;
  onViewChange: (view: CommandView) => void;
  collapsed?: boolean;
}

const navGroups = [
  {
    label: 'Principal',
    items: [
      { id: 'overview' as const, label: 'Overview', icon: LayoutDashboard },
    ]
  },
  {
    label: 'Negocio',
    items: [
      { id: 'ventas' as const, label: 'Ventas', icon: TrendingUp },
      { id: 'operaciones' as const, label: 'Operaciones', icon: Settings2 },
    ]
  },
  {
    label: 'Gestión',
    items: [
      { id: 'nomina' as const, label: 'Nómina', icon: Users },
      { id: 'compras' as const, label: 'Compras', icon: ShoppingCart },
      { id: 'atencion' as const, label: 'Atención', icon: MessageSquare },
    ]
  },
  {
    label: 'Notificaciones',
    items: [
      { id: 'alertas' as const, label: 'Alertas', icon: AlertTriangle, badge: 3 },
    ]
  }
];

export function CommandSidebar({ activeView, onViewChange, collapsed = false }: CommandSidebarProps) {
  return (
    <aside className={cn(
      "flex flex-col h-full bg-sidebar/80 backdrop-blur-2xl border-r border-sidebar-border/50",
      "transition-all duration-300 relative",
      collapsed ? "w-16" : "w-60"
    )}>
      {/* Right edge glow */}
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-primary/20 via-primary/5 to-transparent" />

      {/* Header */}
      <div className="p-4 border-b border-sidebar-border/50">
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/30 glow-primary">
            <Zap className="h-4 w-4 text-primary" />
            <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary animate-pulse" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">OMNIA</span>
              <span className="text-[10px] text-muted-foreground/60 font-medium">Centro de Control</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-5">
        {navGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <span className="px-3 text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
                {group.label}
              </span>
            )}
            <div className="mt-2 space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg",
                      "text-sm font-medium transition-all duration-200",
                      "group relative overflow-hidden",
                      isActive
                        ? "bg-primary/10 text-foreground border border-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/30 border border-transparent"
                    )}
                  >
                    {/* Active shimmer */}
                    {isActive && (
                      <div className="absolute inset-0 animate-shimmer pointer-events-none" />
                    )}
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-primary rounded-full shadow-[0_0_8px_hsl(185,100%,50%,0.6)]" />
                    )}
                    
                    <Icon className={cn(
                      "h-4 w-4 transition-colors flex-shrink-0 relative z-10",
                      isActive ? "text-primary" : "group-hover:text-primary/70"
                    )} />
                    
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left relative z-10 text-[13px]">{item.label}</span>
                        {item.badge && (
                          <span className="relative z-10 px-1.5 py-0.5 text-[9px] font-bold rounded bg-destructive/90 text-destructive-foreground shadow-[0_0_8px_hsl(0,72%,51%,0.4)]">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border/50">
        <div className="flex items-center gap-3">
          <img 
            src={omniaLogo} 
            alt="Omnia" 
            className="h-5 w-auto object-contain opacity-40"
          />
          {!collapsed && (
            <span className="text-[9px] text-muted-foreground/40 uppercase tracking-widest font-medium">
              Powered by AI
            </span>
          )}
        </div>
      </div>
    </aside>
  );
}
