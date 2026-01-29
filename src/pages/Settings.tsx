import { AppLayout } from '@/components/layout/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { 
  User, 
  Shield, 
  Eye, 
  Database,
  RotateCcw,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleReset = () => {
    toast({
      title: "Demo Reset",
      description: "All data has been reset to default values.",
    });
  };

  const autonomyLevels = [
    { value: 'observe', label: 'Observe', description: 'AI watches and learns, never acts' },
    { value: 'recommend', label: 'Recommend', description: 'AI suggests actions for your approval' },
    { value: 'act', label: 'Act', description: 'AI executes within guardrails' },
  ];

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-headline">Settings</h1>
          <p className="text-muted-foreground">Customize your AI agent's behavior</p>
        </div>

        {/* Profile */}
        <div className="surface-card p-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-semibold">
              {user?.avatar}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground">{user?.name}</h3>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <Button variant="outline" size="sm">
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Autonomy Level */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-title">Autonomy Level</h2>
          </div>
          
          <div className="grid gap-3">
            {autonomyLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => updateProfile({ autonomyLevel: level.value as any })}
                className={cn(
                  "surface-card p-4 text-left transition-all hover:shadow-medium",
                  user?.autonomyLevel === level.value && "border-primary bg-primary/5"
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{level.label}</p>
                    <p className="text-sm text-muted-foreground">{level.description}</p>
                  </div>
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 transition-all",
                    user?.autonomyLevel === level.value 
                      ? "border-primary bg-primary" 
                      : "border-border"
                  )}>
                    {user?.autonomyLevel === level.value && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Risk Tolerance */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-title">Risk Tolerance</h2>
            </div>
            <span className="text-sm font-medium text-primary">{user?.riskTolerance}%</span>
          </div>
          
          <div className="surface-card p-5 space-y-4">
            <Slider
              value={[user?.riskTolerance || 50]}
              onValueChange={([value]) => updateProfile({ riskTolerance: value })}
              max={100}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Conservative</span>
              <span>Moderate</span>
              <span>Aggressive</span>
            </div>
          </div>
        </div>

        {/* AI Transparency */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-title">AI Transparency</h2>
          </div>
          
          <div className="surface-card p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Explain all decisions</p>
                <p className="text-sm text-muted-foreground">Show AI reasoning for every action</p>
              </div>
              <Switch
                checked={user?.aiTransparency}
                onCheckedChange={(checked) => updateProfile({ aiTransparency: checked })}
              />
            </div>
          </div>
        </div>

        {/* Data Permissions */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-title">Data & Permissions</h2>
          </div>
          
          <div className="surface-card divide-y divide-border">
            <SettingsLink label="Connected accounts" value="6 accounts" />
            <SettingsLink label="Data export" value="Download your data" />
            <SettingsLink label="Privacy settings" value="Manage" />
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start gap-3"
            onClick={handleReset}
          >
            <RotateCcw className="w-4 h-4" />
            Reset Demo Data
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start gap-3 text-destructive hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}

function SettingsLink({ label, value }: { label: string; value: string }) {
  return (
    <button className="w-full p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="text-sm">{value}</span>
        <ChevronRight className="w-4 h-4" />
      </div>
    </button>
  );
}
