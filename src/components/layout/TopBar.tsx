import { useAuth } from '@/contexts/AuthContext';
import { Sparkles } from 'lucide-react';

export function TopBar() {
  const { user } = useAuth();

  return (
    <header className="h-16 border-b border-border/50 bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold text-foreground tracking-tight">Selfin</h1>
        <div className="status-pill-active">
          <Sparkles className="w-3 h-3" />
          <span>AI Active</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-foreground">{user?.name}</p>
            <p className="text-xs text-muted-foreground">Demo Account</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
            {user?.avatar}
          </div>
        </div>
      </div>
    </header>
  );
}
