import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { demoGoals, Goal } from '@/lib/demoData';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp, Plus, Settings2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>(demoGoals);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-success';
    if (confidence >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'bg-success';
    if (probability >= 60) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-headline">Goals</h1>
            <p className="text-muted-foreground">Define your intent — AI handles the numbers</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Goal
          </Button>
        </div>

        {/* Goals Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {goals.map((goal) => (
            <div key={goal.id} className="surface-elevated p-6 space-y-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-title">{goal.title}</h3>
                    <p className="text-sm text-muted-foreground">{goal.description}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Settings2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Success Probability</span>
                  <span className="font-semibold">{goal.probability}%</span>
                </div>
                <Progress 
                  value={goal.probability} 
                  className="h-2"
                />
              </div>

              <div className="flex items-center justify-between py-3 border-t border-b border-border">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">AI Confidence</span>
                </div>
                <span className={cn("font-semibold", getConfidenceColor(goal.aiConfidence))}>
                  {goal.aiConfidence}%
                </span>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-3">Linked Actions</p>
                <div className="flex flex-wrap gap-2">
                  {goal.linkedActions.map((action, i) => (
                    <span 
                      key={i}
                      className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground"
                    >
                      {action}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Target Date</span>
                <span className="font-medium">{goal.targetDate}</span>
              </div>

              <Button variant="outline" className="w-full">
                Adjust Goal
              </Button>
            </div>
          ))}
        </div>

        {/* Add Goal Card */}
        <div className="surface-card p-8 border-dashed flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
            <Plus className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-title mb-1">Create a new goal</h3>
            <p className="text-muted-foreground text-sm max-w-md">
              Tell us what you want to achieve. AI will figure out the best path to get there.
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Goal
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
