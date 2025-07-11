import { ReactNode } from 'react';
import { ArrowRight, ArrowDown, ArrowUpRight, TrendingUp } from 'lucide-react';

export interface MovementPath {
  from: string;
  to: string;
  description: string;
  steps: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  icon: ReactNode;
}

const movementPaths: MovementPath[] = [
  {
    from: 'Traditional Novice',
    to: 'Traditional Expert',
    description: 'Build expertise first through traditional learning',
    steps: [
      'Focus on mastering fundamentals',
      'Seek mentorship from experienced professionals',
      'Work on progressively challenging projects',
      'Study established best practices',
      'Develop critical thinking and problem-solving skills',
    ],
    difficulty: 'Hard',
    icon: <ArrowRight className="w-5 h-5" />,
  },
  {
    from: 'Traditional Novice',
    to: 'AI-Dependent Novice',
    description: 'Adopt AI tools before developing deep expertise',
    steps: [
      'Start using AI tools for basic tasks',
      'Learn prompt engineering basics',
      'Follow AI tool tutorials and guides',
      'Join AI tool communities',
      'Practice with different AI applications',
    ],
    difficulty: 'Easy',
    icon: <ArrowDown className="w-5 h-5" />,
  },
  {
    from: 'AI-Dependent Novice',
    to: 'AI-Enhanced Expert',
    description: 'Develop expertise while using AI tools',
    steps: [
      'Learn to validate AI outputs',
      'Study underlying concepts behind AI suggestions',
      'Use AI to accelerate learning, not replace it',
      'Develop critical evaluation skills',
      'Contribute to AI training data when possible',
    ],
    difficulty: 'Medium',
    icon: <ArrowUpRight className="w-5 h-5" />,
  },
  {
    from: 'Traditional Expert',
    to: 'AI-Enhanced Expert',
    description: 'Integrate AI tools with existing expertise',
    steps: [
      'Start with low-risk AI applications',
      'Learn to evaluate AI outputs using domain knowledge',
      'Gradually increase AI tool complexity',
      'Share expertise to improve AI systems',
      'Mentor others in AI adoption',
    ],
    difficulty: 'Medium',
    icon: <TrendingUp className="w-5 h-5" />,
  },
];

export const MOVEMENT_PATHS = movementPaths;
