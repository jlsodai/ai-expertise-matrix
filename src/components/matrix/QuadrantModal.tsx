'use client';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { QuadrantData } from '@/types/matrix';

interface QuadrantModalProps {
  quadrant: QuadrantData | null;
  isOpen: boolean;
  onClose: () => void;
}

const getRiskBadgeColor = (risk: string) => {
  switch (risk) {
    case 'Low': return 'bg-green-100 text-green-800';
    case 'Medium': return 'bg-yellow-100 text-yellow-800';
    case 'High': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function QuadrantModal({ quadrant, isOpen, onClose }: QuadrantModalProps) {
  if (!quadrant) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${quadrant.bgColor} ${quadrant.color}`}>
              {quadrant.icon}
            </div>
            <div>
              <DialogTitle className={`text-xl ${quadrant.color}`}>
                {quadrant.title}
              </DialogTitle>
              <DialogDescription className="text-base font-medium">
                {quadrant.subtitle}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Badge className={getRiskBadgeColor(quadrant.riskLevel)}>
              {quadrant.riskLevel} Risk
            </Badge>
            <span className="text-sm text-gray-600">
              {quadrant.riskDescription}
            </span>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Characteristics</h4>
            <ul className="space-y-1">
              {quadrant.characteristics.map((char, index) => (
                <li key={index} className="text-sm text-gray-600">• {char}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-green-600 mb-2">Strengths</h4>
            <ul className="space-y-1">
              {quadrant.strengths.map((strength, index) => (
                <li key={index} className="text-sm text-gray-600">• {strength}</li>
              ))}
            </ul>
          </div>

          {quadrant.weaknesses.length > 0 && (
            <div>
              <h4 className="font-semibold text-red-600 mb-2">Weaknesses</h4>
              <ul className="space-y-1">
                {quadrant.weaknesses.map((weakness, index) => (
                  <li key={index} className="text-sm text-gray-600">• {weakness}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Typical Outcomes</h4>
            <p className="text-sm text-gray-600">{quadrant.outcomes}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Example</h4>
            <p className="text-sm text-gray-600 italic">{quadrant.example}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}