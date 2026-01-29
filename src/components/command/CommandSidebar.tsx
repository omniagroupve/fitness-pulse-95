import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Settings2, 
  AlertTriangle,
  Users,
  ShoppingCart,
  MessageSquare,
  Sparkles
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
    label: 'Sistema',
    items: [
      { id: 'alertas' as const, label: 'Alertas', icon: AlertTriangle, badge: 3 },
    ]
  }
];

export function CommandSidebar({ activeView, onViewChange, collapsed = false }: CommandSidebarProps) {
  return (
    <aside className={cn(
      "flex flex-col h-full bg-sidebar border-r border-sidebar-border",
      "transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center glow-primary">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-xs font-medium text-primary uppercase tracking-widest">OMNIA</span>
              <span className="text-[10px] text-muted-foreground">Command Center</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-6">
        {navGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <span className="px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                {group.label}
              </span>
            )}
            <div className="mt-2 space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg",
                      "text-sm font-medium transition-all duration-200",
                      "group relative",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                    )}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-full" />
                    )}
                    
                    <Icon className={cn(
                      "h-4 w-4 transition-colors flex-shrink-0",
                      isActive ? "text-primary" : "group-hover:text-primary/70"
                    )} />
                    
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-destructive text-destructive-foreground">
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
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <img 
            src={omniaLogo} 
            alt="Omnia" 
            className="h-6 w-auto object-contain opacity-50"
          />
          {!collapsed && (
            <span className="text-[10px] text-muted-foreground">
              Powered by AI
            </span>
          )}
        </div>
      </div>
    </aside>
  );
}
