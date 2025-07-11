import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, RotateCcw } from 'lucide-react';
import { QuestionnaireResult } from '@/types';
import { formatScore, getProgressColor } from '@/lib/utils';

interface ResultsViewProps {
  results: QuestionnaireResult;
  onRestart: () => void;
  className?: string;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  results,
  onRestart,
  className = '',
}) => {
  const { quadrant, expertiseScore, aiAdoptionScore, recommendations, scores } = results;
  
  // Find the quadrant with the highest score
  const strongestArea = Object.entries(scores).reduce((a, b) => 
    a[1] > b[1] ? a : b
  );
  
  // Find the quadrant with the lowest score
  const areaForGrowth = Object.entries(scores).reduce((a, b) => 
    a[1] < b[1] ? a : b
  );

  return (
    <div className={cn('space-y-8', className)}>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Your AI Expertise Assessment Results
        </h2>
        <p className="text-muted-foreground">
          Based on your responses, here's how you're positioned in the AI Expertise Matrix
        </p>
      </div>

      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-center text-2xl">
            You're in the <span className="text-primary">{quadrant}</span> quadrant
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Your Scores</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Domain Expertise</span>
                    <span className="font-medium">{formatScore(expertiseScore)}/5.0</span>
                  </div>
                  <Progress 
                    value={(expertiseScore / 5) * 100} 
                    className="h-2"
                    indicatorClassName={getProgressColor((expertiseScore / 5) * 100)}
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>AI Adoption</span>
                    <span className="font-medium">{formatScore(aiAdoptionScore)}/5.0</span>
                  </div>
                  <Progress 
                    value={(aiAdoptionScore / 5) * 100} 
                    className="h-2"
                    indicatorClassName={getProgressColor((aiAdoptionScore / 5) * 100)}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quadrant Scores</h3>
              <div className="space-y-3">
                {Object.entries(scores).map(([name, score]) => (
                  <div key={name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{name}</span>
                      <span className="font-medium">{formatScore(score)}/5.0</span>
                    </div>
                    <Progress 
                      value={(score / 5) * 100} 
                      className="h-2"
                      indicatorClassName={name === quadrant ? 'bg-primary' : 'bg-muted-foreground/20'}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Strengths</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Strongest Area</h4>
                  <p className="text-sm text-muted-foreground">{strongestArea[0]}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Assessment</h4>
                  <p className="text-sm text-muted-foreground">
                    Your profile shows a good balance between expertise and AI adoption.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Growth Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Area for Growth</h4>
                  <p className="text-sm text-muted-foreground">{areaForGrowth[0]}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Potential</h4>
                  <p className="text-sm text-muted-foreground">
                    There's room to grow in how you leverage AI tools.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recommended Next Steps</CardTitle>
          <p className="text-sm text-muted-foreground">
            Based on your assessment, here are some recommendations to enhance your AI expertise:
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((recommendation, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-sm">{recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button onClick={onRestart}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Retake Assessment
        </Button>
      </div>
    </div>
  );
};

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default ResultsView;
