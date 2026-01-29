import { ReactNode } from 'react';
import { motion } from 'framer-motion';
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
    <motion.div 
      className={cn("insight-card rounded-lg", className)}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, boxShadow: '0 10px 24px rgba(0, 0, 0, 0.08)' }}
    >
      <div className="flex items-start gap-4">
        <motion.div 
          className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles className="w-5 h-5 text-primary" />
        </motion.div>
        <div className="flex-1 space-y-3">
          <motion.p 
            className="text-body leading-relaxed font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {insight}
          </motion.p>
          {impact && (
            <motion.p 
              className="text-caption text-success font-semibold"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              ✓ {impact}
            </motion.p>
          )}
          {children}
        </div>
      </div>
      
      {(onReview || onApprove || onDismiss) && (
        <motion.div 
          className="flex items-center gap-3 pt-4 mt-4 border-t border-border/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {onReview && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                size="sm"
                onClick={onReview}
                className="flex items-center gap-1 font-medium"
              >
                Review
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ChevronRight className="w-3 h-3" />
                </motion.div>
              </Button>
            </motion.div>
          )}
          {onApprove && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="sm"
                onClick={onApprove}
                className="font-medium bg-gradient-to-r from-primary to-primary/90 hover:shadow-md"
              >
                Approve
              </Button>
            </motion.div>
          )}
          {onDismiss && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onDismiss}
                className="text-muted-foreground hover:text-foreground font-medium"
              >
                Dismiss
              </Button>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
