import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Sparkles } from 'lucide-react';

export function TopBar() {
  const { user } = useAuth();

  return (
    <motion.header 
      className="h-16 border-b border-border/40 bg-white/80 backdrop-filter backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-40"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div 
        className="flex items-center gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <motion.h1 
          className="text-xl font-bold text-foreground tracking-tight"
          whileHover={{ scale: 1.05 }}
        >
          Selfin
        </motion.h1>
        <motion.div 
          className="status-pill-active"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity }}>
            <Sparkles className="w-3.5 h-3.5" />
          </motion.div>
          <span className="font-semibold">AI Active</span>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="flex items-center gap-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-3">
          <motion.div 
            className="text-right hidden sm:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm font-semibold text-foreground">{user?.name}</p>
            <p className="text-xs text-muted-foreground">Demo Account</p>
          </motion.div>
          <motion.div 
            className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 text-primary flex items-center justify-center text-sm font-bold border border-primary/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{ boxShadow: ['0 0 0 0 rgba(214, 88, 55, 0.7)', '0 0 0 10px rgba(214, 88, 55, 0)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {user?.avatar}
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  );
}
