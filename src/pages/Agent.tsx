import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Send, ChevronDown, ChevronUp, Check, Edit2, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  reasoning?: string;
  actions?: Action[];
  impact?: string;
}

interface Action {
  id: string;
  title: string;
  description: string;
  approved?: boolean;
}

const quickActions = [
  { id: '1', label: 'Reduce financial stress', icon: '🧘' },
  { id: '2', label: 'Maximise long-term returns', icon: '📈' },
  { id: '3', label: 'Prepare for a big purchase', icon: '🏠' },
  { id: '4', label: 'Optimise everything automatically', icon: '✨' },
];

const initialMessages: Message[] = [
  {
    id: '1',
    type: 'ai',
    content: "Hello! I'm your financial agent. I've analyzed your complete financial picture and I'm ready to help you optimize your money. What would you like to focus on today?",
  },
];

export default function Agent() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [expandedReasoning, setExpandedReasoning] = useState<string | null>(null);
  const { toast } = useToast();

  const handleQuickAction = (action: typeof quickActions[0]) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: action.label,
    };

    let aiResponse: Message;

    if (action.id === '1') {
      aiResponse = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I've identified three actions to reduce your financial stress. These focus on building security and eliminating high-cost debt.",
        reasoning: "Your credit card debt at 22.9% APR is causing unnecessary interest payments. Moving excess cash to your emergency fund while paying down debt will reduce monthly obligations and build a stronger safety net.",
        actions: [
          { id: 'a1', title: 'Pay down credit card', description: 'Transfer $1,500 from checking to reduce debt by 35%' },
          { id: 'a2', title: 'Boost emergency fund', description: 'Move $500/month to HYSA until 6-month goal reached' },
          { id: 'a3', title: 'Set up auto-pay', description: 'Ensure all bills are on autopay to avoid late fees' },
        ],
        impact: 'Estimated stress reduction: High • Monthly savings: $89',
      };
    } else if (action.id === '2') {
      aiResponse = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "Here's my strategy to maximize your long-term returns while staying within your risk tolerance.",
        reasoning: "Your current portfolio is slightly overweight in tech stocks. Rebalancing to include more international exposure and bonds will improve risk-adjusted returns over a 10+ year horizon.",
        actions: [
          { id: 'a1', title: 'Rebalance portfolio', description: 'Shift 5% from US tech to international ETFs' },
          { id: 'a2', title: 'Increase 401(k) contribution', description: 'Raise from 10% to 12% to maximize employer match' },
          { id: 'a3', title: 'Enable dividend reinvestment', description: 'Auto-reinvest all dividends for compound growth' },
        ],
        impact: 'Projected 10-year impact: +$47,000 additional growth',
      };
    } else if (action.id === '3') {
      aiResponse = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I see you're planning to buy a home in 18 months. Here's how to maximize your down payment while maintaining financial stability.",
        reasoning: "Your current savings rate will reach $48,000 by your target date. By optimizing cash allocation and reducing unnecessary subscriptions, we can push this to $62,000.",
        actions: [
          { id: 'a1', title: 'Open dedicated house fund', description: 'Create HYSA specifically for down payment at 4.5% APY' },
          { id: 'a2', title: 'Redirect excess cash', description: 'Auto-transfer $800/month from checking to house fund' },
          { id: 'a3', title: 'Pause non-essential investments', description: 'Temporarily reduce brokerage contributions by $300/month' },
        ],
        impact: 'Projected down payment: $62,000 (goal: $60,000) ✓',
      };
    } else {
      aiResponse = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I've analyzed your complete financial picture and identified the highest-impact optimizations across all areas.",
        reasoning: "By addressing debt, savings, and investments simultaneously, we can improve your net worth trajectory by 23% over the next 12 months while reducing financial stress.",
        actions: [
          { id: 'a1', title: 'Move excess cash to HYSA', description: 'Transfer $2,100 from checking earning 0.01% to savings at 4.5%' },
          { id: 'a2', title: 'Pay down credit card A', description: 'Apply $1,200 to high-interest debt, saving $340/year' },
          { id: 'a3', title: 'Rebalance ETF exposure', description: 'Reduce tech overweight by 5%, add to bond allocation' },
        ],
        impact: 'Annual improvement: +$2,840 in net worth growth',
      };
    }

    setMessages([...messages, userMessage, aiResponse]);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
    };

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: `I understand you want to "${input}". Let me analyze your financial data and create a personalized plan.`,
      reasoning: "Based on your current financial position, I'm evaluating the best approach to address your request while maintaining your stated risk tolerance and goals.",
      actions: [
        { id: 'a1', title: 'Analyze current state', description: 'Review all accounts for optimization opportunities' },
        { id: 'a2', title: 'Create action plan', description: 'Develop step-by-step approach tailored to your request' },
      ],
      impact: 'Analysis in progress...',
    };

    setMessages([...messages, userMessage, aiResponse]);
    setInput('');
  };

  const handleApproveAction = (messageId: string, actionId: string) => {
    setMessages(messages.map(msg => {
      if (msg.id === messageId && msg.actions) {
        return {
          ...msg,
          actions: msg.actions.map(action => 
            action.id === actionId ? { ...action, approved: true } : action
          ),
        };
      }
      return msg;
    }));
    toast({
      title: "Action Approved",
      description: "This action has been added to your automation queue.",
    });
  };

  const handleApproveAll = (messageId: string) => {
    setMessages(messages.map(msg => {
      if (msg.id === messageId && msg.actions) {
        return {
          ...msg,
          actions: msg.actions.map(action => ({ ...action, approved: true })),
        };
      }
      return msg;
    }));
    toast({
      title: "All Actions Approved",
      description: "Your financial plan is now being executed.",
    });
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-auto p-6 lg:p-8 space-y-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "animate-slide-up",
                  message.type === 'user' ? 'flex justify-end' : ''
                )}
              >
                {message.type === 'user' ? (
                  <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-3 max-w-md">
                    <p>{message.content}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-4">
                        <p className="text-body leading-relaxed">{message.content}</p>
                        
                        {message.reasoning && (
                          <button
                            onClick={() => setExpandedReasoning(
                              expandedReasoning === message.id ? null : message.id
                            )}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {expandedReasoning === message.id ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                            View reasoning
                          </button>
                        )}
                        
                        {expandedReasoning === message.id && message.reasoning && (
                          <div className="bg-secondary/50 rounded-lg p-4 text-sm text-muted-foreground animate-fade-in">
                            {message.reasoning}
                          </div>
                        )}

                        {message.actions && (
                          <div className="space-y-3">
                            {message.actions.map((action, index) => (
                              <div
                                key={action.id}
                                className={cn(
                                  "surface-card p-4 transition-all",
                                  action.approved && "bg-success/5 border-success/20"
                                )}
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-medium text-muted-foreground">
                                      {index + 1}
                                    </span>
                                    <div>
                                      <p className="font-medium text-foreground">{action.title}</p>
                                      <p className="text-sm text-muted-foreground">{action.description}</p>
                                    </div>
                                  </div>
                                  {action.approved ? (
                                    <div className="flex items-center gap-1.5 text-success text-sm">
                                      <Check className="w-4 h-4" />
                                      <span>Approved</span>
                                    </div>
                                  ) : (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleApproveAction(message.id, action.id)}
                                    >
                                      Approve
                                    </Button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {message.impact && (
                          <p className="text-sm font-medium text-success">{message.impact}</p>
                        )}

                        {message.actions && message.actions.some(a => !a.approved) && (
                          <div className="flex gap-2 pt-2">
                            <Button onClick={() => handleApproveAll(message.id)}>
                              Approve all
                            </Button>
                            <Button variant="outline">
                              <Edit2 className="w-4 h-4 mr-2" />
                              Edit plan
                            </Button>
                            <Button variant="outline">
                              <BarChart3 className="w-4 h-4 mr-2" />
                              Simulate impact
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        {messages.length === 1 && (
          <div className="px-6 lg:px-8 pb-4">
            <div className="max-w-3xl mx-auto">
              <p className="text-sm text-muted-foreground mb-3">Quick actions</p>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action)}
                    className="action-chip"
                  >
                    <span>{action.icon}</span>
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-border bg-white p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Tell me what you want to optimise..."
                className="flex-1 h-12"
              />
              <Button onClick={handleSend} size="lg" className="h-12 px-6">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
