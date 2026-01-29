export interface Account {
  id: string;
  name: string;
  institution: string;
  type: 'checking' | 'savings' | 'credit' | 'investment' | 'crypto' | 'retirement';
  balance: number;
  role: 'Liquidity' | 'Growth' | 'Safety' | 'Debt' | 'Long-term';
  status: 'healthy' | 'attention' | 'warning';
  lastSync: string;
  aiNote?: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  probability: number;
  aiConfidence: number;
  linkedActions: string[];
}

export interface Automation {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  guardrails: string;
  explanation: string;
  lastTriggered?: string;
}

export interface ActivityEntry {
  id: string;
  type: 'proposal' | 'action' | 'alert' | 'automation';
  title: string;
  description: string;
  status: 'approved' | 'pending' | 'rejected' | 'auto';
  timestamp: string;
  reasoning?: string;
  before?: string;
  after?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  autonomyLevel: 'observe' | 'recommend' | 'act';
  riskTolerance: number;
  aiTransparency: boolean;
}

export const demoAccounts: Account[] = [
  {
    id: '1',
    name: 'Primary Checking',
    institution: 'Chase Bank',
    type: 'checking',
    balance: 8420.50,
    role: 'Liquidity',
    status: 'healthy',
    lastSync: '2 min ago',
    aiNote: 'Healthy buffer maintained. Consider moving $2,100 excess to HYSA.'
  },
  {
    id: '2',
    name: 'High-Yield Savings',
    institution: 'Marcus',
    type: 'savings',
    balance: 15750.00,
    role: 'Safety',
    status: 'healthy',
    lastSync: '5 min ago',
    aiNote: 'Earning 4.5% APY. On track for emergency fund goal.'
  },
  {
    id: '3',
    name: 'Travel Rewards Card',
    institution: 'Capital One',
    type: 'credit',
    balance: -4280.00,
    role: 'Debt',
    status: 'attention',
    lastSync: '1 hour ago',
    aiNote: 'High-interest debt at 22.9% APR. Priority for payoff.'
  },
  {
    id: '4',
    name: 'Growth Portfolio',
    institution: 'Fidelity',
    type: 'investment',
    balance: 42680.00,
    role: 'Growth',
    status: 'healthy',
    lastSync: '15 min ago',
    aiNote: 'Slightly overweight in tech. Consider rebalancing 5% to bonds.'
  },
  {
    id: '5',
    name: 'Bitcoin & Ethereum',
    institution: 'Coinbase',
    type: 'crypto',
    balance: 8950.00,
    role: 'Growth',
    status: 'warning',
    lastSync: '30 min ago',
    aiNote: 'High volatility exposure. Represents 11% of portfolio—within risk tolerance.'
  },
  {
    id: '6',
    name: '401(k) Retirement',
    institution: 'Vanguard',
    type: 'retirement',
    balance: 89500.00,
    role: 'Long-term',
    status: 'healthy',
    lastSync: '1 day ago',
    aiNote: 'On track for retirement goals. Contribution rate optimal.'
  }
];

export const demoGoals: Goal[] = [
  {
    id: '1',
    title: 'Buy a home in 18 months',
    description: 'Save for a $60,000 down payment on a home in the Bay Area',
    targetDate: '2026-07-01',
    probability: 73,
    aiConfidence: 85,
    linkedActions: ['Increase HYSA contributions', 'Reduce discretionary spending']
  },
  {
    id: '2',
    title: 'Maintain low financial stress',
    description: 'Keep 6 months of expenses in emergency fund',
    targetDate: 'Ongoing',
    probability: 92,
    aiConfidence: 95,
    linkedActions: ['Auto-transfer to savings', 'Monitor expense patterns']
  },
  {
    id: '3',
    title: 'Grow wealth steadily',
    description: 'Achieve 7% average annual return on investments',
    targetDate: 'Ongoing',
    probability: 81,
    aiConfidence: 78,
    linkedActions: ['Quarterly rebalancing', 'Tax-loss harvesting']
  }
];

export const demoAutomations: Automation[] = [
  {
    id: '1',
    name: 'Maintain checking buffer',
    description: 'Always keep checking account above $3,000',
    enabled: true,
    guardrails: 'Transfer from HYSA if below threshold. Max transfer: $2,000/month',
    explanation: 'Prevents overdrafts and ensures liquidity for unexpected expenses',
    lastTriggered: '3 days ago'
  },
  {
    id: '2',
    name: 'Auto-reduce high-interest debt',
    description: 'Pay down credit card when cash surplus exists',
    enabled: true,
    guardrails: 'Only when checking > $5,000. Pay minimum + 50% of surplus',
    explanation: 'Reduces interest costs while maintaining cash buffer',
    lastTriggered: '1 week ago'
  },
  {
    id: '3',
    name: 'Quarterly portfolio rebalance',
    description: 'Rebalance to target allocation every quarter',
    enabled: true,
    guardrails: 'Only rebalance if drift > 5%. Max trade: $5,000/quarter',
    explanation: 'Maintains risk profile and captures gains from overweight positions',
    lastTriggered: '2 months ago'
  },
  {
    id: '4',
    name: 'Pause investing if cash tight',
    description: 'Reduce investment contributions during low cash flow',
    enabled: false,
    guardrails: 'Trigger when checking drops below $2,500 for 7+ days',
    explanation: 'Prioritizes liquidity during financial stress periods'
  }
];

export const demoActivity: ActivityEntry[] = [
  {
    id: '1',
    type: 'proposal',
    title: 'Debt repayment recommendation',
    description: 'AI proposed paying $1,200 toward credit card',
    status: 'approved',
    timestamp: '2 hours ago',
    reasoning: 'Excess cash detected after paycheck. Paying down high-interest debt saves $340 in annual interest.',
    before: 'Credit card balance: $5,480',
    after: 'Credit card balance: $4,280'
  },
  {
    id: '2',
    type: 'automation',
    title: 'Portfolio rebalanced',
    description: 'Quarterly rebalance executed automatically',
    status: 'auto',
    timestamp: '3 days ago',
    reasoning: 'Tech allocation drifted to 42% (target: 35%). Sold $2,100 NASDAQ, bought $2,100 bond ETF.',
    before: 'Tech: 42%, Bonds: 18%',
    after: 'Tech: 35%, Bonds: 25%'
  },
  {
    id: '3',
    type: 'alert',
    title: 'Risk exposure reduced',
    description: 'Crypto volatility alert triggered review',
    status: 'pending',
    timestamp: '1 week ago',
    reasoning: 'Bitcoin dropped 15% in 48 hours. Recommending hold—within risk tolerance but flagged for awareness.'
  },
  {
    id: '4',
    type: 'action',
    title: 'Emergency fund contribution',
    description: 'Auto-transferred $500 to HYSA',
    status: 'auto',
    timestamp: '2 weeks ago',
    reasoning: 'Monthly savings automation executed. Emergency fund now at 5.2 months of expenses.',
    before: 'HYSA balance: $15,250',
    after: 'HYSA balance: $15,750'
  }
];

export const demoProfile: UserProfile = {
  name: 'Alex Morgan',
  email: 'alex.demo@example.com',
  avatar: 'AM',
  autonomyLevel: 'recommend',
  riskTolerance: 65,
  aiTransparency: true
};

export const calculateNetWorth = (accounts: Account[]): number => {
  return accounts.reduce((sum, acc) => sum + acc.balance, 0);
};

export const calculateMonthlyIncome = (): number => 8500;
export const calculateMonthlyExpenses = (): number => 5200;
