import { Brain, Target, AlertTriangle, Zap } from 'lucide-react';
import { QuadrantData } from '@/types';

export const QUADRANTS: QuadrantData[] = [
  {
    id: 'ai-enhanced-experts',
    title: 'AI-Enhanced Experts',
    subtitle: 'High Expertise × High AI Adoption',
    description: 'Professionals who effectively combine deep domain expertise with AI tools',
    characteristics: [
      'Deep domain knowledge combined with strategic AI adoption',
      'Sophisticated understanding of both field and AI capabilities',
      'Strategic approach to AI tool selection and implementation'
    ],
    strengths: [
      'Asks sophisticated, targeted questions to AI',
      'Quickly identifies AI hallucinations or errors',
      'Uses AI to accelerate ideation and explore edge cases',
      'Provides rich context that improves AI outputs',
      'Knows when to trust vs. verify AI suggestions'
    ],
    weaknesses: [
      'May become over-reliant on AI for routine tasks',
      'Risk of losing manual skills over time',
      'Potential bias toward AI-generated solutions'
    ],
    outcomes: 'Maximum productivity gains, breakthrough insights, accelerated innovation',
    riskLevel: 'Low',
    riskDescription: 'Expertise acts as quality control',
    example: 'Senior engineer using AI to explore architectural patterns, then validating feasibility',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
    icon: <Brain className="w-6 h-6 text-blue-600" />
  },
  {
    id: 'traditional-experts',
    title: 'Traditional Experts',
    subtitle: 'High Expertise × Low AI Adoption',
    description: 'Experts who haven\'t yet embraced AI tools',
    characteristics: [
      'Deep domain knowledge with traditional methodologies',
      'Limited or no use of AI tools',
      'May be skeptical of AI or unaware of its potential'
    ],
    strengths: [
      'Strong foundation in domain knowledge',
      'Reliable, time-tested approaches',
      'Deep understanding of fundamentals'
    ],
    weaknesses: [
      'Slower execution compared to AI-enhanced peers',
      'Missed opportunities for innovation',
      'Risk of falling behind in productivity'
    ],
    outcomes: 'Consistent quality, but slower pace and potential stagnation',
    riskLevel: 'Medium',
    riskDescription: 'Competitive disadvantage',
    example: 'Senior developer who writes all code manually without AI assistance',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
    icon: <Target className="w-6 h-6 text-purple-600" />
  },
  {
    id: 'ai-dependent-novices',
    title: 'AI-Dependent Novices',
    subtitle: 'Low Expertise × High AI Adoption',
    description: 'Newcomers who rely heavily on AI tools',
    characteristics: [
      'Limited domain knowledge',
      'Heavy reliance on AI for core tasks',
      'May lack ability to validate AI outputs'
    ],
    strengths: [
      'Fast execution with AI assistance',
      'Access to advanced capabilities',
      'Can appear more capable than actual skill level'
    ],
    weaknesses: [
      'Difficulty identifying AI errors',
      'Superficial understanding of outputs',
      'Struggles when AI fails or is unavailable'
    ],
    outcomes: 'Fast but potentially unreliable results, risk of serious errors',
    riskLevel: 'High',
    riskDescription: 'Danger of undetected mistakes',
    example: 'Junior developer copying AI-generated code without understanding it',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50 border-amber-200 hover:bg-amber-100',
    icon: <AlertTriangle className="w-6 h-6 text-amber-600" />
  },
  {
    id: 'traditional-novices',
    title: 'Traditional Novices',
    subtitle: 'Low Expertise × Low AI Adoption',
    description: 'Newcomers working without AI assistance',
    characteristics: [
      'Limited domain knowledge',
      'Traditional learning and working methods',
      'May be unaware of AI tools or resistant to using them'
    ],
    strengths: [
      'Developing solid fundamentals',
      'Avoiding AI-related pitfalls',
      'Building independent problem-solving skills'
    ],
    weaknesses: [
      'Slow progress',
      'Limited access to advanced capabilities',
      'Risk of falling behind peers using AI'
    ],
    outcomes: 'Slow but steady progress, solid foundation',
    riskLevel: 'Medium',
    riskDescription: 'Progress may be too slow to be competitive',
    example: 'New developer learning to code without AI assistance',
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200 hover:bg-green-100',
    icon: <Zap className="w-6 h-6 text-green-600" />
  }
];

export const DEFAULT_QUADRANT = QUADRANTS[0];
