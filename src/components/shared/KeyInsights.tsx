import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyInsight } from '@/types';

interface KeyInsightsProps {
  insights: KeyInsight[];
  className?: string;
}

export const KeyInsights: React.FC<KeyInsightsProps> = ({
  insights,
  className = '',
}) => {
  return (
    <div className={className}>
      <h2 className="text-2xl font-bold tracking-tight mb-6">Key Insights</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {insights.map((insight, index) => (
          <Card key={index} className="h-full flex flex-col">
            <CardHeader className="pb-3 flex flex-row items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary/10">
                {React.isValidElement(insight.icon) ? (
                  React.cloneElement(insight.icon, {
                    className: 'h-5 w-5 text-primary',
                  } as React.HTMLAttributes<HTMLElement>)
                ) : (
                  <div className="h-5 w-5" />
                )}
              </div>
              <CardTitle className="text-lg">{insight.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground mb-4">
                {insight.description}
              </p>
              <ul className="space-y-2">
                {insight.items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default KeyInsights;
