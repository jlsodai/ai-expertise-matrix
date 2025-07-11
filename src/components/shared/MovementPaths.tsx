import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ArrowDown, ArrowUpRight, TrendingUp } from 'lucide-react';
import { MovementPath } from '@/types';

const getDifficultyVariant = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    case 'Hard':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
};

const getPathIcon = (from: string, to: string) => {
  if (from === 'Traditional Novice' && to === 'AI-Dependent Novice') {
    return <ArrowDown className="w-5 h-5 text-blue-500" />;
  }
  if (from === 'AI-Dependent Novice' && to === 'AI-Enhanced Experts') {
    return <ArrowUpRight className="w-5 h-5 text-purple-500" />;
  }
  if (from === 'Traditional Novice' && to === 'Traditional Expert') {
    return <ArrowRight className="w-5 h-5 text-amber-500" />;
  }
  return <TrendingUp className="w-5 h-5 text-green-500" />;
};

interface MovementPathsProps {
  paths: MovementPath[];
  className?: string;
}

export const MovementPaths: React.FC<MovementPathsProps> = ({
  paths,
  className = '',
}) => {
  return (
    <div className={className}>
      <h2 className="text-2xl font-bold tracking-tight mb-6">Common Progression Paths</h2>
      <div className="space-y-6">
        {paths.map((path, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {path.from} → {path.to}
                </CardTitle>
                <Badge className={getDifficultyVariant(path.difficulty)}>
                  {path.difficulty}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{path.description}</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getPathIcon(path.from, path.to)}
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">Key Steps:</h4>
                  <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
                    {path.steps.map((step, i) => (
                      <li key={i} className="leading-relaxed">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MovementPaths;
