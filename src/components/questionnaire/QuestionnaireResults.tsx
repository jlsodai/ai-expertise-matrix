'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, RotateCcw } from 'lucide-react';
import { QuestionnaireResult } from '@/types/matrix';

interface QuestionnaireResultsProps {
  result: QuestionnaireResult;
  onReset: () => void;
  onExploreMatrix: () => void;
}

export function QuestionnaireResults({ result, onReset, onExploreMatrix }: QuestionnaireResultsProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="text-center">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Your Results</CardTitle>
          <CardDescription>
            Based on your responses, here&apos;s where you fit in the AI × Expertise Matrix
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Domain Expertise Score</h4>
              <div className="text-3xl font-bold text-blue-600">
                {result.expertiseScore.toFixed(1)}/5.0
              </div>
              <Progress value={result.expertiseScore * 20} className="mt-2" />
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">AI Adoption Score</h4>
              <div className="text-3xl font-bold text-purple-600">
                {result.aiAdoptionScore.toFixed(1)}/5.0
              </div>
              <Progress value={result.aiAdoptionScore * 20} className="mt-2" />
            </div>
          </div>

          <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              You are: {result.quadrant}
            </h3>
          </div>

          <Button
            onClick={onReset}
            variant="outline"
            className="mr-4"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake Assessment
          </Button>
          <Button onClick={onExploreMatrix}>
            Explore Matrix
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personalized Recommendations</CardTitle>
          <CardDescription>
            Based on your quadrant, here are specific strategies to optimize your AI and expertise journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                  {index + 1}
                </div>
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}