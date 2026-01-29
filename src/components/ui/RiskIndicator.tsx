import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Shield, AlertTriangle, AlertCircle } from 'lucide-react';

interface RiskIndicatorProps {
  level: 'low' | 'medium' | 'high';
  className?: string;
  delay?: number;
}

export function RiskIndicator({ level, className, delay = 0 }: RiskIndicatorProps) {
  const config = {
    low: {
      icon: Shield,
      label: 'Low Risk',
      color: 'text-success',
      bg: 'bg-success/10',
      border: 'border-success/20',
      description: 'Your portfolio is well-balanced'
    },
    medium: {
      icon: AlertTriangle,
      label: 'Medium Risk',
      color: 'text-warning',
      bg: 'bg-warning/10',
      border: 'border-warning/20',
      description: 'Some attention recommended'
    },
    high: {
      icon: AlertCircle,
      label: 'High Risk',
      color: 'text-destructive',
      bg: 'bg-destructive/10',
      border: 'border-destructive/20',
      description: 'Action recommended'
    }
  };

  const { icon: Icon, label, color, bg, border, description } = config[level];

  return (
    <motion.div 
      className={cn("surface-card p-6 rounded-lg border", border, className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, boxShadow: '0 10px 24px rgba(0, 0, 0, 0.08)' }}
    >
      <motion.p 
        className="text-label mb-4"
        animate={{ opacity: [1, 0.8, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Risk Exposure
      </motion.p>
      <div className="flex items-center gap-4">
        <motion.div 
          className={cn("w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0", bg)}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Icon className={cn("w-7 h-7", color)} />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 0.1 }}>
          <motion.p className={cn("text-lg font-bold", color)}>{label}</motion.p>
          <motion.p className="text-caption">{description}</motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
