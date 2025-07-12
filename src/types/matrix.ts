export interface QuadrantData {
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

export interface Question {
  id: string;
  text: string;
  category: 'expertise' | 'ai_adoption';
  options: {
    value: number;
    label: string;
    description: string;
  }[];
}

export interface QuestionnaireResult {
  quadrant: string;
  expertiseScore: number;
  aiAdoptionScore: number;
  recommendations: string[];
}

export interface KeyInsight {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface MovementPath {
  from: string;
  to: string;
  description: string;
  path: string;
  color: string;
}