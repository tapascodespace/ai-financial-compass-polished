import { ReactNode } from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface InsightCardProps {
  insight: string;
  impact?: string;
  onReview?: () => void;
  onApprove?: () => void;
  onDismiss?: () => void;
  className?: string;
  children?: ReactNode;
}

export function InsightCard({ 
  insight, 
  impact, 
  onReview, 
  onApprove, 
  onDismiss,
  className,
  children 
}: InsightCardProps) {
  return (
    <div className={cn("insight-card", className)}>
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 space-y-2">
          <p className="text-body leading-relaxed">{insight}</p>
          {impact && (
            <p className="text-caption text-success font-medium">{impact}</p>
          )}
          {children}
        </div>
      </div>
      
      {(onReview || onApprove || onDismiss) && (
        <div className="flex items-center gap-2 pt-2">
          {onReview && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={onReview}
              className="flex items-center gap-1"
            >
              Review
              <ChevronRight className="w-3 h-3" />
            </Button>
          )}
          {onApprove && (
            <Button 
              size="sm"
              onClick={onApprove}
            >
              Approve
            </Button>
          )}
          {onDismiss && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onDismiss}
              className="text-muted-foreground"
            >
              Dismiss
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
