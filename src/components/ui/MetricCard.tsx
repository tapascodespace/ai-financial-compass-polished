import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: ReactNode;
  className?: string;
  delay?: number;
}

export function MetricCard({ 
  label, 
  value, 
  subtext, 
  trend, 
  trendValue,
  icon,
  className,
  delay = 0
}: MetricCardProps) {
  return (
    <motion.div
      className={cn("surface-card p-6 rounded-lg card-hover", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, boxShadow: '0 10px 24px rgba(0, 0, 0, 0.08)' }}
    >
      <div className="flex items-start justify-between">
        <motion.div 
          className="space-y-2 flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.1 }}
        >
          <motion.p 
            className="text-label"
            animate={{ opacity: [1, 0.8, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {label}
          </motion.p>
          <motion.p className="text-headline">
            {typeof value === 'number' 
              ? value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }) 
              : value}
          </motion.p>
          {subtext && <p className="text-caption">{subtext}</p>}
          {trend && trendValue && (
            <motion.div
              className={cn(
                "flex items-center gap-2 text-sm font-semibold pt-2",
                trend === 'up' && "text-success",
                trend === 'down' && "text-destructive",
                trend === 'neutral' && "text-muted-foreground"
              )}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.2 }}
            >
              <motion.span
                animate={{ rotate: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
              </motion.span>
              <span>{trendValue}</span>
            </motion.div>
          )}
        </motion.div>
        {icon && (
          <motion.div 
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary/70 flex-shrink-0"
            whileHover={{ scale: 1.1, rotate: 5 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.15 }}
          >
            {icon}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
