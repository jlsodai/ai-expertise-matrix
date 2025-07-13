'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ArrowRight } from 'lucide-react';
import { Question, QuestionnaireResult } from '@/types/matrix';

interface QuestionnaireFormProps {
  questions: Question[];
  onComplete: (result: QuestionnaireResult) => void;
}

export function QuestionnaireForm({ questions, onComplete }: QuestionnaireFormProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: parseInt(value)
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateResults = () => {
    const expertiseQuestions = questions.filter(q => q.category === 'expertise');
    const aiQuestions = questions.filter(q => q.category === 'ai_adoption');

    const expertiseScore = expertiseQuestions.reduce((sum, q) =>
      sum + (answers[q.id] || 0), 0) / expertiseQuestions.length;

    const aiAdoptionScore = aiQuestions.reduce((sum, q) =>
      sum + (answers[q.id] || 0), 0) / aiQuestions.length;

    let quadrant = '';
    let recommendations: string[] = [];
    let riskLevel: 'Low' | 'Medium' | 'High' = 'Medium';
    let riskDescription = '';
    let keyRisks: string[] = [];
    let upskillAreas: string[] = [];

    if (expertiseScore >= 3.5 && aiAdoptionScore >= 3.5) {
      quadrant = 'Expert + AI User';
      riskLevel = 'Low';
      riskDescription = 'You are well-positioned in the AI era with both domain expertise and AI adoption.';
      keyRisks = ['Overconfidence in AI outputs', 'Missing emerging AI developments'];
      upskillAreas = ['Advanced AI techniques', 'AI ethics and governance'];
      recommendations = [
        'Continue refining your AI prompting techniques',
        'Develop validation frameworks for AI outputs',
        'Share your expertise to help others in Q2 and Q3',
        'Experiment with cutting-edge AI tools in your domain'
      ];
    } else if (expertiseScore >= 3.5 && aiAdoptionScore < 3.5) {
      quadrant = 'Expert + No AI';
      riskLevel = 'Medium';
      riskDescription = 'Your expertise is valuable, but you risk being outpaced by AI-enhanced competitors.';
      keyRisks = ['Competitive disadvantage', 'Efficiency gaps', 'Missing AI opportunities'];
      upskillAreas = ['AI tool adoption', 'AI integration strategies', 'Prompt engineering'];
      recommendations = [
        'Start experimenting with AI tools in low-stakes scenarios',
        'Focus on AI applications that complement your expertise',
        'Consider the competitive advantage of AI-enhanced peers',
        'Join AI communities in your domain to learn best practices'
      ];
    } else if (expertiseScore < 3.5 && aiAdoptionScore >= 3.5) {
      quadrant = 'Non-Expert + AI User';
      riskLevel = 'High';
      riskDescription = 'Using AI without sufficient domain expertise can lead to poor decisions and outcomes.';
      keyRisks = ['Inability to validate AI outputs', 'Poor decision making', 'False confidence'];
      upskillAreas = ['Domain expertise building', 'Critical thinking', 'AI output validation'];
      recommendations = [
        'Seek expert validation of your AI outputs',
        'Focus on building domain knowledge alongside AI skills',
        'Use AI to accelerate learning, not replace it',
        'Find mentors who can help validate your AI-assisted work'
      ];
    } else {
      quadrant = 'Non-Expert + No AI';
      riskLevel = 'Medium';
      riskDescription = 'You need to develop both domain expertise and AI skills to remain competitive.';
      keyRisks = ['Being left behind', 'Limited career growth', 'Reduced productivity'];
      upskillAreas = ['Domain knowledge', 'Basic AI literacy', 'Foundational skills'];
      recommendations = [
        'Prioritize building foundational expertise first',
        'Consider AI as a learning accelerator once basics are solid',
        'Develop critical thinking skills to eventually validate AI outputs',
        'Focus on traditional learning methods and mentorship'
      ];
    }

    onComplete({
      quadrant,
      expertiseScore,
      aiAdoptionScore,
      recommendations,
      riskProfile: {
        level: riskLevel,
        description: riskDescription,
        keyRisks,
        upskillAreas
      }
    });
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const currentQuestion = questions[currentQuestionIndex];
  const canProceed = answers[currentQuestion?.id];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Discover Your Quadrant</CardTitle>
          <Badge variant="outline">
            {currentQuestionIndex + 1} of {questions.length}
          </Badge>
        </div>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent className="space-y-6">
        {currentQuestion && (
          <>
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {currentQuestion.text}
              </h3>
              <RadioGroup
                value={answers[currentQuestion.id]?.toString() || ''}
                onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
              >
                {currentQuestion.options.map((option) => (
                  <div key={option.value} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value={option.value.toString()} id={`${currentQuestion.id}-${option.value}`} className="mt-1" />
                    <Label htmlFor={`${currentQuestion.id}-${option.value}`} className="flex-1">
                      <div className="flex flex-col cursor-pointer">
                        <div className="font-medium">
                          {option.label}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {option.description}
                        </p>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              <Button
                onClick={nextQuestion}
                disabled={!canProceed}
              >
                {currentQuestionIndex === questions.length - 1 ? 'Get Results' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}