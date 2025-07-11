import React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  currentQuestion: number;
  totalQuestions: number;
  className?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentQuestion,
  totalQuestions,
  className = '',
}) => {
  const progress = Math.min(100, Math.max(0, (currentQuestion / totalQuestions) * 100));
  
  const getProgressColor = (percentage: number): string => {
    if (percentage >= 70) return 'bg-green-500';
    if (percentage >= 40) return 'bg-yellow-500';
    return 'bg-primary';
  };

  return (
    <div className={cn('w-full space-y-2', className)}>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Progress</span>
        <span>
          Question {currentQuestion} of {totalQuestions}
        </span>
      </div>
      <Progress 
        value={progress} 
        className="h-2"
        indicatorClassName={getProgressColor(progress)}
      />
    </div>
  );
};

export default ProgressIndicator;
