import { useState } from 'react';
import { motion } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { MetricCard } from '@/components/ui/MetricCard';
import { RiskIndicator } from '@/components/ui/RiskIndicator';
import { InsightCard } from '@/components/ui/InsightCard';
import { demoAccounts, calculateNetWorth, calculateMonthlyIncome, calculateMonthlyExpenses } from '@/lib/demoData';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Home() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [insightDismissed, setInsightDismissed] = useState(false);

  const netWorth = calculateNetWorth(demoAccounts);
  const monthlyIncome = calculateMonthlyIncome();
  const monthlyExpenses = calculateMonthlyExpenses();
  const cashFlow = monthlyIncome - monthlyExpenses;

  const handleApprove = () => {
    toast({
      title: "Action Approved",
      description: "Reallocating $2,100 to reduce high-interest debt.",
    });
    setInsightDismissed(true);
  };

  const handleDismiss = () => {
    setInsightDismissed(true);
  };

  return (
    <AppLayout>
      <motion.div 
        className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="space-y-2" variants={itemVariants}>
          <motion.h1 className="text-headline">Financial Overview</motion.h1>
          <motion.p className="text-muted-foreground text-lg">Your complete financial picture at a glance</motion.p>
        </motion.div>

        {/* Primary Metrics */}
        <motion.div 
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <MetricCard
              label="Net Worth"
              value={netWorth}
              trend="up"
              trendValue="+$3,240 this month"
              icon={<TrendingUp className="w-6 h-6" />}
              className="md:col-span-2 lg:col-span-1"
              delay={0}
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <motion.div 
              className="surface-card p-6 rounded-lg"
              whileHover={{ y: -4, boxShadow: '0 10px 24px rgba(0, 0, 0, 0.08)' }}
              transition={{ duration: 0.3 }}
            >
              <motion.p 
                className="text-label mb-4"
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Monthly Cash Flow
              </motion.p>
              <div className="space-y-4">
                <motion.div 
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-2">
                    <ArrowUpRight className="w-4 h-4 text-success" />
                    <span className="text-sm text-muted-foreground">Income</span>
                  </div>
                  <span className="font-semibold text-success">+${monthlyIncome.toLocaleString()}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <div className="flex items-center gap-2">
                    <ArrowDownRight className="w-4 h-4 text-destructive" />
                    <span className="text-sm text-muted-foreground">Expenses</span>
                  </div>
                  <span className="font-semibold text-destructive">-${monthlyExpenses.toLocaleString()}</span>
                </motion.div>
                <motion.div 
                  className="pt-3 border-t border-border/60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Net Flow</span>
                    <motion.span 
                      className="text-lg font-bold text-success"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      +${cashFlow.toLocaleString()}
                    </motion.span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <RiskIndicator level="low" />
          </motion.div>
        </motion.div>

        {/* AI Insight */}
        {!insightDismissed && (
          <motion.div
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <InsightCard
              insight="You're holding excess idle cash while carrying high-interest debt. I recommend reallocating $2,100 to reduce interest by $1,340/year."
              impact="Potential savings: $1,340/year in interest"
              onReview={() => navigate('/agent')}
              onApprove={handleApprove}
              onDismiss={handleDismiss}
            />
          </motion.div>
        )}

        {/* Quick Stats */}
        <motion.div 
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <QuickStat label="Active Accounts" value={demoAccounts.length.toString()} detail="All synced" delay={0} />
          <QuickStat label="Active Automations" value="3" detail="Running smoothly" delay={0.05} />
          <QuickStat label="Goals on Track" value="2 of 3" detail="73% avg. probability" delay={0.1} />
          <QuickStat label="Actions This Month" value="7" detail="5 approved, 2 pending" delay={0.15} />
        </motion.div>

        {/* Account Summary */}
        <motion.div className="space-y-5" variants={itemVariants}>
          <div className="flex items-center justify-between">
            <motion.h2 className="text-title">Account Summary</motion.h2>
            <motion.button
              onClick={() => navigate('/accounts')}
              className="text-sm text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all"
              whileHover={{ x: 5 }}
            >
              View All
              <motion.div animate={{ x: [0, 3, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <ChevronRight className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </div>
          <motion.div 
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {demoAccounts.map((account, idx) => (
              <motion.div
                key={account.id}
                variants={itemVariants}
                whileHover={{ y: -4, boxShadow: '0 10px 24px rgba(0, 0, 0, 0.08)' }}
                onClick={() => navigate('/accounts')}
                className="surface-card p-5 rounded-lg cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-foreground">{account.name}</p>
                    <p className="text-xs text-muted-foreground">{account.institution}</p>
                  </div>
                  <motion.span 
                    className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    {account.role}
                  </motion.span>
                </div>
                <motion.p 
                  className={`text-2xl font-bold ${account.balance < 0 ? 'text-destructive' : 'text-foreground'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + idx * 0.05 }}
                >
                  {account.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </AppLayout>
  );
}

function QuickStat({ label, value, detail, delay }: { label: string; value: string; detail: string; delay: number }) {
  return (
    <motion.div
      className="surface-card p-5 rounded-lg text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, boxShadow: '0 10px 24px rgba(0, 0, 0, 0.08)' }}
    >
      <motion.p 
        className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2"
        animate={{ opacity: [1, 0.8, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {label}
      </motion.p>
      <motion.p className="text-3xl font-bold text-foreground">{value}</motion.p>
      <motion.p className="text-xs text-muted-foreground mt-2">{detail}</motion.p>
    </motion.div>
  );
}
