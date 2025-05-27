'use client'

import React, { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion'

// Finger-tracking button with glow effect
interface PremiumButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'success' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export const PremiumButton: React.FC<PremiumButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ...props 
}) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    x.set(event.clientX - rect.left)
    y.set(event.clientY - rect.top)
  }

  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
    secondary: 'bg-gradient-to-r from-gray-600 to-gray-700 text-white',
    success: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white',
    danger: 'bg-gradient-to-r from-red-600 to-pink-600 text-white'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <motion.button
      className={`relative overflow-hidden rounded-lg ${variants[variant]} ${sizes[size]} font-medium shadow-lg transition-all duration-200 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      disabled={disabled}
      {...props}
    >
      {/* Glow effect that follows finger */}
      <AnimatePresence>
        {isHovered && !disabled && (
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{
              background: `radial-gradient(100px circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, transparent 70%)`
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={isHovered && !disabled ? { x: '200%' } : { x: '-100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

// Revenue counter with smooth animations
interface RevenueCounterProps {
  value: number
  previousValue?: number
  currency?: string
  className?: string
}

export const RevenueCounter: React.FC<RevenueCounterProps> = ({ 
  value, 
  previousValue = 0, 
  currency = '$',
  className = ''
}) => {
  const springValue = useSpring(value, { stiffness: 100, damping: 30 })
  const displayValue = useTransform(springValue, (v) => `${currency}${Math.round(v).toLocaleString()}`)
  
  return (
    <div className={`flex items-center ${className}`}>
      <motion.div className="text-4xl font-bold text-green-600">
        <motion.span>{displayValue}</motion.span>
      </motion.div>
      
      <AnimatePresence>
        {value > previousValue && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="ml-3 flex items-center text-green-400"
          >
            <motion.span
              className="text-sm font-medium"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.3 }}
            >
              ↗ +{currency}{(value - previousValue).toLocaleString()}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Predictive loading states
interface PredictiveLoaderProps {
  taskType: string
  estimatedDuration: number
  progress?: number
  className?: string
}

export const PredictiveLoader: React.FC<PredictiveLoaderProps> = ({ 
  taskType, 
  estimatedDuration, 
  progress: externalProgress,
  className = ''
}) => {
  const [internalProgress, setInternalProgress] = useState(0)
  const progress = externalProgress ?? internalProgress
  const progressSpring = useSpring(progress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    if (externalProgress !== undefined) return

    // Simulate realistic progress based on task type
    const intervals = [0.1, 0.3, 0.6, 0.8, 0.95, 1.0]
    const timings = intervals.map(p => p * estimatedDuration)
    
    const timeouts = timings.map((time, index) => 
      setTimeout(() => setInternalProgress(intervals[index]), time)
    )

    return () => timeouts.forEach(clearTimeout)
  }, [estimatedDuration, externalProgress])

  const getTaskMessage = (progress: number) => {
    if (progress < 0.2) return `Initializing ${taskType}...`
    if (progress < 0.5) return `Processing ${taskType}...`
    if (progress < 0.8) return `Optimizing ${taskType}...`
    if (progress < 1) return `Finalizing ${taskType}...`
    return `${taskType} completed!`
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex justify-between items-center">
        <motion.span 
          className="text-sm font-medium text-gray-700"
          key={getTaskMessage(progress)}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {getTaskMessage(progress)}
        </motion.span>
        <motion.span 
          className="text-sm text-gray-500"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {Math.round(progress * 100)}%
        </motion.span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <motion.div
          className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 relative origin-left"
          style={{ scaleX: progressSpring }}
        >
          {/* Shimmer effect on progress bar */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      </div>
      
      {/* Estimated time remaining */}
      <motion.div 
        className="text-xs text-gray-400 text-center"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {progress < 1 ? 
          `~${Math.round((1 - progress) * estimatedDuration / 1000)}s remaining` : 
          'Complete!'
        }
      </motion.div>
    </div>
  )
}

// Floating action button with magnetic effect
interface FloatingActionButtonProps {
  children: React.ReactNode
  onClick: () => void
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  className?: string
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  children,
  onClick,
  position = 'bottom-right',
  className = ''
}) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)

  const positions = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  }

  return (
    <motion.button
      className={`fixed ${positions[position]} w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white z-50 ${className}`}
      style={{ x, y }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
    >
      <motion.div
        animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
      
      {/* Pulse effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-blue-400"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.button>
  )
}

// Notification toast with slide-in animation
interface NotificationToastProps {
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  message,
  type = 'info',
  isVisible,
  onClose,
  duration = 5000
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  const variants = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-black',
    info: 'bg-blue-500 text-white'
  }

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className={`fixed top-4 right-4 ${variants[type]} px-6 py-4 rounded-lg shadow-lg z-50 flex items-center space-x-3 max-w-md`}
        >
          <span className="text-lg">{icons[type]}</span>
          <span className="font-medium">{message}</span>
          <button
            onClick={onClose}
            className="ml-auto text-lg hover:opacity-70 transition-opacity"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
