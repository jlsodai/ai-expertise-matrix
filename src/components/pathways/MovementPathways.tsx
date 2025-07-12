'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { MovementPath } from '@/types/matrix';

interface MovementPathwaysProps {
  paths: MovementPath[];
}

export function MovementPathways({ paths }: MovementPathwaysProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ArrowUpRight className="w-5 h-5" />
            <span>Movement Between Quadrants</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {paths.map((path, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className={path.color}>
                    {path.path}
                  </Badge>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  {path.from} → {path.to}
                </h4>
                <p className="text-sm text-gray-600">{path.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommended Progression</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Ideal Path: Q4 → Q2 → Q1</h4>
              <p className="text-sm text-green-700">
                Build expertise first through traditional methods, then add AI tools as a force multiplier.
                This approach minimizes risk while maximizing long-term potential.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">Alternative Path: Q4 → Q3 → Q1</h4>
              <p className="text-sm text-yellow-700">
                Add AI early in the learning journey, but ensure continuous expertise development.
                This path requires careful validation and mentorship to avoid pitfalls.
              </p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">Avoid: Staying in Q3 Too Long</h4>
              <p className="text-sm text-red-700">
                The biggest risk is remaining an AI-dependent novice without building domain expertise.
                This leads to confident incompetence and potentially dangerous outcomes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}