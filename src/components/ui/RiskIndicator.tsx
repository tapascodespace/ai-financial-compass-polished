import { cn } from '@/lib/utils';
import { Shield, AlertTriangle, AlertCircle } from 'lucide-react';

interface RiskIndicatorProps {
  level: 'low' | 'medium' | 'high';
  className?: string;
}

export function RiskIndicator({ level, className }: RiskIndicatorProps) {
  const config = {
    low: {
      icon: Shield,
      label: 'Low Risk',
      color: 'text-success',
      bg: 'bg-success/10',
      description: 'Your portfolio is well-balanced'
    },
    medium: {
      icon: AlertTriangle,
      label: 'Medium Risk',
      color: 'text-warning',
      bg: 'bg-warning/10',
      description: 'Some attention recommended'
    },
    high: {
      icon: AlertCircle,
      label: 'High Risk',
      color: 'text-destructive',
      bg: 'bg-destructive/10',
      description: 'Action recommended'
    }
  };

  const { icon: Icon, label, color, bg, description } = config[level];

  return (
    <div className={cn("surface-card p-5", className)}>
      <p className="text-label mb-3">Risk Exposure</p>
      <div className="flex items-center gap-3">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", bg)}>
          <Icon className={cn("w-6 h-6", color)} />
        </div>
        <div>
          <p className={cn("text-lg font-semibold", color)}>{label}</p>
          <p className="text-caption">{description}</p>
        </div>
      </div>
    </div>
  );
}
