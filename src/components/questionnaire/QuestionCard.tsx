import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Question } from '@/types';

interface QuestionCardProps {
  question: Question;
  value: string | null;
  onChange: (value: string) => void;
  className?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  value,
  onChange,
  className = '',
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">{question.text}</CardTitle>
        {question.description && (
          <CardDescription>{question.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={value || ''}
          onValueChange={onChange}
          className="space-y-3"
        >
          {question.options.map((option) => (
            <div key={option.value} className="flex items-start space-x-3">
              <RadioGroupItem value={option.value.toString()} id={`${question.id}-${option.value}`} />
              <div className="leading-none">
                <Label
                  htmlFor={`${question.id}-${option.value}`}
                  className="font-medium cursor-pointer"
                >
                  {option.label}
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {option.description}
                </p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
