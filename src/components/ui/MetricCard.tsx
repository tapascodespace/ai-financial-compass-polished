import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: ReactNode;
  className?: string;
}

export function MetricCard({ 
  label, 
  value, 
  subtext, 
  trend, 
  trendValue,
  icon,
  className 
}: MetricCardProps) {
  return (
    <div className={cn("surface-card p-5", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-label">{label}</p>
          <p className="text-headline">{typeof value === 'number' ? value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : value}</p>
          {subtext && <p className="text-caption">{subtext}</p>}
          {trend && trendValue && (
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              trend === 'up' && "text-success",
              trend === 'down' && "text-destructive",
              trend === 'neutral' && "text-muted-foreground"
            )}>
              <span>{trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}</span>
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
