import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { QuadrantData } from '@/types';
import { getBadgeVariant } from '@/lib/utils';

interface QuadrantDialogProps {
  quadrant: QuadrantData | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuadrantDialog: React.FC<QuadrantDialogProps> = ({
  quadrant,
  isOpen,
  onClose,
}) => {
  if (!quadrant) return null;

  const badgeVariant = getBadgeVariant(quadrant.riskLevel);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className={quadrant.color}>{quadrant.title}</DialogTitle>
            <Badge variant={badgeVariant}>
              {quadrant.riskLevel} Risk
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{quadrant.subtitle}</p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <section>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-sm text-muted-foreground">
              {quadrant.description}
            </p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">Key Characteristics</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {quadrant.characteristics.map((char, i) => (
                <li key={i} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{char}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section>
              <h3 className="font-semibold mb-2">Strengths</h3>
              <ul className="space-y-2 text-sm text-green-600 dark:text-green-400">
                {quadrant.strengths.map((strength, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="font-semibold mb-2">Potential Weaknesses</h3>
              <ul className="space-y-2 text-sm text-amber-600 dark:text-amber-400">
                {quadrant.weaknesses.map((weakness, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2">⚠️</span>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section>
            <h3 className="font-semibold mb-2">Typical Outcomes</h3>
            <p className="text-sm text-muted-foreground">{quadrant.outcomes}</p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">Risk Assessment</h3>
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Risk Level</span>
                <Badge variant={badgeVariant}>
                  {quadrant.riskLevel}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {quadrant.riskDescription}
              </p>
            </div>
          </section>

          <section>
            <h3 className="font-semibold mb-2">Example</h3>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm italic text-muted-foreground">&quot;{quadrant.example}&quot;</p>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuadrantDialog;
