import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  MessageSquare, 
  Wallet, 
  Target, 
  Zap, 
  Activity, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/home', label: 'Home', icon: Home },
  { path: '/agent', label: 'AI Agent', icon: MessageSquare },
  { path: '/accounts', label: 'Accounts', icon: Wallet },
  { path: '/goals', label: 'Goals', icon: Target },
  { path: '/automations', label: 'Automations', icon: Zap },
  { path: '/activity', label: 'Activity Log', icon: Activity },
  { path: '/settings', label: 'Settings', icon: Settings },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.aside 
      className={cn(
        "h-full bg-white border-r border-border/40 flex flex-col transition-all duration-300 ease-out",
        collapsed ? "w-20" : "w-64"
      )}
      initial={false}
      animate={{ width: collapsed ? 80 : 256 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.nav 
        className="flex-1 p-4 space-y-1 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="wait">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.path}
                variants={itemVariants}
              >
                <NavLink
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-primary/10 text-primary shadow-sm" 
                      : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                  )}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                  </motion.div>
                  <AnimatePresence mode="wait">
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </NavLink>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.nav>
      
      <motion.div 
        className="p-3 border-t border-border/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-secondary/70 hover:text-foreground transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {collapsed ? (
            <motion.div
              initial={{ rotate: -180 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronRight className="w-4 h-4" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: -180 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                Collapse
              </motion.span>
            </motion.div>
          )}
        </motion.button>
      </motion.div>
    </motion.aside>
  );
}
