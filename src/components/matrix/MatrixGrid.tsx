'use client';
import { QuadrantCard } from './QuadrantCard';
import { QuadrantData } from '@/types/matrix';

interface MatrixGridProps {
  quadrants: QuadrantData[];
  onQuadrantClick: (quadrant: QuadrantData) => void;
}

export function MatrixGrid({ quadrants, onQuadrantClick }: MatrixGridProps) {
  return (
    <div className="max-w-5xl mx-auto relative">
      {/* Rotated Vertical Text */}
      <div className="flex justify-center items-center absolute top-1/2 -left-48 transform -translate-y-1/2 hidden md:block">
        <div className="transform rotate-[-90deg]">
          <div className="flex items-center justify-center space-x-2 mt-1 gap-x-16">
            <div className="text-xs text-gray-500">Low</div>
            <div className="text-sm font-semibold text-gray-600">Domain Expertise</div>
            <div className="text-xs text-gray-500">High</div>
          </div>
        </div>
      </div>

      {/* Matrix Grid */}
      <div>
        <div className="grid sm:grid-cols-2 gap-6">
          {quadrants.map((quadrant) => (
            <QuadrantCard
              key={quadrant.id}
              quadrant={quadrant}
              onClick={() => onQuadrantClick(quadrant)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}