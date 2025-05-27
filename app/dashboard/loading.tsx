'use client';

import { motion } from 'framer-motion';
import { GoldenHexagonLoader } from '@/components/ui/GoldenHexagon';

const LoadingStep = ({ text, delay }: { text: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="flex items-center justify-center"
  >
    <motion.div
      className="w-2 h-2 bg-green-500 rounded-full mr-3"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 1, repeat: Infinity, delay }}
    />
    {text}
  </motion.div>
);

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <GoldenHexagonLoader 
          message="Initializing your marketing command center..."
          className="mb-8"
        />
        
        {/* Loading Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="space-y-2 text-sm text-gray-600"
        >
          <LoadingStep text="Connecting to revenue streams..." delay={0} />
          <LoadingStep text="Analyzing competitor intelligence..." delay={0.5} />
          <LoadingStep text="Optimizing campaign performance..." delay={1} />
          <LoadingStep text="Preparing your dashboard..." delay={1.5} />
        </motion.div>
      </motion.div>
    </div>
  );
}
