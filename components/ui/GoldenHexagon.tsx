'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GoldenHexagonProps {
  className?: string;
  animate?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const GoldenHexagon = ({ 
  className, 
  animate = true, 
  size = 'md' 
}: GoldenHexagonProps) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <motion.div
      className={cn('relative inline-block', sizes[size], className)}
      animate={animate ? {
        rotate: [0, 360],
        scale: [1, 1.1, 1]
      } : {}}
      transition={animate ? {
        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
      } : {}}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-2xl"
        style={{
          filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))'
        }}
      >
        <defs>
          <linearGradient id="golden-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="25%" stopColor="#FFA500" />
            <stop offset="50%" stopColor="#FFD700" />
            <stop offset="75%" stopColor="#FFFF00" />
            <stop offset="100%" stopColor="#FFA500" />
          </linearGradient>
          <linearGradient id="inner-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>
        </defs>
        
        {/* Outer Hexagon */}
        <polygon
          points="50,5 85,25 85,65 50,85 15,65 15,25"
          fill="url(#golden-gradient)"
          stroke="rgba(255, 255, 255, 0.5)"
          strokeWidth="1"
        />
        
        {/* Inner Hexagon with gradient overlay */}
        <polygon
          points="50,15 75,30 75,60 50,75 25,60 25,30"
          fill="url(#inner-gradient)"
        />
        
        {/* Center Glow */}
        <circle
          cx="50"
          cy="50"
          r="8"
          fill="rgba(255, 255, 255, 0.8)"
          style={{
            filter: 'blur(2px)'
          }}
        />
        
        {/* Animated Sparkles */}
        {animate && (
          <>
            <motion.circle
              cx="35"
              cy="35"
              r="1"
              fill="white"
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0
              }}
            />
            <motion.circle
              cx="65"
              cy="35"
              r="1"
              fill="white"
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5
              }}
            />
            <motion.circle
              cx="50"
              cy="70"
              r="1"
              fill="white"
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1
              }}
            />
          </>
        )}
      </svg>
    </motion.div>
  );
};

// Loading state component with Golden Hexagon
interface GoldenHexagonLoaderProps {
  className?: string;
  message?: string;
}

export const GoldenHexagonLoader = ({ 
  className,
  message = "Loading..." 
}: GoldenHexagonLoaderProps) => {
  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <GoldenHexagon size="lg" animate={true} />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-sm text-gray-600 font-medium"
      >
        {message}
      </motion.p>
      
      {/* Animated dots */}
      <div className="flex space-x-1 mt-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    </div>
  );
};
