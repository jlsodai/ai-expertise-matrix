import React from 'react';
import { QuadrantData } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface MatrixGridProps {
  quadrants: QuadrantData[];
  onQuadrantSelect: (quadrant: QuadrantData) => void;
  className?: string;
}

export const MatrixGrid: React.FC<MatrixGridProps> = ({
  quadrants,
  onQuadrantSelect,
  className = '',
}) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6', className)}>
      {quadrants.map((quadrant) => (
        <Card
          key={quadrant.id}
          className={cn(
            'cursor-pointer transition-all hover:shadow-md h-full flex flex-col',
            quadrant.bgColor
          )}
          onClick={() => onQuadrantSelect(quadrant)}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className={cn('text-xl', quadrant.color)}>
                {quadrant.title}
              </CardTitle>
              <Badge variant="outline" className={quadrant.color}>
                {quadrant.riskLevel} Risk
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{quadrant.subtitle}</p>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm mb-4">{quadrant.description}</p>
            <div className="flex items-center text-sm text-muted-foreground mt-auto">
              <span className="flex items-center">
                Learn more
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MatrixGrid;
