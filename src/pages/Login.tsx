import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sparkles, Shield, TrendingUp, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleDemoLogin = () => {
    login();
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 flex overflow-hidden">
      {/* Left side - Branding & Features */}
      <motion.div 
        className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <motion.div variants={itemVariants}>
          <motion.div 
            className="flex items-center gap-3 mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div 
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg"
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-3xl font-bold text-foreground">Selfin</span>
          </motion.div>
          <p className="text-muted-foreground text-lg">Your autonomous financial agent</p>
        </motion.div>
        
        {/* Features */}
        <motion.div 
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-6">
            <FeatureItem 
              icon={<TrendingUp className="w-5 h-5" />}
              title="AI-First Finance"
              description="Every insight leads to an action. Your money works while you sleep."
              delay={0}
            />
            <FeatureItem 
              icon={<Shield className="w-5 h-5" />}
              title="Trust by Design"
              description="Full transparency. Every decision explained. You stay in control."
              delay={0.1}
            />
            <FeatureItem 
              icon={<Zap className="w-5 h-5" />}
              title="Zero-Click Automation"
              description="Set your goals, define guardrails. Selfin handles the rest."
              delay={0.2}
            />
          </div>
        </motion.div>
        
        <motion.p 
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Trusted by forward-thinking individuals
        </motion.p>
      </motion.div>

      {/* Right side - Login Form */}
      <motion.div 
        className="flex-1 flex items-center justify-center p-8 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background gradient blur */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tl from-primary/5 via-transparent to-transparent"
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <motion.div 
          className="w-full max-w-md space-y-8 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div 
            className="text-center lg:text-left space-y-4"
            variants={itemVariants}
          >
            <motion.div 
              className="flex items-center gap-3 mb-6 lg:hidden justify-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold">Selfin</span>
            </motion.div>
            <motion.h1 className="text-display">Welcome back</motion.h1>
            <motion.p className="text-muted-foreground text-lg leading-relaxed">
              Your personal CFO is ready to optimize your finances and maximize your wealth.
            </motion.p>
          </motion.div>

          {/* CTA Button */}
          <motion.div 
            className="space-y-4"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={handleDemoLogin}
                className="w-full h-13 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg transition-shadow"
                size="lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Log in as Demo User
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="ml-2"
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </Button>
            </motion.div>
            
            <motion.p className="text-center text-sm text-muted-foreground">
              Experience the full product with a simulated financial profile
            </motion.p>
          </motion.div>

          {/* Divider */}
          <motion.div 
            className="relative"
            variants={itemVariants}
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/60"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gradient-to-b from-background via-background to-secondary/20 px-3 text-muted-foreground font-semibold">
                Or continue with
              </span>
            </div>
          </motion.div>

          {/* OAuth Buttons */}
          <motion.div 
            className="grid grid-cols-2 gap-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {['Google', 'Apple'].map((provider, idx) => (
              <motion.div
                key={provider}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant="outline" 
                  className="w-full h-11 font-medium hover:bg-secondary/50" 
                  disabled
                >
                  {provider}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer Text */}
          <motion.p 
            className="text-center text-xs text-muted-foreground"
            variants={itemVariants}
          >
            By continuing, you agree to our <span className="text-primary font-medium">Terms of Service</span> and <span className="text-primary font-medium">Privacy Policy</span>.
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}

function FeatureItem({ 
  icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ReactNode
  title: string
  description: string
  delay: number
}) {
  return (
    <motion.div 
      className="flex gap-4 group"
      variants={featureVariants}
      custom={delay}
    >
      <motion.div 
        className="w-11 h-11 rounded-lg bg-white shadow-md flex items-center justify-center text-primary flex-shrink-0"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {icon}
      </motion.div>
      <div className="space-y-1">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
