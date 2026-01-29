import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sparkles, Shield, TrendingUp, Zap } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleDemoLogin = () => {
    login();
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/5 to-primary/10 p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-semibold text-foreground">Selfin</span>
          </div>
          <p className="text-muted-foreground">Your autonomous financial agent</p>
        </div>
        
        <div className="space-y-8">
          <div className="space-y-6">
            <FeatureItem 
              icon={<TrendingUp className="w-5 h-5" />}
              title="AI-First Finance"
              description="Every insight leads to an action. Your money works while you sleep."
            />
            <FeatureItem 
              icon={<Shield className="w-5 h-5" />}
              title="Trust by Design"
              description="Full transparency. Every decision explained. You stay in control."
            />
            <FeatureItem 
              icon={<Zap className="w-5 h-5" />}
              title="Zero-Click Automation"
              description="Set your goals, define guardrails. Selfin handles the rest."
            />
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Trusted by forward-thinking individuals
        </p>
      </div>

      {/* Right side - Login */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          <div className="text-center lg:text-left">
            <div className="flex items-center gap-2 mb-6 lg:hidden justify-center">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-2xl font-semibold">Selfin</span>
            </div>
            <h1 className="text-display mb-3">Welcome back</h1>
            <p className="text-muted-foreground text-lg">
              Your personal CFO is ready to optimize your finances.
            </p>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={handleDemoLogin}
              className="w-full h-12 text-base font-medium"
              size="lg"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Log in as Demo User
            </Button>
            
            <p className="text-center text-sm text-muted-foreground">
              Experience the full product with a simulated financial profile
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-11" disabled>
              Google
            </Button>
            <Button variant="outline" className="h-11" disabled>
              Apple
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-lg bg-white shadow-soft flex items-center justify-center text-primary flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
