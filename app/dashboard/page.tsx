'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth/auth-context';
import { GoldenHexagon } from '@/components/ui/GoldenHexagon';
import { PremiumButton } from '@/components/ui/PremiumAnimations';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, userProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    // Simulate loading dashboard data
    const loadDashboardData = async () => {
      // This would fetch real data from your API
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    loadDashboardData();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                className="h-64 bg-white/50 rounded-xl animate-pulse"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center">
            <GoldenHexagon size="md" className="mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome to MarketingOS
              </h1>
              <p className="text-gray-600 mt-1">
                {user?.email || 'Marketing Professional'}
              </p>
            </div>
          </div>
          
          <PremiumButton
            onClick={handleSignOut}
            variant="secondary"
            size="sm"
          >
            Sign Out
          </PremiumButton>
        </motion.div>

        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl mb-8"
        >
          <div className="text-center">
            <GoldenHexagon size="xl" className="mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🎉 Authentication Successful!
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              You've successfully accessed the MarketingOS dashboard. This is the foundation 
              for your complete marketing automation platform. The golden hexagon above 
              represents your gateway to unlimited marketing power.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl">🚀</span>
                </div>
                <h3 className="font-semibold text-gray-900">One-Click Campaigns</h3>
                <p className="text-sm text-gray-600 mt-1">Launch complete marketing campaigns instantly</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl">📊</span>
                </div>
                <h3 className="font-semibold text-gray-900">Revenue Attribution</h3>
                <p className="text-sm text-gray-600 mt-1">Track every dollar back to its source</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl">⚔️</span>
                </div>
                <h3 className="font-semibold text-gray-900">Competitor Intelligence</h3>
                <p className="text-sm text-gray-600 mt-1">Real-time insights into competitor strategies</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Authentication</p>
                <p className="text-2xl font-bold text-green-600">✓ Active</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-xl">🔐</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Dashboard</p>
                <p className="text-2xl font-bold text-blue-600">✓ Ready</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">📱</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Golden Hexagon</p>
                <p className="text-2xl font-bold text-yellow-600">✓ Active</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <GoldenHexagon size="sm" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/80 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Phase 2</p>
                <p className="text-2xl font-bold text-purple-600">✓ Complete</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-xl">🎯</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white mt-8"
        >
          <h3 className="text-2xl font-bold mb-4">🚀 Phase 2 Complete!</h3>
          <p className="text-blue-100 mb-6">
            You've successfully implemented the complete authentication and dashboard entry experience. 
            The foundation is now set for building the full MarketingOS platform with AI-powered workflows, 
            revenue attribution, and competitor intelligence.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">✅ Completed</h4>
              <ul className="text-sm text-blue-100 space-y-1">
                <li>• Premium login page with Golden Hexagon</li>
                <li>• Magic link & social authentication</li>
                <li>• Protected dashboard routes</li>
                <li>• Loading states & animations</li>
                <li>• Brand identity integration</li>
              </ul>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">🔮 Coming Next</h4>
              <ul className="text-sm text-blue-100 space-y-1">
                <li>• AI workflow execution engine</li>
                <li>• Revenue attribution dashboard</li>
                <li>• Competitor intelligence feeds</li>
                <li>• One-click campaign launcher</li>
                <li>• Service tier billing system</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
