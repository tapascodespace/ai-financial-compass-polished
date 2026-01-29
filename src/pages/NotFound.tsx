import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, AlertCircle, ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
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

  return (
    <motion.div 
      className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background via-background to-secondary/20 overflow-hidden relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background animation */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(214, 88, 55, 0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(214, 88, 55, 0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(214, 88, 55, 0.05) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div 
        className="text-center relative z-10 max-w-md mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Icon */}
        <motion.div 
          className="mb-8 flex justify-center"
          variants={itemVariants}
        >
          <motion.div
            className="w-24 h-24 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, -5, 5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <AlertCircle className="w-12 h-12 text-destructive" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* 404 Text */}
        <motion.div variants={itemVariants} className="mb-4">
          <motion.h1 
            className="text-8xl md:text-9xl font-bold text-foreground tracking-tighter"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            404
          </motion.h1>
        </motion.div>

        {/* Title */}
        <motion.div variants={itemVariants} className="mb-3">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Page Not Found</h2>
        </motion.div>

        {/* Description */}
        <motion.p 
          variants={itemVariants}
          className="text-lg text-muted-foreground mb-8 leading-relaxed"
        >
          The page you're looking for doesn't exist. Let's get you back on track.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={() => navigate('/home')}
              className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg font-semibold px-8 h-12"
            >
              <Home className="w-5 h-5 mr-2" />
              Go to Dashboard
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="ml-2"
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="w-full sm:w-auto font-semibold px-8 h-12"
            >
              Back to Home
            </Button>
          </motion.div>
        </motion.div>

        {/* Request Path Display */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 p-4 rounded-lg bg-secondary/50 border border-border/40"
        >
          <p className="text-xs text-muted-foreground font-mono break-all">
            Route not found: <span className="text-destructive font-semibold">{location.pathname}</span>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;
