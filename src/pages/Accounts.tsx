import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { demoAccounts, Account } from '@/lib/demoData';
import { Button } from '@/components/ui/button';
import { 
  CreditCard, 
  Wallet, 
  PiggyBank, 
  TrendingUp, 
  Bitcoin, 
  Building2,
  RefreshCw,
  Sparkles,
  ChevronRight,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const accountIcons: Record<Account['type'], React.ComponentType<{ className?: string }>> = {
  checking: Wallet,
  savings: PiggyBank,
  credit: CreditCard,
  investment: TrendingUp,
  crypto: Bitcoin,
  retirement: Building2,
};

const statusColors: Record<Account['status'], string> = {
  healthy: 'bg-success/10 text-success',
  attention: 'bg-warning/10 text-warning',
  warning: 'bg-destructive/10 text-destructive',
};

export default function Accounts() {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const totalAssets = demoAccounts.filter(a => a.balance > 0).reduce((sum, a) => sum + a.balance, 0);
  const totalLiabilities = Math.abs(demoAccounts.filter(a => a.balance < 0).reduce((sum, a) => sum + a.balance, 0));

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-headline">Accounts</h1>
            <p className="text-muted-foreground">All your connected financial products</p>
          </div>
          <Button variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Sync All
          </Button>
        </div>

        {/* Summary */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="surface-card p-5">
            <p className="text-label mb-2">Total Assets</p>
            <p className="text-headline text-success">${totalAssets.toLocaleString()}</p>
          </div>
          <div className="surface-card p-5">
            <p className="text-label mb-2">Total Liabilities</p>
            <p className="text-headline text-destructive">-${totalLiabilities.toLocaleString()}</p>
          </div>
          <div className="surface-card p-5">
            <p className="text-label mb-2">Net Position</p>
            <p className="text-headline">${(totalAssets - totalLiabilities).toLocaleString()}</p>
          </div>
        </div>

        {/* Account Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {demoAccounts.map((account) => {
            const Icon = accountIcons[account.type];
            return (
              <div
                key={account.id}
                onClick={() => setSelectedAccount(account)}
                className="surface-card p-5 cursor-pointer hover:shadow-medium transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{account.name}</p>
                      <p className="text-sm text-muted-foreground">{account.institution}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="flex items-end justify-between">
                  <div>
                    <p className={cn(
                      "text-2xl font-semibold",
                      account.balance < 0 ? 'text-destructive' : 'text-foreground'
                    )}>
                      {account.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Synced {account.lastSync}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={cn("text-xs px-2 py-1 rounded-full", statusColors[account.status])}>
                      {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">
                      {account.role}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Account Detail Drawer */}
        {selectedAccount && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div 
              className="absolute inset-0 bg-foreground/20" 
              onClick={() => setSelectedAccount(null)}
            />
            <div className="relative w-full max-w-md bg-white h-full shadow-floating animate-slide-in-right overflow-auto">
              <div className="p-6 space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                      {(() => {
                        const Icon = accountIcons[selectedAccount.type];
                        return <Icon className="w-6 h-6 text-muted-foreground" />;
                      })()}
                    </div>
                    <div>
                      <h2 className="text-title">{selectedAccount.name}</h2>
                      <p className="text-muted-foreground">{selectedAccount.institution}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedAccount(null)}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                <div className="surface-card p-5">
                  <p className="text-label mb-2">Current Balance</p>
                  <p className={cn(
                    "text-3xl font-semibold",
                    selectedAccount.balance < 0 ? 'text-destructive' : 'text-foreground'
                  )}>
                    {selectedAccount.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <span className={cn("text-xs px-2 py-1 rounded-full", statusColors[selectedAccount.status])}>
                      {selectedAccount.status}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">
                      {selectedAccount.role}
                    </span>
                  </div>
                </div>

                {selectedAccount.aiNote && (
                  <div className="surface-elevated p-4">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">AI Insight</p>
                        <p className="text-sm text-muted-foreground">{selectedAccount.aiNote}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-medium text-foreground mb-3">Recent Transactions</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Direct Deposit', amount: 4250, date: 'Jan 28' },
                      { name: 'Whole Foods', amount: -127.43, date: 'Jan 27' },
                      { name: 'Netflix', amount: -15.99, date: 'Jan 26' },
                      { name: 'Transfer to Savings', amount: -500, date: 'Jan 25' },
                    ].map((tx, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div>
                          <p className="text-sm font-medium text-foreground">{tx.name}</p>
                          <p className="text-xs text-muted-foreground">{tx.date}</p>
                        </div>
                        <p className={cn(
                          "font-medium",
                          tx.amount < 0 ? 'text-foreground' : 'text-success'
                        )}>
                          {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full">View Full History</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
