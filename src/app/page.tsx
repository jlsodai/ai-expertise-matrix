'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Brain,
  Target,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  ArrowUpRight,
  Shield,
  BookOpen,
  Users,
  CheckCircle,
  RotateCcw
} from 'lucide-react';

interface QuadrantData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  characteristics: string[];
  strengths: string[];
  weaknesses: string[];
  outcomes: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  riskDescription: string;
  example: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
}

interface Question {
  id: string;
  text: string;
  category: 'expertise' | 'ai_adoption';
  options: {
    value: number;
    label: string;
    description: string;
  }[];
}

interface QuestionnaireResult {
  quadrant: string;
  expertiseScore: number;
  aiAdoptionScore: number;
  recommendations: string[];
}

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
    icon: <Brain className="w-6 h-6" />
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
    icon: <BookOpen className="w-6 h-6" />
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

const keyInsights = [
  {
    title: 'The Expertise Multiplier Effect',
    description: 'High Expertise: AI acts as a force multiplier, amplifying existing capabilities. Low Expertise: AI can be a crutch that masks knowledge gaps or a learning accelerator if used thoughtfully.',
    icon: <TrendingUp className="w-5 h-5" />
  },
  {
    title: 'The Context Advantage',
    description: 'Domain experts provide better prompts, quality filters, validation mechanisms, and strategic application knowledge.',
    icon: <Target className="w-5 h-5" />
  },
  {
    title: 'Risk Patterns',
    description: 'Highest Risk: Non-experts who over-rely on AI. Lowest Risk: Experts who use AI as a verified tool. Hidden Risk: Experts who avoid AI and fall behind.',
    icon: <AlertTriangle className="w-5 h-5" />
  }
];

const movementPaths = [
  {
    from: 'Traditional Novice',
    to: 'Traditional Expert',
    description: 'Build expertise first through traditional learning',
    path: 'Q4 → Q2',
    color: 'text-blue-600'
  },
  {
    from: 'Traditional Expert',
    to: 'AI-Enhanced Expert',
    description: 'Add AI tools to existing expertise',
    path: 'Q2 → Q1',
    color: 'text-green-600'
  },
  {
    from: 'Traditional Novice',
    to: 'AI-Dependent Novice',
    description: 'Add AI early in learning journey',
    path: 'Q4 → Q3',
    color: 'text-orange-600'
  },
  {
    from: 'AI-Dependent Novice',
    to: 'AI-Enhanced Expert',
    description: 'Build expertise alongside AI usage',
    path: 'Q3 → Q1',
    color: 'text-purple-600'
  }
];

export default function AIExpertiseMatrix() {
  const [selectedQuadrant, setSelectedQuadrant] = useState<QuadrantData | null>(null);
  const [activeTab, setActiveTab] = useState('matrix');
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<Record<string, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [questionnaireResult, setQuestionnaireResult] = useState<QuestionnaireResult | null>(null);

  const handleAnswerChange = (questionId: string, value: string) => {
    setQuestionnaireAnswers(prev => ({
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
      sum + (questionnaireAnswers[q.id] || 0), 0) / expertiseQuestions.length;

    const aiAdoptionScore = aiQuestions.reduce((sum, q) =>
      sum + (questionnaireAnswers[q.id] || 0), 0) / aiQuestions.length;

    let quadrant = '';
    let recommendations: string[] = [];

    if (expertiseScore >= 3.5 && aiAdoptionScore >= 3.5) {
      quadrant = 'Expert + AI User';
      recommendations = [
        'Continue refining your AI prompting techniques',
        'Develop validation frameworks for AI outputs',
        'Share your expertise to help others in Q2 and Q3',
        'Experiment with cutting-edge AI tools in your domain'
      ];
    } else if (expertiseScore >= 3.5 && aiAdoptionScore < 3.5) {
      quadrant = 'Expert + No AI';
      recommendations = [
        'Start experimenting with AI tools in low-stakes scenarios',
        'Focus on AI applications that complement your expertise',
        'Consider the competitive advantage of AI-enhanced peers',
        'Join AI communities in your domain to learn best practices'
      ];
    } else if (expertiseScore < 3.5 && aiAdoptionScore >= 3.5) {
      quadrant = 'Non-Expert + AI User';
      recommendations = [
        'Seek expert validation of your AI outputs',
        'Focus on building domain knowledge alongside AI skills',
        'Use AI to accelerate learning, not replace it',
        'Find mentors who can help validate your AI-assisted work'
      ];
    } else {
      quadrant = 'Non-Expert + No AI';
      recommendations = [
        'Prioritize building foundational expertise first',
        'Consider AI as a learning accelerator once basics are solid',
        'Develop critical thinking skills to eventually validate AI outputs',
        'Focus on traditional learning methods and mentorship'
      ];
    }

    setQuestionnaireResult({
      quadrant,
      expertiseScore,
      aiAdoptionScore,
      recommendations
    });
    setShowResults(true);
  };

  const resetQuestionnaire = () => {
    setQuestionnaireAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setQuestionnaireResult(null);
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const currentQuestion = questions[currentQuestionIndex];
  const canProceed = questionnaireAnswers[currentQuestion?.id];

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/matrixlogo.svg"
              alt="Matrix Logo"
              width={70}
              height={70}
              className="mb-4"
            />
            <h1 className="text-4xl font-bold text-gray-900">
              AI × Expertise Matrix
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the four quadrants of AI adoption and domain expertise to understand
            the opportunities, risks, and optimal strategies for each combination.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-5xl mx-auto">
          <TabsList className="grid w-full sm:grid-cols-4 mb-8 h-42 sm:h-12">
            <TabsTrigger value="matrix">Interactive Matrix</TabsTrigger>
            <TabsTrigger value="questionnaire">Find Your Quadrant</TabsTrigger>
            <TabsTrigger value="insights">Key Insights</TabsTrigger>
            <TabsTrigger value="pathways">Movement Pathways</TabsTrigger>
          </TabsList>

          <TabsContent value="matrix" className="space-y-8">

            <div className="max-w-5xl mx-auto relative">
              {/* Rotated Vertical Text */}
              <div className="flex justify-center items-center absolute top-1/2 -left-52 transform -translate-y-1/2 hidden md:block">
                <div className="transform rotate-[-90deg]">
                  <div className="flex items-center justify-center space-x-2 mt-1 gap-x-16">
                    <div className="text-xs text-gray-500">Low</div>
                    <div className="text-sm font-semibold text-gray-600">Domain Expertise</div>
                    <div className="text-xs text-gray-500">High</div>
                  </div>
                </div>
              </div>

              {/* Matrix Grid */}
              <div>
                <div className="grid sm:grid-cols-2 gap-6">
                  {quadrants.map((quadrant) => (
                    <Card
                      key={quadrant.id}
                      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${quadrant.bgColor}`}
                      onClick={() => setSelectedQuadrant(quadrant)}
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
                        <p className="text-sm text-gray-600 mb-3">
                          {quadrant.description}
                        </p>
                        <div className="text-xs text-gray-500 mb-2">
                          <strong>Outcome:</strong> {quadrant.outcomes}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedQuadrant(quadrant);
                          }}
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>


            </div>
            <div className="text-center mt-8 hidden md:block">
              <div className="flex items-center justify-evenly mt-1">
                <div className="text-xs text-gray-500">Low</div>
                <div className="text-sm font-semibold text-gray-600">AI Adoption</div>
                <div className="text-xs text-gray-500">High</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="questionnaire" className="space-y-6">
            {!showResults ? (
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
                          value={questionnaireAnswers[currentQuestion.id]?.toString() || ''}
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
            ) : (
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
                          {questionnaireResult?.expertiseScore.toFixed(1)}/5.0
                        </div>
                        <Progress value={(questionnaireResult?.expertiseScore || 0) * 20} className="mt-2" />
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold text-purple-900 mb-2">AI Adoption Score</h4>
                        <div className="text-3xl font-bold text-purple-600">
                          {questionnaireResult?.aiAdoptionScore.toFixed(1)}/5.0
                        </div>
                        <Progress value={(questionnaireResult?.aiAdoptionScore || 0) * 20} className="mt-2" />
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        You are: {questionnaireResult?.quadrant}
                      </h3>
                      <p className="text-gray-600">
                        {quadrants.find(q => q.title === questionnaireResult?.quadrant)?.description}
                      </p>
                    </div>

                    <Button
                      onClick={resetQuestionnaire}
                      variant="outline"
                      className="mr-4"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Retake Assessment
                    </Button>
                    <Button
                      onClick={() => setActiveTab('matrix')}
                    >
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
                      {questionnaireResult?.recommendations.map((rec, index) => (
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
            )}
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
              {keyInsights.map((insight, index) => (
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
          </TabsContent>

          <TabsContent value="pathways" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ArrowUpRight className="w-5 h-5" />
                  <span>Movement Between Quadrants</span>
                </CardTitle>
                <CardDescription>
                  Understanding the optimal progression paths for career development
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {movementPaths.map((path, index) => (
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
          </TabsContent>
        </Tabs>

        {/* Detailed Quadrant Modal */}
        <Dialog open={!!selectedQuadrant} onOpenChange={() => setSelectedQuadrant(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedQuadrant && (
              <>
                <DialogHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${selectedQuadrant.bgColor} ${selectedQuadrant.color}`}>
                      {selectedQuadrant.icon}
                    </div>
                    <div>
                      <DialogTitle className={`text-xl ${selectedQuadrant.color}`}>
                        {selectedQuadrant.title}
                      </DialogTitle>
                      <DialogDescription className="text-base font-medium">
                        {selectedQuadrant.subtitle}
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>

                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Badge className={getRiskBadgeColor(selectedQuadrant.riskLevel)}>
                      {selectedQuadrant.riskLevel} Risk
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {selectedQuadrant.riskDescription}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Characteristics</h4>
                    <ul className="space-y-1">
                      {selectedQuadrant.characteristics.map((char, index) => (
                        <li key={index} className="text-sm text-gray-600">• {char}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Strengths</h4>
                    <ul className="space-y-1">
                      {selectedQuadrant.strengths.map((strength, index) => (
                        <li key={index} className="text-sm text-gray-600">• {strength}</li>
                      ))}
                    </ul>
                  </div>

                  {selectedQuadrant.weaknesses.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-red-600 mb-2">Weaknesses</h4>
                      <ul className="space-y-1">
                        {selectedQuadrant.weaknesses.map((weakness, index) => (
                          <li key={index} className="text-sm text-gray-600">• {weakness}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Typical Outcomes</h4>
                    <p className="text-sm text-gray-600">{selectedQuadrant.outcomes}</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Example</h4>
                    <p className="text-sm text-gray-600 italic">{selectedQuadrant.example}</p>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}