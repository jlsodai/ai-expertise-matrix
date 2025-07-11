import { ReactNode } from 'react';

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
  icon: ReactNode;
}

export interface Question {
  id: string;
  text: string;
  description?: string;
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
  scores: Record<string, number>;
}

export interface MovementPath {
  from: string;
  to: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  steps: string[];
  icon: ReactNode;
}

export interface KeyInsight {
  title: string;
  description: string;
  icon: ReactNode;
  items: string[];
}
