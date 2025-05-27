'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { workflowEngine, WorkflowDefinition } from '@/lib/workflows/workflow-engine';
import { AllectaHexagon } from '@/components/ui/allecta-hexagon';
import { useRouter } from 'next/navigation';
import { 
  Clock, 
  Target, 
  DollarSign, 
  Zap, 
  TrendingUp, 
  Users, 
  BarChart3,
  Rocket,
  Sword,
  Flame,
  RotateCcw,
  PiggyBank,
  ChevronRight,
  Star,
  Filter,
  Search
} from 'lucide-react';

const categoryIcons = {
  launch: Rocket,
  growth: TrendingUp,
  competitive: Sword,
  content: Flame,
  analytics: BarChart3
};

const difficultyColors = {
  beginner: 'text-green-400 bg-green-400/10 border-green-400/20',
  intermediate: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  advanced: 'text-red-400 bg-red-400/10 border-red-400/20'
};

const categoryColors = {
  launch: 'from-blue-500 to-purple-600',
  growth: 'from-green-500 to-teal-600',
  competitive: 'from-red-500 to-orange-600',
  content: 'from-pink-500 to-rose-600',
  analytics: 'from-indigo-500 to-blue-600'
};

interface WorkflowCardProps {
  workflow: WorkflowDefinition;
  onLaunch: (workflowId: string) => void;
  isLocked?: boolean;
}

const WorkflowCard = ({ workflow, onLaunch, isLocked = false }: WorkflowCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const CategoryIcon = categoryIcons[workflow.category];

  return (
    <motion.div
      className="relative group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className={`
        relative overflow-hidden rounded-2xl border border-white/10 
        bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl
        ${isLocked ? 'opacity-60' : ''}
      `}>
        {/* Background gradient overlay */}
        <div className={`
          absolute inset-0 bg-gradient-to-br ${categoryColors[workflow.category]} 
          opacity-0 group-hover:opacity-10 transition-opacity duration-500
        `} />
        
        {/* Lock overlay for premium workflows */}
        {isLocked && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
              <p className="text-sm text-white/80 font-medium">Premium Workflow</p>
              <p className="text-xs text-white/60">Upgrade to unlock</p>
            </div>
          </div>
        )}

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`
                w-12 h-12 rounded-xl bg-gradient-to-br ${categoryColors[workflow.category]}
                flex items-center justify-center text-white text-xl
              `}>
                {workflow.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                  {workflow.name}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <CategoryIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400 capitalize">{workflow.category}</span>
                </div>
              </div>
            </div>
            
            <div className={`
              px-2 py-1 rounded-lg border text-xs font-medium capitalize
              ${difficultyColors[workflow.difficulty]}
            `}>
              {workflow.difficulty}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm mb-6 leading-relaxed">
            {workflow.description}
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Target className="w-4 h-4 text-blue-400 mr-1" />
                <span className="text-lg font-bold text-white">{workflow.estimatedTasks}</span>
              </div>
              <p className="text-xs text-gray-400">Tasks</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Clock className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-sm font-bold text-white">{workflow.estimatedTime}</span>
              </div>
              <p className="text-xs text-gray-400">Duration</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <DollarSign className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-xs font-bold text-white">{workflow.potentialRevenue}</span>
              </div>
              <p className="text-xs text-gray-400">Revenue</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {workflow.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300"
              >
                {tag}
              </span>
            ))}
            {workflow.tags.length > 3 && (
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400">
                +{workflow.tags.length - 3} more
              </span>
            )}
          </div>

          {/* Preview Steps (on hover) */}
          <AnimatePresence>
            {isHovered && !isLocked && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 overflow-hidden"
              >
                <div className="border-t border-white/10 pt-4">
                  <p className="text-xs text-gray-400 mb-2">Workflow Steps Preview:</p>
                  <div className="space-y-1">
                    {workflow.steps.slice(0, 3).map((step, index) => (
                      <div key={step.id} className="flex items-center text-xs text-gray-300">
                        <div className="w-1 h-1 bg-blue-400 rounded-full mr-2" />
                        <span className="truncate">{step.name}</span>
                      </div>
                    ))}
                    {workflow.steps.length > 3 && (
                      <div className="flex items-center text-xs text-gray-400">
                        <div className="w-1 h-1 bg-gray-500 rounded-full mr-2" />
                        <span>+{workflow.steps.length - 3} more steps</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Launch Button */}
          <motion.button
            onClick={() => !isLocked && onLaunch(workflow.id)}
            disabled={isLocked}
            className={`
              w-full py-3 px-4 rounded-xl font-medium transition-all duration-200
              flex items-center justify-center space-x-2
              ${isLocked 
                ? 'bg-gray-600/20 text-gray-400 cursor-not-allowed' 
                : `bg-gradient-to-r ${categoryColors[workflow.category]} text-white hover:shadow-lg hover:shadow-blue-500/25`
              }
            `}
            whileHover={!isLocked ? { scale: 1.02 } : {}}
            whileTap={!isLocked ? { scale: 0.98 } : {}}
          >
            <Zap className="w-4 h-4" />
            <span>{isLocked ? 'Upgrade to Launch' : 'Launch Workflow'}</span>
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<WorkflowDefinition[]>([]);
  const [filteredWorkflows, setFilteredWorkflows] = useState<WorkflowDefinition[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [userTier] = useState<'free' | 'starter' | 'pro' | 'enterprise'>('free'); // Mock user tier
  const router = useRouter();

  useEffect(() => {
    const allWorkflows = workflowEngine.getWorkflows();
    setWorkflows(allWorkflows);
    setFilteredWorkflows(allWorkflows);
  }, []);

  useEffect(() => {
    let filtered = workflows;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(w => w.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(w => 
        w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredWorkflows(filtered);
  }, [workflows, selectedCategory, searchQuery]);

  const handleLaunchWorkflow = (workflowId: string) => {
    router.push(`/dashboard/workflows/${workflowId}/setup`);
  };

  const isWorkflowLocked = (workflow: WorkflowDefinition): boolean => {
    // Mock tier restrictions
    if (userTier === 'free') {
      return workflow.difficulty === 'advanced' || workflow.category === 'competitive';
    }
    return false;
  };

  const categories = [
    { id: 'all', name: 'All Workflows', icon: BarChart3 },
    { id: 'launch', name: 'Product Launch', icon: Rocket },
    { id: 'growth', name: 'Growth', icon: TrendingUp },
    { id: 'competitive', name: 'Competitive', icon: Sword },
    { id: 'content', name: 'Content', icon: Flame },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <AllectaHexagon className="w-12 h-12 mr-4" />
            <h1 className="text-4xl font-bold text-white">AI Workflow Engine</h1>
          </div>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Launch sophisticated marketing campaigns with one click. 
            Each workflow orchestrates 20+ AI agents to deliver complete marketing solutions.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">{workflows.length}</p>
                <p className="text-sm text-gray-400">Available Workflows</p>
              </div>
              <Zap className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">140+</p>
                <p className="text-sm text-gray-400">Total AI Tasks</p>
              </div>
              <Target className="w-8 h-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">$200K+</p>
                <p className="text-sm text-gray-400">Revenue Potential</p>
              </div>
              <DollarSign className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">95%</p>
                <p className="text-sm text-gray-400">Success Rate</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search workflows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap
                    ${selectedCategory === category.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Workflows Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {filteredWorkflows.map((workflow, index) => (
            <motion.div
              key={workflow.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <WorkflowCard
                workflow={workflow}
                onLaunch={handleLaunchWorkflow}
                isLocked={isWorkflowLocked(workflow)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredWorkflows.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No workflows found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
