import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { demoAutomations, Automation } from '@/lib/demoData';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Zap, Settings2, HelpCircle, Plus, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function Automations() {
  const [automations, setAutomations] = useState<Automation[]>(demoAutomations);
  const { toast } = useToast();

  const toggleAutomation = (id: string) => {
    setAutomations(automations.map(auto => {
      if (auto.id === id) {
        const newEnabled = !auto.enabled;
        toast({
          title: newEnabled ? "Automation Enabled" : "Automation Paused",
          description: newEnabled 
            ? `"${auto.name}" will now run automatically.`
            : `"${auto.name}" has been paused.`,
        });
        return { ...auto, enabled: newEnabled };
      }
      return auto;
    }));
  };

  const enabledCount = automations.filter(a => a.enabled).length;

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-headline">Automations</h1>
            <p className="text-muted-foreground">Zero-click finance — your money works while you rest</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Automation
          </Button>
        </div>

        {/* Summary */}
        <div className="surface-card p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="font-medium text-foreground">{enabledCount} Active Automations</p>
              <p className="text-sm text-muted-foreground">Running in the background</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            View Logs
          </Button>
        </div>

        {/* Automations List */}
        <div className="space-y-4">
          {automations.map((automation) => (
            <div 
              key={automation.id}
              className={cn(
                "surface-elevated p-5 transition-all",
                automation.enabled && "border-success/20"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                      automation.enabled ? "bg-success/10" : "bg-secondary"
                    )}>
                      <Zap className={cn(
                        "w-5 h-5",
                        automation.enabled ? "text-success" : "text-muted-foreground"
                      )} />
                    </div>
                    <div>
                      <h3 className="text-title">{automation.name}</h3>
                      <p className="text-sm text-muted-foreground">{automation.description}</p>
                    </div>
                  </div>

                  <div className="bg-secondary/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Guardrails
                      </span>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{automation.explanation}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <p className="text-sm text-foreground">{automation.guardrails}</p>
                  </div>

                  {automation.lastTriggered && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Last triggered: {automation.lastTriggered}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Switch
                    checked={automation.enabled}
                    onCheckedChange={() => toggleAutomation(automation.id)}
                  />
                  <Button variant="ghost" size="icon">
                    <Settings2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create New */}
        <div className="surface-card p-8 border-dashed flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
            <Plus className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-title mb-1">Create custom automation</h3>
            <p className="text-muted-foreground text-sm max-w-md">
              Define rules and guardrails. AI will execute them while keeping you safe.
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Automation
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
