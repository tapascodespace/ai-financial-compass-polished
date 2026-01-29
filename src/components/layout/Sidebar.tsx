import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  MessageSquare, 
  Wallet, 
  Target, 
  Zap, 
  Activity, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/home', label: 'Home', icon: Home },
  { path: '/agent', label: 'AI Agent', icon: MessageSquare },
  { path: '/accounts', label: 'Accounts', icon: Wallet },
  { path: '/goals', label: 'Goals', icon: Target },
  { path: '/automations', label: 'Automations', icon: Zap },
  { path: '/activity', label: 'Activity Log', icon: Activity },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside 
      className={cn(
        "h-full bg-white border-r border-border/50 flex flex-col transition-all duration-300 ease-out",
        collapsed ? "w-16" : "w-60"
      )}
    >
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <span className="animate-fade-in">{item.label}</span>
              )}
            </NavLink>
          );
        })}
      </nav>
      
      <div className="p-3 border-t border-border/50">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-200"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
