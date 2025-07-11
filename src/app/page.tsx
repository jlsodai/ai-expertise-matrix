'use client';

import { useCallback, useState } from 'react';

// Constants
import { QUADRANTS, DEFAULT_QUADRANT } from '@/constants/quadrants';
import { QUESTIONS } from '@/constants/questions';
import { MOVEMENT_PATHS } from '@/constants/movement-paths';
import { Book } from 'lucide-react';

// Components
import { Dialog, DialogContent } from '@/components/ui/dialog';

// Types
import type { 
  QuadrantData, 
  Question, 
  QuestionnaireResult,
  KeyInsight,
  MovementPath 
} from '@/types';

// UI Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Shield, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  X, 
  BarChart2, 
  TrendingUp, 
  Lightbulb, 
  ChevronRight, 
  ChevronLeft,
  AlertCircle,
  Info
} from 'lucide-react';

// Custom Components
import { MatrixGrid } from '@/components/matrix/MatrixGrid';
import { QuadrantDialog } from '@/components/matrix/QuadrantDialog';
import { ProgressIndicator } from '@/components/questionnaire/ProgressIndicator';
import { QuestionCard } from '@/components/questionnaire/QuestionCard';
import { ResultsView } from '@/components/questionnaire/ResultsView';
import { KeyInsights } from '@/components/shared/KeyInsights';
import { MovementPaths } from '@/components/shared/MovementPaths';

const quadrants: QuadrantData[] = [
  {
    id: 'q1',
    title: 'Expert + AI User',
    subtitle: 'The AI-Enhanced Expert',
    description: 'Deep domain knowledge combined with strategic AI adoption',
    characteristics: [
      'Deep domain knowledge combined with strategic AI adoption',
      'Sophisticated understanding of both field and AI capabilities',
      'Strategic approach to AI tool selection and implementation'
    ],
    strengths: [
      'Asks sophisticated, targeted questions to AI',
      'Quickly identifies AI hallucinations or errors',
      'Uses AI to accelerate ideation and explore edge cases',
      'Provides rich context that improves AI outputs',
      'Knows when to trust vs. verify AI suggestions'
    ],
    weaknesses: [
      'May become over-reliant on AI for routine tasks',
      'Risk of losing manual skills over time',
      'Potential bias toward AI-generated solutions'
    ],
    outcomes: 'Maximum productivity gains, breakthrough insights, accelerated innovation',
    riskLevel: 'Low',
    riskDescription: 'Expertise acts as quality control',
    example: 'Senior engineer using AI to explore architectural patterns, then validating feasibility',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
    icon: 'brain' as const
  },
  {
    id: 'q2',
    title: 'Expert + No AI',
    subtitle: 'The Traditional Expert',
    description: 'Deep domain knowledge, limited or no AI adoption',
    characteristics: [
      'Deep domain knowledge with traditional methodologies',
      'Proven track record of quality work',
      'Resistance to or skepticism about AI tools'
    ],
    strengths: [
      'Maintains high quality standards through pure expertise',
      'Avoids AI-related risks and dependencies',
      'Develops solutions through proven methodologies',
      'Strong foundational knowledge and critical thinking'
    ],
    weaknesses: [
      'May be slower to explore alternatives',
      'Missing potential efficiency gains',
      'Could fall behind peers who leverage AI effectively',
      'Limited exposure to new problem-solving approaches'
    ],
    outcomes: 'Reliable, high-quality work but potentially slower pace',
    riskLevel: 'Medium',
    riskDescription: 'Opportunity cost of not leveraging AI',
    example: 'Experienced lawyer who relies solely on traditional research methods',
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200 hover:bg-green-100',
    icon: <Shield className="w-6 h-6" />
  },
  {
    id: 'q3',
    title: 'Non-Expert + AI User',
    subtitle: 'The AI-Dependent Novice',
    description: 'Limited domain knowledge but active AI adoption',
    characteristics: [
      'Limited domain expertise but high AI tool proficiency',
      'Eager to leverage AI for problem-solving',
      'Rapid adoption of new AI technologies'
    ],
    strengths: [
      'Can access information and generate ideas quickly',
      'May stumble upon novel approaches',
      'Rapid prototyping and iteration',
      'Comfortable with new technologies'
    ],
    weaknesses: [
      'Cannot distinguish good from bad AI outputs',
      'Lacks context to ask the right questions',
      'May confidently produce plausible but incorrect work',
      'Vulnerable to AI hallucinations and biases'
    ],
    outcomes: 'Highly variable - from surprisingly good to dangerously wrong',
    riskLevel: 'High',
    riskDescription: 'Confident incompetence - high risk of errors',
    example: 'Junior developer using AI to write code they cannot debug or optimize',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
    icon: <AlertTriangle className="w-6 h-6" />
  },
  {
    id: 'q4',
    title: 'Non-Expert + No AI',
    subtitle: 'The Traditional Novice',
    description: 'Limited domain knowledge and no AI adoption',
    characteristics: [
      'Beginning their journey in the domain',
      'Traditional learning approach',
      'Building foundational knowledge'
    ],
    strengths: [
      'Forced to build foundational knowledge',
      'Learns through traditional mentorship and study',
      'Develops critical thinking skills',
      'Solid foundation for future growth'
    ],
    weaknesses: [
      'Slower learning curve',
      'Limited by available resources and guidance',
      'May struggle with complex problems',
      'Missing potential AI-assisted learning opportunities'
    ],
    outcomes: 'Gradual skill development, traditional learning path',
    riskLevel: 'Medium',
    riskDescription: 'Slow progress but building solid foundation',
    example: 'Medical student learning through textbooks and clinical rotations',
    color: 'text-red-600',
    bgColor: 'bg-red-50 border-red-200 hover:bg-red-100',
    icon: 'book' as const
  }
];

const questions: Question[] = [
  {
    id: 'domain_knowledge',
    text: 'How would you rate your knowledge in your primary domain/field?',
    category: 'expertise',
    options: [
      { value: 1, label: 'Beginner', description: 'Just starting to learn the basics' },
      { value: 2, label: 'Developing', description: 'Have some knowledge but still learning fundamentals' },
      { value: 3, label: 'Competent', description: 'Solid understanding of core concepts and practices' },
      { value: 4, label: 'Proficient', description: 'Deep knowledge with ability to handle complex problems' },
      { value: 5, label: 'Expert', description: 'Recognized expertise with ability to innovate and teach others' }
    ]
  },
  {
    id: 'experience_years',
    text: 'How many years of experience do you have in your field?',
    category: 'expertise',
    options: [
      { value: 1, label: '0-1 years', description: 'New to the field' },
      { value: 2, label: '2-3 years', description: 'Early career' },
      { value: 3, label: '4-7 years', description: 'Mid-level experience' },
      { value: 4, label: '8-15 years', description: 'Senior level' },
      { value: 5, label: '15+ years', description: 'Veteran with extensive experience' }
    ]
  },
  {
    id: 'problem_solving',
    text: 'When facing complex problems in your field, how often can you solve them independently?',
    category: 'expertise',
    options: [
      { value: 1, label: 'Rarely', description: 'Usually need significant help and guidance' },
      { value: 2, label: 'Sometimes', description: 'Can solve simple problems, need help with complex ones' },
      { value: 3, label: 'Often', description: 'Can solve most problems with occasional consultation' },
      { value: 4, label: 'Usually', description: 'Can solve complex problems independently most of the time' },
      { value: 5, label: 'Almost Always', description: 'Consistently solve complex problems and help others' }
    ]
  },
  {
    id: 'ai_tool_usage',
    text: 'How frequently do you use AI tools in your work or learning?',
    category: 'ai_adoption',
    options: [
      { value: 1, label: 'Never', description: 'Have not used AI tools for work/learning' },
      { value: 2, label: 'Rarely', description: 'Tried a few times but not regularly' },
      { value: 3, label: 'Occasionally', description: 'Use AI tools for specific tasks when needed' },
      { value: 4, label: 'Regularly', description: 'AI tools are part of my regular workflow' },
      { value: 5, label: 'Daily', description: 'Use AI tools extensively throughout my workday' }
    ]
  },
  {
    id: 'ai_comfort',
    text: 'How comfortable are you with evaluating and validating AI-generated outputs?',
    category: 'ai_adoption',
    options: [
      { value: 1, label: 'Not comfortable', description: 'Cannot assess if AI outputs are correct or useful' },
      { value: 2, label: 'Slightly comfortable', description: 'Can spot obvious errors but miss subtle issues' },
      { value: 3, label: 'Moderately comfortable', description: 'Can evaluate outputs in familiar areas' },
      { value: 4, label: 'Very comfortable', description: 'Can critically assess AI outputs and improve them' },
      { value: 5, label: 'Extremely comfortable', description: 'Expert at prompting, validating, and optimizing AI outputs' }
    ]
  },
  {
    id: 'ai_integration',
    text: 'How well do you integrate AI tools into your workflow?',
    category: 'ai_adoption',
    options: [
      { value: 1, label: 'Not at all', description: 'Do not use AI tools in my workflow' },
      { value: 2, label: 'Basic usage', description: 'Use AI tools for simple, standalone tasks' },
      { value: 3, label: 'Moderate integration', description: 'AI tools help with several aspects of my work' },
      { value: 4, label: 'Strong integration', description: 'AI tools are seamlessly integrated into most processes' },
      { value: 5, label: 'Full integration', description: 'AI tools are central to my workflow and strategy' }
    ]
  }
];

const keyInsights: KeyInsight[] = [
  {
    title: 'The AI-Expertise Paradox',
    description: 'The most effective AI users combine deep domain expertise with advanced technical skills',
    icon: <Brain className="w-5 h-5" />,
    items: [
      'Combining AI with expertise creates a powerful synergy',
      'Domain knowledge helps validate and refine AI outputs',
      'Technical skills enable effective AI tool utilization'
    ]
  },
  {
    title: 'The Risk of AI Dependence',
    description: 'Over-reliance on AI without domain expertise leads to confident incompetence',
    icon: <Shield className="w-5 h-5" />,
    items: [
      'AI can produce plausible but incorrect results',
      'Lack of expertise makes validation difficult',
      'Critical thinking is essential for responsible AI use'
    ]
  },
  {
    title: 'The Learning Curve',
    description: 'The path to AI mastery requires both technical learning and domain experience',
    icon: <TrendingUp className="w-5 h-5" />,
    items: [
      'Start with fundamentals before advanced techniques',
      'Apply learning to real-world problems',
      'Continuous learning is key to staying relevant'
    ]
  }
];

const AIExpertiseMatrix = () => {
  // State for dialog
  const [selectedQuadrant, setSelectedQuadrant] = useState<QuadrantData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Questionnaire state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<QuestionnaireResult | null>(null);

  // Handler for answer changes
  const handleAnswerChange = useCallback((questionId: string, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  }, []);

  // Move to next question
  const handleNextQuestion = useCallback(() => {
    const newIndex = currentQuestionIndex + 1;
    if (newIndex < QUESTIONS.length) {
      setCurrentQuestionIndex(newIndex);
    } else {
      // Calculate results when finished
      const calculatedResults = calculateResults(answers, QUESTIONS);
      setResults(calculatedResults);
      setShowResults(true);
    }
  }, [currentQuestionIndex, answers]);

  // Calculate results based on answers
  const calculateResults = (answers: Record<string, number>, questions: Question[]): QuestionnaireResult => {
    // Simple scoring implementation - can be enhanced as needed
    const scores = {
      'Traditional Novices': 25,
      'AI-Dependent Novices': 50,
      'Traditional Experts': 75,
      'AI-Enhanced Experts': 100
    };
    
    return {
      quadrant: 'AI-Enhanced Experts',
      expertiseScore: 4,
      aiAdoptionScore: 4,
      recommendations: [
        'Continue refining your AI prompting techniques',
        'Develop validation frameworks for AI outputs'
      ],
      scores
    };
  };

  // Check if we can proceed to next question
  const canProceed = currentQuestionIndex < QUESTIONS.length ? Boolean(answers[QUESTIONS[currentQuestionIndex]?.id]) : false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="matrix" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="matrix">Interactive Matrix</TabsTrigger>
            <TabsTrigger value="questionnaire">Find Your Quadrant</TabsTrigger>
            <TabsTrigger value="insights">Key Insights</TabsTrigger>
            <TabsTrigger value="pathways">Movement Paths</TabsTrigger>
          </TabsList>

          <TabsContent value="matrix" className="space-y-8">
            <MatrixGrid quadrants={QUADRANTS} onQuadrantSelect={setSelectedQuadrant} />
          </TabsContent>

          <TabsContent value="questionnaire" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Readiness Assessment</CardTitle>
                <CardDescription>
                  Answer these questions to determine your position on the AI Expertise Matrix
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="space-y-6">
                    <QuestionCard
                      question={QUESTIONS[currentQuestionIndex]}
                      value={String(answers[QUESTIONS[currentQuestionIndex]?.id] || '0')}
                      onChange={(value) => handleAnswerChange(QUESTIONS[currentQuestionIndex].id, parseInt(value, 10))}
                    />

                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="default"
                        onClick={handleNextQuestion}
                        disabled={!canProceed}
                      >
                        {currentQuestionIndex < QUESTIONS.length - 1 ? 'Next' : 'Submit'}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <KeyInsights insights={keyInsights} />
          </TabsContent>

          <TabsContent value="pathways" className="space-y-6">
            <MovementPaths paths={MOVEMENT_PATHS} />
          </TabsContent>
        </Tabs>

        <Dialog open={!!selectedQuadrant} onOpenChange={(open) => !open && setSelectedQuadrant(null)}>
          <DialogContent className="sm:max-w-[600px]">
            {selectedQuadrant && (
              <QuadrantDialog 
                quadrant={selectedQuadrant}
                onClose={() => setSelectedQuadrant(null)}
                isOpen={!!selectedQuadrant}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}