'use client';

export interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  ai: 'claude' | 'gpt4' | 'gemini' | 'grok';
  duration: number; // seconds
  category: 'strategy' | 'creative' | 'technical' | 'analysis' | 'execution';
  outputs: string[];
  dependencies?: string[];
}

export interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  category: 'launch' | 'growth' | 'competitive' | 'content' | 'analytics';
  estimatedTasks: number;
  estimatedTime: string;
  potentialRevenue: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  steps: WorkflowStep[];
  tags: string[];
  icon: string;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  userId: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'paused';
  progress: number; // 0-100
  currentStepId?: string;
  startedAt: Date;
  completedAt?: Date;
  results: Record<string, any>;
  attribution: {
    estimatedRevenue: number;
    confidence: number;
    channels: Array<{
      name: string;
      contribution: number;
      revenue: number;
    }>;
  };
}

export interface WorkflowParams {
  productName?: string;
  industry?: string;
  targetAudience?: string;
  budget?: number;
  timeline?: string;
  competitors?: string[];
  goals?: string[];
  customInputs?: Record<string, any>;
}

export class WorkflowEngine {
  private static instance: WorkflowEngine;
  private executions: Map<string, WorkflowExecution> = new Map();
  private listeners: Map<string, (execution: WorkflowExecution) => void> = new Map();

  static getInstance(): WorkflowEngine {
    if (!WorkflowEngine.instance) {
      WorkflowEngine.instance = new WorkflowEngine();
    }
    return WorkflowEngine.instance;
  }

  // Core workflow definitions
  workflows: Record<string, WorkflowDefinition> = {
    productLaunch: {
      id: 'productLaunch',
      name: 'Product Launch Campaign',
      description: 'Complete go-to-market strategy with 30+ coordinated tasks across all channels',
      category: 'launch',
      estimatedTasks: 32,
      estimatedTime: '2-3 hours',
      potentialRevenue: '$15,000-50,000',
      difficulty: 'intermediate',
      icon: '🚀',
      tags: ['launch', 'strategy', 'multi-channel', 'automation'],
      steps: [
        {
          id: 'market-research',
          name: 'AI Market Research',
          description: 'Deep market analysis and competitor intelligence',
          ai: 'claude',
          duration: 180,
          category: 'analysis',
          outputs: ['Market Analysis Report', 'Competitor Landscape', 'Opportunity Matrix'],
          dependencies: []
        },
        {
          id: 'strategy-generation',
          name: 'AI Strategy Generation',
          description: 'Comprehensive go-to-market strategy development',
          ai: 'claude',
          duration: 240,
          category: 'strategy',
          outputs: ['GTM Strategy', 'Positioning Framework', 'Messaging Architecture'],
          dependencies: ['market-research']
        },
        {
          id: 'creative-assets',
          name: 'Creative Asset Generation',
          description: 'AI-powered creative content across all formats',
          ai: 'gpt4',
          duration: 300,
          category: 'creative',
          outputs: ['Ad Creatives', 'Social Media Assets', 'Email Templates', 'Landing Page Copy'],
          dependencies: ['strategy-generation']
        },
        {
          id: 'landing-page',
          name: 'Landing Page Creation',
          description: 'High-converting landing page with A/B test variants',
          ai: 'claude',
          duration: 360,
          category: 'technical',
          outputs: ['Landing Page HTML', 'A/B Test Variants', 'Conversion Optimization'],
          dependencies: ['creative-assets']
        },
        {
          id: 'email-sequences',
          name: 'Email Marketing Automation',
          description: 'Multi-touch email sequences for different segments',
          ai: 'gpt4',
          duration: 200,
          category: 'execution',
          outputs: ['Welcome Series', 'Nurture Sequences', 'Conversion Campaigns'],
          dependencies: ['creative-assets']
        },
        {
          id: 'social-campaigns',
          name: 'Social Media Campaigns',
          description: 'Platform-specific campaigns with scheduling',
          ai: 'gpt4',
          duration: 180,
          category: 'execution',
          outputs: ['Facebook Campaigns', 'LinkedIn Campaigns', 'Twitter Campaigns', 'Instagram Content'],
          dependencies: ['creative-assets']
        },
        {
          id: 'pr-outreach',
          name: 'PR & Influencer Outreach',
          description: 'Media outreach and influencer partnership campaigns',
          ai: 'claude',
          duration: 240,
          category: 'execution',
          outputs: ['Press Release', 'Media List', 'Influencer Outreach', 'Partnership Proposals'],
          dependencies: ['strategy-generation']
        },
        {
          id: 'analytics-setup',
          name: 'Analytics & Attribution Setup',
          description: 'Comprehensive tracking and attribution configuration',
          ai: 'gemini',
          duration: 120,
          category: 'technical',
          outputs: ['Analytics Dashboard', 'Attribution Model', 'KPI Framework'],
          dependencies: ['landing-page']
        }
      ]
    },

    competitorDestruction: {
      id: 'competitorDestruction',
      name: 'Competitor Conquest Campaign',
      description: 'Strategic campaign to capture competitor market share with precision targeting',
      category: 'competitive',
      estimatedTasks: 28,
      estimatedTime: '1.5-2 hours',
      potentialRevenue: '$25,000-75,000',
      difficulty: 'advanced',
      icon: '⚔️',
      tags: ['competitive', 'conquest', 'targeting', 'intelligence'],
      steps: [
        {
          id: 'competitor-intelligence',
          name: 'Deep Competitor Intelligence',
          description: 'Comprehensive analysis of competitor strategies and weaknesses',
          ai: 'claude',
          duration: 300,
          category: 'analysis',
          outputs: ['Competitor SWOT', 'Weakness Analysis', 'Opportunity Map', 'Pricing Intelligence'],
          dependencies: []
        },
        {
          id: 'conquest-strategy',
          name: 'Conquest Strategy Development',
          description: 'Strategic framework for market share capture',
          ai: 'claude',
          duration: 240,
          category: 'strategy',
          outputs: ['Conquest Framework', 'Differentiation Strategy', 'Value Proposition'],
          dependencies: ['competitor-intelligence']
        },
        {
          id: 'audience-poaching',
          name: 'Audience Poaching Campaigns',
          description: 'Precision targeting of competitor audiences',
          ai: 'gpt4',
          duration: 180,
          category: 'execution',
          outputs: ['Lookalike Audiences', 'Competitor Keyword Campaigns', 'Retargeting Setup'],
          dependencies: ['conquest-strategy']
        },
        {
          id: 'comparison-content',
          name: 'Comparison Content Creation',
          description: 'Strategic comparison content highlighting advantages',
          ai: 'gpt4',
          duration: 200,
          category: 'creative',
          outputs: ['Comparison Charts', 'Battle Cards', 'Competitive Landing Pages'],
          dependencies: ['conquest-strategy']
        },
        {
          id: 'switching-campaigns',
          name: 'Customer Switching Campaigns',
          description: 'Campaigns designed to convert competitor customers',
          ai: 'claude',
          duration: 220,
          category: 'execution',
          outputs: ['Switch Incentives', 'Migration Guides', 'Onboarding Sequences'],
          dependencies: ['comparison-content']
        }
      ]
    },

    viralContent: {
      id: 'viralContent',
      name: 'Viral Content Engine',
      description: 'AI-powered viral content creation with trend analysis and optimization',
      category: 'content',
      estimatedTasks: 24,
      estimatedTime: '1-2 hours',
      potentialRevenue: '$5,000-25,000',
      difficulty: 'beginner',
      icon: '🔥',
      tags: ['viral', 'content', 'social', 'trends'],
      steps: [
        {
          id: 'trend-analysis',
          name: 'Viral Trend Analysis',
          description: 'Real-time analysis of trending topics and viral patterns',
          ai: 'gemini',
          duration: 120,
          category: 'analysis',
          outputs: ['Trend Report', 'Viral Patterns', 'Opportunity Windows'],
          dependencies: []
        },
        {
          id: 'content-ideation',
          name: 'Viral Content Ideation',
          description: 'AI-generated content ideas optimized for virality',
          ai: 'gpt4',
          duration: 180,
          category: 'creative',
          outputs: ['Content Ideas', 'Hook Variations', 'Format Recommendations'],
          dependencies: ['trend-analysis']
        },
        {
          id: 'content-creation',
          name: 'Multi-Format Content Creation',
          description: 'Creation of content across all major platforms',
          ai: 'gpt4',
          duration: 240,
          category: 'creative',
          outputs: ['TikTok Scripts', 'Instagram Reels', 'YouTube Shorts', 'Twitter Threads'],
          dependencies: ['content-ideation']
        },
        {
          id: 'optimization',
          name: 'Viral Optimization',
          description: 'Optimization for maximum reach and engagement',
          ai: 'claude',
          duration: 150,
          category: 'strategy',
          outputs: ['Posting Schedule', 'Hashtag Strategy', 'Engagement Tactics'],
          dependencies: ['content-creation']
        }
      ]
    },

    customerRetention: {
      id: 'customerRetention',
      name: 'Customer Retention Mastery',
      description: 'Comprehensive retention strategy with predictive churn prevention',
      category: 'growth',
      estimatedTasks: 26,
      estimatedTime: '2-2.5 hours',
      potentialRevenue: '$20,000-60,000',
      difficulty: 'intermediate',
      icon: '🔄',
      tags: ['retention', 'churn', 'loyalty', 'automation'],
      steps: [
        {
          id: 'churn-analysis',
          name: 'Predictive Churn Analysis',
          description: 'AI-powered churn prediction and risk scoring',
          ai: 'gemini',
          duration: 200,
          category: 'analysis',
          outputs: ['Churn Model', 'Risk Scores', 'Trigger Events'],
          dependencies: []
        },
        {
          id: 'retention-strategy',
          name: 'Retention Strategy Framework',
          description: 'Comprehensive strategy for customer retention',
          ai: 'claude',
          duration: 180,
          category: 'strategy',
          outputs: ['Retention Framework', 'Intervention Strategies', 'Success Metrics'],
          dependencies: ['churn-analysis']
        },
        {
          id: 'loyalty-programs',
          name: 'Loyalty Program Design',
          description: 'AI-optimized loyalty and rewards programs',
          ai: 'claude',
          duration: 220,
          category: 'strategy',
          outputs: ['Loyalty Structure', 'Reward Mechanisms', 'Gamification Elements'],
          dependencies: ['retention-strategy']
        },
        {
          id: 'win-back-campaigns',
          name: 'Win-Back Campaigns',
          description: 'Automated campaigns to re-engage churned customers',
          ai: 'gpt4',
          duration: 160,
          category: 'execution',
          outputs: ['Win-Back Sequences', 'Incentive Offers', 'Personalized Messaging'],
          dependencies: ['retention-strategy']
        }
      ]
    },

    revenueOptimization: {
      id: 'revenueOptimization',
      name: 'Revenue Optimization Engine',
      description: 'AI-driven revenue optimization across all touchpoints and funnels',
      category: 'analytics',
      estimatedTasks: 30,
      estimatedTime: '2.5-3 hours',
      potentialRevenue: '$30,000-100,000',
      difficulty: 'advanced',
      icon: '💰',
      tags: ['revenue', 'optimization', 'conversion', 'analytics'],
      steps: [
        {
          id: 'revenue-audit',
          name: 'Comprehensive Revenue Audit',
          description: 'Deep analysis of all revenue streams and opportunities',
          ai: 'gemini',
          duration: 240,
          category: 'analysis',
          outputs: ['Revenue Analysis', 'Opportunity Matrix', 'Bottleneck Identification'],
          dependencies: []
        },
        {
          id: 'pricing-optimization',
          name: 'AI Pricing Optimization',
          description: 'Dynamic pricing strategy with elasticity analysis',
          ai: 'claude',
          duration: 200,
          category: 'strategy',
          outputs: ['Pricing Strategy', 'Elasticity Model', 'A/B Test Framework'],
          dependencies: ['revenue-audit']
        },
        {
          id: 'funnel-optimization',
          name: 'Conversion Funnel Optimization',
          description: 'End-to-end funnel optimization with AI insights',
          ai: 'claude',
          duration: 220,
          category: 'strategy',
          outputs: ['Funnel Analysis', 'Optimization Roadmap', 'Conversion Tactics'],
          dependencies: ['revenue-audit']
        },
        {
          id: 'upsell-automation',
          name: 'Upsell & Cross-sell Automation',
          description: 'Intelligent upselling and cross-selling campaigns',
          ai: 'gpt4',
          duration: 180,
          category: 'execution',
          outputs: ['Upsell Sequences', 'Product Recommendations', 'Timing Optimization'],
          dependencies: ['pricing-optimization']
        }
      ]
    }
  };

  // Get all available workflows
  getWorkflows(): WorkflowDefinition[] {
    return Object.values(this.workflows);
  }

  // Get workflow by ID
  getWorkflow(id: string): WorkflowDefinition | undefined {
    return this.workflows[id];
  }

  // Execute a workflow
  async executeWorkflow(
    workflowId: string, 
    params: WorkflowParams,
    userId: string
  ): Promise<string> {
    const workflow = this.getWorkflow(workflowId);
    if (!workflow) {
      throw new Error(`Workflow ${workflowId} not found`);
    }

    const executionId = `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const execution: WorkflowExecution = {
      id: executionId,
      workflowId,
      userId,
      status: 'running',
      progress: 0,
      startedAt: new Date(),
      results: {},
      attribution: {
        estimatedRevenue: 0,
        confidence: 0,
        channels: []
      }
    };

    this.executions.set(executionId, execution);
    
    // Start execution in background
    this.runWorkflowExecution(execution, workflow, params);
    
    return executionId;
  }

  // Get execution status
  getExecution(executionId: string): WorkflowExecution | undefined {
    return this.executions.get(executionId);
  }

  // Subscribe to execution updates
  subscribeToExecution(
    executionId: string, 
    callback: (execution: WorkflowExecution) => void
  ): () => void {
    this.listeners.set(executionId, callback);
    
    return () => {
      this.listeners.delete(executionId);
    };
  }

  // Private method to run workflow execution
  private async runWorkflowExecution(
    execution: WorkflowExecution,
    workflow: WorkflowDefinition,
    params: WorkflowParams
  ): Promise<void> {
    try {
      const totalSteps = workflow.steps.length;
      
      for (let i = 0; i < workflow.steps.length; i++) {
        const step = workflow.steps[i];
        
        // Update current step
        execution.currentStepId = step.id;
        execution.progress = Math.round((i / totalSteps) * 100);
        this.notifyListeners(execution);

        // Simulate step execution with realistic timing
        await this.executeStep(step, params, execution);
        
        // Update progress
        execution.progress = Math.round(((i + 1) / totalSteps) * 100);
        this.notifyListeners(execution);
      }

      // Complete execution
      execution.status = 'completed';
      execution.completedAt = new Date();
      execution.currentStepId = undefined;
      
      // Calculate final attribution
      this.calculateAttribution(execution, workflow, params);
      
      this.notifyListeners(execution);
      
    } catch (error) {
      execution.status = 'failed';
      execution.completedAt = new Date();
      this.notifyListeners(execution);
    }
  }

  // Execute individual step (mock implementation)
  private async executeStep(
    step: WorkflowStep,
    params: WorkflowParams,
    execution: WorkflowExecution
  ): Promise<void> {
    // Simulate realistic execution time
    const executionTime = step.duration * 1000; // Convert to milliseconds
    
    await new Promise(resolve => setTimeout(resolve, executionTime));
    
    // Generate mock results based on step type
    const results = this.generateStepResults(step, params);
    execution.results[step.id] = results;
  }

  // Generate realistic mock results for each step
  private generateStepResults(step: WorkflowStep, params: WorkflowParams): any {
    const productName = params.productName || 'Your Product';
    const industry = params.industry || 'Technology';
    
    switch (step.category) {
      case 'analysis':
        return {
          insights: [
            `${industry} market shows 23% growth potential`,
            `Key opportunity in ${params.targetAudience || 'target demographic'}`,
            `Competitive gap identified in pricing strategy`
          ],
          data: {
            marketSize: '$2.4B',
            growthRate: '23%',
            competitorCount: 12
          }
        };
        
      case 'strategy':
        return {
          framework: `Comprehensive ${step.name.toLowerCase()} for ${productName}`,
          recommendations: [
            'Focus on differentiation through premium positioning',
            'Leverage content marketing for thought leadership',
            'Implement multi-channel attribution model'
          ],
          timeline: '6-8 weeks implementation'
        };
        
      case 'creative':
        return {
          assets: step.outputs.map(output => ({
            type: output,
            variants: 3,
            status: 'generated',
            performance_score: Math.floor(Math.random() * 30) + 70
          })),
          themes: ['Innovation', 'Trust', 'Results'],
          formats: ['Video', 'Static', 'Carousel', 'Story']
        };
        
      case 'technical':
        return {
          deliverables: step.outputs,
          specifications: {
            loadTime: '< 2s',
            mobileOptimized: true,
            conversionOptimized: true
          },
          integrations: ['Analytics', 'CRM', 'Email Platform']
        };
        
      case 'execution':
        return {
          campaigns: step.outputs.map(output => ({
            name: output,
            status: 'ready',
            estimatedReach: Math.floor(Math.random() * 50000) + 10000,
            estimatedCTR: (Math.random() * 3 + 2).toFixed(2) + '%'
          })),
          schedule: 'Optimized for peak engagement times',
          automation: 'Fully automated with smart triggers'
        };
        
      default:
        return {
          completed: true,
          outputs: step.outputs,
          timestamp: new Date().toISOString()
        };
    }
  }

  // Calculate revenue attribution (mock implementation)
  private calculateAttribution(
    execution: WorkflowExecution,
    workflow: WorkflowDefinition,
    params: WorkflowParams
  ): void {
    const baseRevenue = this.parseRevenueRange(workflow.potentialRevenue);
    const randomMultiplier = 0.7 + Math.random() * 0.6; // 0.7 to 1.3
    
    execution.attribution = {
      estimatedRevenue: Math.round(baseRevenue * randomMultiplier),
      confidence: Math.floor(Math.random() * 15) + 85, // 85-100%
      channels: [
        { name: 'Organic Search', contribution: 35, revenue: Math.round(baseRevenue * 0.35 * randomMultiplier) },
        { name: 'Paid Social', contribution: 25, revenue: Math.round(baseRevenue * 0.25 * randomMultiplier) },
        { name: 'Email Marketing', contribution: 20, revenue: Math.round(baseRevenue * 0.20 * randomMultiplier) },
        { name: 'Direct Traffic', contribution: 12, revenue: Math.round(baseRevenue * 0.12 * randomMultiplier) },
        { name: 'Referrals', contribution: 8, revenue: Math.round(baseRevenue * 0.08 * randomMultiplier) }
      ]
    };
  }

  // Parse revenue range string to get average value
  private parseRevenueRange(range: string): number {
    const matches = range.match(/\$([0-9,]+)-([0-9,]+)/);
    if (matches) {
      const min = parseInt(matches[1].replace(/,/g, ''));
      const max = parseInt(matches[2].replace(/,/g, ''));
      return (min + max) / 2;
    }
    return 25000; // Default fallback
  }

  // Notify listeners of execution updates
  private notifyListeners(execution: WorkflowExecution): void {
    const listener = this.listeners.get(execution.id);
    if (listener) {
      listener({ ...execution }); // Send copy to prevent mutations
    }
  }

  // Pause execution
  pauseExecution(executionId: string): void {
    const execution = this.executions.get(executionId);
    if (execution && execution.status === 'running') {
      execution.status = 'paused';
      this.notifyListeners(execution);
    }
  }

  // Resume execution
  resumeExecution(executionId: string): void {
    const execution = this.executions.get(executionId);
    if (execution && execution.status === 'paused') {
      execution.status = 'running';
      this.notifyListeners(execution);
      // Resume execution logic would go here
    }
  }

  // Cancel execution
  cancelExecution(executionId: string): void {
    const execution = this.executions.get(executionId);
    if (execution && (execution.status === 'running' || execution.status === 'paused')) {
      execution.status = 'failed';
      execution.completedAt = new Date();
      this.notifyListeners(execution);
    }
  }
}

// Export singleton instance
export const workflowEngine = WorkflowEngine.getInstance();
