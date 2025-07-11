import { QuadrantData, QuestionnaireResult } from '@/types';

type RiskLevel = 'Low' | 'Medium' | 'High';

export const getRiskColor = (riskLevel: RiskLevel): string => {
  switch (riskLevel) {
    case 'Low':
      return 'bg-green-100 text-green-800';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'High':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getBadgeVariant = (riskLevel: RiskLevel): 'default' | 'secondary' | 'destructive' => {
  switch (riskLevel) {
    case 'Low':
      return 'default';
    case 'Medium':
      return 'secondary';
    case 'High':
      return 'destructive';
    default:
      return 'default';
  }
};

export const getIconColor = (riskLevel: RiskLevel): string => {
  switch (riskLevel) {
    case 'Low':
      return 'text-green-500';
    case 'Medium':
      return 'text-yellow-500';
    case 'High':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

export const formatScore = (score: number): string => {
  return score.toFixed(1);
};

export const getProgressColor = (percentage: number): string => {
  if (percentage >= 70) return 'bg-green-500';
  if (percentage >= 40) return 'bg-yellow-500';
  return 'bg-red-500';
};

export const calculateResults = (answers: Record<string, number>): QuestionnaireResult => {
  // Calculate scores for each category
  const categoryScores: Record<string, number> = {
    expertise: 0,
    ai_adoption: 0
  };
  
  const questionCount: Record<string, number> = {
    expertise: 0,
    ai_adoption: 0
  };

  // Sum scores by category
  Object.entries(answers).forEach(([questionId, score]) => {
    const question = QUESTIONS.find(q => q.id === questionId);
    if (question) {
      categoryScores[question.category] += score;
      questionCount[question.category] += 1;
    }
  });

  // Calculate average scores (1-5 scale)
  const expertiseScore = questionCount.expertise > 0 
    ? categoryScores.expertise / questionCount.expertise 
    : 0;
    
  const aiAdoptionScore = questionCount.ai_adoption > 0 
    ? categoryScores.ai_adoption / questionCount.ai_adoption 
    : 0;

  // Determine quadrant
  let quadrant = '';
  if (expertiseScore >= 3 && aiAdoptionScore >= 3) {
    quadrant = 'AI-Enhanced Experts';
  } else if (expertiseScore >= 3 && aiAdoptionScore < 3) {
    quadrant = 'Traditional Experts';
  } else if (expertiseScore < 3 && aiAdoptionScore >= 3) {
    quadrant = 'AI-Dependent Novices';
  } else {
    quadrant = 'Traditional Novices';
  }

  // Generate recommendations based on scores
  const recommendations = [];
  
  if (expertiseScore < 3) {
    recommendations.push(
      'Focus on building domain expertise through structured learning and practice',
      'Seek mentorship from experienced professionals in your field',
      'Work on projects that challenge your current skill level'
    );
  }
  
  if (aiAdoptionScore < 3) {
    recommendations.push(
      'Start incorporating AI tools into your workflow for routine tasks',
      'Learn prompt engineering to get better results from AI tools',
      'Experiment with different AI applications relevant to your field'
    );
  } else {
    recommendations.push(
      'Deepen your understanding of AI tools you\'re already using',
      'Share your AI knowledge with colleagues to reinforce your learning',
      'Stay updated with the latest AI developments in your field'
    );
  }

  // Calculate scores for all quadrants (for visualization)
  const scores = {
    'AI-Enhanced Experts': Math.min(5, Math.max(1, (expertiseScore + aiAdoptionScore) / 2)),
    'Traditional Experts': Math.min(5, Math.max(1, (expertiseScore + (5 - aiAdoptionScore)) / 2)),
    'AI-Dependent Novices': Math.min(5, Math.max(1, ((5 - expertiseScore) + aiAdoptionScore) / 2)),
    'Traditional Novices': Math.min(5, Math.max(1, ((5 - expertiseScore) + (5 - aiAdoptionScore)) / 2))
  };

  return {
    quadrant,
    expertiseScore: parseFloat(expertiseScore.toFixed(1)),
    aiAdoptionScore: parseFloat(aiAdoptionScore.toFixed(1)),
    recommendations: [...new Set(recommendations)],
    scores
  };
};

// Import QUESTIONS here at the bottom to avoid circular dependencies
import { QUESTIONS } from '@/constants/questions';
