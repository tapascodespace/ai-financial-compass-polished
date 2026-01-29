import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { MetricCard } from '@/components/ui/MetricCard';
import { RiskIndicator } from '@/components/ui/RiskIndicator';
import { InsightCard } from '@/components/ui/InsightCard';
import { demoAccounts, calculateNetWorth, calculateMonthlyIncome, calculateMonthlyExpenses } from '@/lib/demoData';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

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
      <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-headline">Financial Overview</h1>
          <p className="text-muted-foreground">Your complete financial picture at a glance</p>
        </div>

        {/* Primary Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            label="Net Worth"
            value={netWorth}
            trend="up"
            trendValue="+$3,240 this month"
            icon={<TrendingUp className="w-5 h-5" />}
            className="md:col-span-2 lg:col-span-1"
          />
          
          <div className="surface-card p-5">
            <p className="text-label mb-3">Monthly Cash Flow</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowUpRight className="w-4 h-4 text-success" />
                  <span className="text-sm text-muted-foreground">Income</span>
                </div>
                <span className="font-semibold text-success">+${monthlyIncome.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowDownRight className="w-4 h-4 text-destructive" />
                  <span className="text-sm text-muted-foreground">Expenses</span>
                </div>
                <span className="font-semibold text-destructive">-${monthlyExpenses.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Net Flow</span>
                  <span className="text-lg font-semibold text-success">+${cashFlow.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <RiskIndicator level="low" />
        </div>

        {/* AI Insight */}
        {!insightDismissed && (
          <InsightCard
            insight="You're holding excess idle cash while carrying high-interest debt. I recommend reallocating $2,100 to reduce interest by $1,340/year."
            impact="Potential savings: $1,340/year in interest"
            onReview={() => navigate('/agent')}
            onApprove={handleApprove}
            onDismiss={handleDismiss}
          />
        )}

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <QuickStat 
            label="Active Accounts" 
            value={demoAccounts.length.toString()} 
            detail="All synced" 
          />
          <QuickStat 
            label="Active Automations" 
            value="3" 
            detail="Running smoothly" 
          />
          <QuickStat 
            label="Goals on Track" 
            value="2 of 3" 
            detail="73% avg. probability" 
          />
          <QuickStat 
            label="Actions This Month" 
            value="7" 
            detail="5 approved, 2 pending" 
          />
        </div>

        {/* Account Summary */}
        <div className="space-y-4">
          <h2 className="text-title">Account Summary</h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {demoAccounts.map((account) => (
              <div 
                key={account.id} 
                className="surface-card p-4 hover:shadow-medium transition-shadow cursor-pointer"
                onClick={() => navigate('/accounts')}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-foreground">{account.name}</p>
                    <p className="text-sm text-muted-foreground">{account.institution}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">
                    {account.role}
                  </span>
                </div>
                <p className={`text-xl font-semibold ${account.balance < 0 ? 'text-destructive' : 'text-foreground'}`}>
                  {account.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function QuickStat({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="surface-card p-4">
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-2xl font-semibold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{detail}</p>
    </div>
  );
}
