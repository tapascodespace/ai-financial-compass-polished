import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { demoActivity, ActivityEntry } from '@/lib/demoData';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Zap, 
  AlertCircle, 
  CheckCircle2,
  Clock,
  XCircle,
  ChevronDown,
  ChevronUp,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';

const typeIcons: Record<ActivityEntry['type'], React.ComponentType<{ className?: string }>> = {
  proposal: MessageSquare,
  action: CheckCircle2,
  alert: AlertCircle,
  automation: Zap,
};

const typeColors: Record<ActivityEntry['type'], string> = {
  proposal: 'bg-primary/10 text-primary',
  action: 'bg-success/10 text-success',
  alert: 'bg-warning/10 text-warning',
  automation: 'bg-accent/10 text-accent',
};

const statusConfig = {
  approved: { icon: CheckCircle2, color: 'text-success', label: 'Approved' },
  pending: { icon: Clock, color: 'text-warning', label: 'Pending' },
  rejected: { icon: XCircle, color: 'text-destructive', label: 'Rejected' },
  auto: { icon: Zap, color: 'text-primary', label: 'Automatic' },
};

export default function Activity() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | ActivityEntry['type']>('all');

  const filteredActivity = filter === 'all' 
    ? demoActivity 
    : demoActivity.filter(a => a.type === filter);

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-headline">Activity Log</h1>
            <p className="text-muted-foreground">Complete record of AI decisions and actions</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button 
            variant={filter === 'proposal' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('proposal')}
          >
            Proposals
          </Button>
          <Button 
            variant={filter === 'action' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('action')}
          >
            Actions
          </Button>
          <Button 
            variant={filter === 'automation' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('automation')}
          >
            Automations
          </Button>
          <Button 
            variant={filter === 'alert' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('alert')}
          >
            Alerts
          </Button>
        </div>

        {/* Activity List */}
        <div className="space-y-4">
          {filteredActivity.map((entry) => {
            const Icon = typeIcons[entry.type];
            const StatusIcon = statusConfig[entry.status].icon;
            const isExpanded = expandedId === entry.id;

            return (
              <div 
                key={entry.id}
                className="surface-elevated overflow-hidden"
              >
                <div 
                  className="p-5 cursor-pointer hover:bg-secondary/30 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                      typeColors[entry.type]
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-medium text-foreground">{entry.title}</h3>
                          <p className="text-sm text-muted-foreground">{entry.description}</p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <div className={cn(
                            "flex items-center gap-1.5 text-sm",
                            statusConfig[entry.status].color
                          )}>
                            <StatusIcon className="w-4 h-4" />
                            <span>{statusConfig[entry.status].label}</span>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{entry.timestamp}</p>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-0 animate-fade-in">
                    <div className="pl-14 space-y-4">
                      {entry.reasoning && (
                        <div className="bg-secondary/50 rounded-lg p-4">
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                            AI Reasoning
                          </p>
                          <p className="text-sm text-foreground">{entry.reasoning}</p>
                        </div>
                      )}

                      {(entry.before || entry.after) && (
                        <div className="grid gap-4 md:grid-cols-2">
                          {entry.before && (
                            <div className="surface-card p-4">
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                                Before
                              </p>
                              <p className="text-sm text-foreground">{entry.before}</p>
                            </div>
                          )}
                          {entry.after && (
                            <div className="surface-card p-4 border-success/20 bg-success/5">
                              <p className="text-xs font-medium text-success uppercase tracking-wider mb-2">
                                After
                              </p>
                              <p className="text-sm text-foreground">{entry.after}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {entry.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button size="sm">Approve</Button>
                          <Button size="sm" variant="outline">Dismiss</Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredActivity.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No activity found for this filter.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
