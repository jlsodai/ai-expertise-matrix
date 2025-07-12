'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { KeyInsight } from '@/types/matrix';

interface KeyInsightsProps {
  insights: KeyInsight[];
}

export function KeyInsights({ insights }: KeyInsightsProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {insights.map((insight, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  {insight.icon}
                </div>
                <CardTitle className="text-lg">{insight.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{insight.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Optimal Strategies by Quadrant</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-600">For AI-Enhanced Experts (Q1):</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Develop AI literacy within your domain</li>
                <li>• Create validation frameworks for AI outputs</li>
                <li>• Experiment with AI for ideation, not just execution</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-green-600">For Traditional Experts (Q2):</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Gradually experiment with AI tools in low-stakes scenarios</li>
                <li>• Focus on AI applications that complement existing expertise</li>
                <li>• Consider the competitive advantage of AI-enhanced peers</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-orange-600">For AI-Dependent Novices (Q3):</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Seek expert validation of AI outputs</li>
                <li>• Use AI to accelerate learning, not replace it</li>
                <li>• Focus on building domain knowledge alongside AI skills</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-red-600">For Traditional Novices (Q4):</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Prioritize building foundational expertise</li>
                <li>• Consider AI as a learning accelerator once basics are solid</li>
                <li>• Develop critical thinking skills to eventually validate AI outputs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}