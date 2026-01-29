import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        <motion.div className="flex-1 overflow-auto p-6 lg:p-8 space-y-6">
          <div className="max-w-4xl mx-auto space-y-5">
            <AnimatePresence mode="popLayout">
              {messages.map((message, idx) => (
                <motion.div
                  key={message.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    message.type === 'user' ? 'flex justify-end' : 'flex justify-start'
                  )}
                >
                  {message.type === 'user' ? (
                    <motion.div 
                      className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-2xl rounded-br-md px-5 py-3 max-w-md shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <p className="text-base leading-relaxed">{message.content}</p>
                    </motion.div>
                  ) : (
                    <motion.div className="space-y-4 max-w-2xl">
                      <motion.div className="flex gap-3">
                        <motion.div 
                          className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0"
                          animate={{ rotate: [0, 10, 0] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <Sparkles className="w-5 h-5 text-primary" />
                        </motion.div>
                        <motion.div className="flex-1 space-y-4">
                          <motion.p 
                            className="text-body leading-relaxed font-medium"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            {message.content}
                          </motion.p>
                          
                          {message.reasoning && (
                            <motion.button
                              onClick={() => setExpandedReasoning(
                                expandedReasoning === message.id ? null : message.id
                              )}
                              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                              whileHover={{ x: 5 }}
                            >
                              {expandedReasoning === message.id ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                              <span>View AI reasoning</span>
                            </motion.button>
                          )}
                          
                          <AnimatePresence>
                            {expandedReasoning === message.id && message.reasoning && (
                              <motion.div 
                                className="bg-secondary/60 rounded-lg p-4 text-sm text-muted-foreground border border-border/40"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                {message.reasoning}
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {message.actions && (
                            <motion.div 
                              className="space-y-3"
                              variants={{
                                visible: {
                                  transition: {
                                    staggerChildren: 0.1,
                                  },
                                },
                              }}
                              initial="hidden"
                              animate="visible"
                            >
                              {message.actions.map((action, index) => (
                                <motion.div
                                  key={action.id}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className={cn(
                                    "surface-card p-4 rounded-lg transition-all",
                                    action.approved && "bg-success/10 border-success/30"
                                  )}
                                  whileHover={{ y: -2 }}
                                >
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-3">
                                      <motion.span 
                                        className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0"
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                                      >
                                        {index + 1}
                                      </motion.span>
                                      <div>
                                        <p className="font-semibold text-foreground">{action.title}</p>
                                        <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
                                      </div>
                                    </div>
                                    {action.approved ? (
                                      <motion.div 
                                        className="flex items-center gap-2 text-success text-sm font-semibold"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200 }}
                                      >
                                        <motion.div
                                          animate={{ rotate: 360 }}
                                          transition={{ duration: 2, repeat: Infinity }}
                                        >
                                          <Check className="w-4 h-4" />
                                        </motion.div>
                                        <span>Approved</span>
                                      </motion.div>
                                    ) : (
                                      <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                      >
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => handleApproveAction(message.id, action.id)}
                                          className="font-medium"
                                        >
                                          Approve
                                        </Button>
                                      </motion.div>
                                    )}
                                  </div>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}

                          {message.impact && (
                            <motion.p 
                              className="text-sm font-semibold text-success"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3 }}
                            >
                              ✓ {message.impact}
                            </motion.p>
                          )}

                          {message.actions && message.actions.some(a => !a.approved) && (
                            <motion.div 
                              className="flex gap-2 pt-3"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.4 }}
                            >
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button 
                                  onClick={() => handleApproveAll(message.id)}
                                  className="font-medium bg-gradient-to-r from-primary to-primary/90 hover:shadow-md"
                                >
                                  Approve all
                                </Button>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button variant="outline" className="font-medium">
                                  <Edit2 className="w-4 h-4 mr-2" />
                                  Edit plan
                                </Button>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button variant="outline" className="font-medium">
                                  <BarChart3 className="w-4 h-4 mr-2" />
                                  Simulate
                                </Button>
                              </motion.div>
                            </motion.div>
                          )}
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Quick Actions */}
        {messages.length === 1 && (
          <motion.div 
            className="px-6 lg:px-8 pb-5 border-t border-border/40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="max-w-4xl mx-auto">
              <motion.p 
                className="text-sm text-muted-foreground font-semibold mb-4"
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Quick suggestions
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-3"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.08,
                    },
                  },
                }}
                initial="hidden"
                animate="visible"
              >
                {quickActions.map((action) => (
                  <motion.button
                    key={action.id}
                    onClick={() => handleQuickAction(action)}
                    className="action-chip"
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1 },
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-lg">{action.icon}</span>
                    <span>{action.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Input */}
        <motion.div 
          className="border-t border-border/40 bg-white/80 backdrop-filter backdrop-blur-xl p-4 sticky bottom-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              <motion.div className="flex-1" whileFocus={{ scale: 1.02 }}>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="What would you like to optimize?"
                  className="flex-1 h-12 font-medium"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button onClick={handleSend} size="lg" className="h-12 px-6 bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg font-medium">
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Send className="w-4 h-4" />
                  </motion.div>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
