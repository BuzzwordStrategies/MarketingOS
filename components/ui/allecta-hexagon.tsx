'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AllectaHexagonProps {
  className?: string;
  animate?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Enhanced Allecta Hexagon Component
export const AllectaHexagon = ({ 
  className, 
  animate = true, 
  size = 'md' 
}: AllectaHexagonProps) => {
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
        rotateY: [0, 360],
        rotateX: [0, 15, 0],
        scale: [1, 1.05, 1]
      } : {}}
      transition={animate ? {
        rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
        rotateX: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
      } : {}}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{
          filter: 'drop-shadow(0 0 25px rgba(184, 134, 11, 0.6)) drop-shadow(0 0 50px rgba(205, 133, 63, 0.3))',
          transform: 'rotateX(10deg)'
        }}
      >
        <defs>
          {/* Enhanced gradients for depth */}
          <linearGradient id="allecta-main" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B8860B" />
            <stop offset="25%" stopColor="#CD853F" />
            <stop offset="50%" stopColor="#DAA520" />
            <stop offset="75%" stopColor="#B8860B" />
            <stop offset="100%" stopColor="#8B4513" />
          </linearGradient>
          
          <linearGradient id="allecta-highlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.1)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>
          
          <radialGradient id="allecta-glow" cx="50%" cy="30%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
            <stop offset="70%" stopColor="rgba(255, 255, 255, 0.2)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </radialGradient>

          {/* Shadow filter */}
          <filter id="inner-shadow">
            <feOffset dx="0" dy="2"/>
            <feGaussianBlur stdDeviation="2" result="offset-blur"/>
            <feFlood floodColor="#000000" floodOpacity="0.3"/>
            <feComposite in2="offset-blur" operator="in"/>
          </filter>
        </defs>
        
        {/* Base hexagon with depth */}
        <polygon
          points="50,8 82,26 82,62 50,80 18,62 18,26"
          fill="url(#allecta-main)"
          stroke="rgba(184, 134, 11, 0.8)"
          strokeWidth="1.5"
          filter="url(#inner-shadow)"
        />
        
        {/* Top face for 3D effect */}
        <polygon
          points="50,8 82,26 78,22 46,4"
          fill="rgba(218, 165, 32, 0.9)"
          stroke="rgba(184, 134, 11, 0.6)"
          strokeWidth="0.5"
        />
        
        {/* Right face for 3D effect */}
        <polygon
          points="82,26 82,62 78,58 78,22"
          fill="rgba(139, 69, 19, 0.7)"
          stroke="rgba(184, 134, 11, 0.4)"
          strokeWidth="0.5"
        />
        
        {/* Highlight overlay */}
        <polygon
          points="50,12 78,28 78,58 50,76 22,58 22,28"
          fill="url(#allecta-highlight)"
        />
        
        {/* Center glow */}
        <circle
          cx="50"
          cy="50"
          r="12"
          fill="url(#allecta-glow)"
          style={{ mixBlendMode: 'overlay' }}
        />
        
        {/* Animated edge glow */}
        {animate && (
          <motion.polygon
            points="50,8 82,26 82,62 50,80 18,62 18,26"
            fill="none"
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth="2"
            animate={{
              strokeOpacity: [0.3, 0.8, 0.3],
              strokeWidth: [1, 3, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
        
        {/* Sparkle effects */}
        {animate && (
          <>
            <motion.circle
              cx="35"
              cy="35"
              r="1.5"
              fill="rgba(255, 255, 255, 0.9)"
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 0
              }}
            />
            <motion.circle
              cx="65"
              cy="40"
              r="1"
              fill="rgba(255, 255, 255, 0.8)"
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.2, 0]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: 1
              }}
            />
            <motion.circle
              cx="50"
              cy="65"
              r="1.2"
              fill="rgba(255, 255, 255, 0.7)"
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.3, 0]
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                delay: 2
              }}
            />
          </>
        )}
      </svg>
    </motion.div>
  );
};

// Loading component with Allecta branding
interface AllectaHexagonLoaderProps {
  className?: string;
  message?: string;
}

export const AllectaHexagonLoader = ({ 
  className,
  message = "Loading..." 
}: AllectaHexagonLoaderProps) => {
  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <AllectaHexagon size="lg" animate={true} />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-sm text-gray-600 font-medium"
      >
        {message}
      </motion.p>
      
      {/* Animated dots with Allecta colors */}
      <div className="flex space-x-1 mt-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              background: 'linear-gradient(45deg, #B8860B, #CD853F)'
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    </div>
  );
};
