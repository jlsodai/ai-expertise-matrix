'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { QuadrantData } from '@/types/matrix';

interface QuadrantCardProps {
  quadrant: QuadrantData;
  onClick: () => void;
}

const getRiskBadgeColor = (risk: string) => {
  switch (risk) {
    case 'Low': return 'bg-green-100 text-green-800';
    case 'Medium': return 'bg-yellow-100 text-yellow-800';
    case 'High': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function QuadrantCard({ quadrant, onClick }: QuadrantCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${quadrant.bgColor}`}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className={`p-2 rounded-lg ${quadrant.bgColor} ${quadrant.color}`}>
            {quadrant.icon}
          </div>
          <Badge className={getRiskBadgeColor(quadrant.riskLevel)}>
            {quadrant.riskLevel} Risk
          </Badge>
        </div>
        <CardTitle className={`text-lg ${quadrant.color}`}>
          {quadrant.title}
        </CardTitle>
        <CardDescription className="font-medium">
          {quadrant.subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-3">
          {quadrant.description}
        </p>
        <div className="text-sm text-gray-500 mb-2">
          <strong>Outcome:</strong> {quadrant.outcomes}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}