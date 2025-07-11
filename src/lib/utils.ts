import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { type QuadrantData, type QuestionnaireResult } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBadgeVariant(riskLevel: string): 'destructive' | 'default' | 'outline' | 'secondary' | null | undefined {
  switch (riskLevel.toLowerCase()) {
    case 'high':
      return 'destructive'
    case 'medium':
      return 'default'
    case 'low':
      return 'outline'
    default:
      return 'secondary'
  }
}

export function formatScore(score: number) {
  return Math.round(score * 10) / 10
}

export function getProgressColor(percentage: number) {
  if (percentage < 30) return 'bg-red-500'
  if (percentage < 70) return 'bg-yellow-500'
  return 'bg-green-500'
}

export function calculateResults(answers: Record<string, number>): QuestionnaireResult {
  let expertiseScore = 0
  let aiAdoptionScore = 0
  
  // Questions 1-5 are about expertise
  for (let i = 1; i <= 5; i++) {
    expertiseScore += answers[`q${i}`] || 0
  }
  
  // Questions 6-10 are about AI adoption
  for (let i = 6; i <= 10; i++) {
    aiAdoptionScore += answers[`q${i}`] || 0
  }
  
  // Normalize scores to 0-100 range
  expertiseScore = (expertiseScore / 25) * 100
  aiAdoptionScore = (aiAdoptionScore / 25) * 100
  
  // Determine quadrant
  let quadrant = 'AI-Enhanced Experts' // default
  
  if (expertiseScore < 50 && aiAdoptionScore < 50) {
    quadrant = 'Traditional Novices'
  } else if (expertiseScore < 50 && aiAdoptionScore >= 50) {
    quadrant = 'AI-Dependent Novices'
  } else if (expertiseScore >= 50 && aiAdoptionScore < 50) {
    quadrant = 'Traditional Experts'
  }
  
  // Generate recommendations based on the quadrant
  const recommendations: string[] = [
    `Focus on ${quadrant.includes('Novice') ? 'building' : 'expanding'} your expertise in your field`,
    `Explore AI tools that can help you ${quadrant.includes('Novice') ? 'get started' : 'be more productive'}`,
    'Consider taking online courses to improve your skills',
    'Join professional communities to learn from others',
    'Set specific, measurable goals for your professional development'
  ]
  
  // Calculate scores for each quadrant
  const scores = {
    'Traditional Novices': (100 - expertiseScore) * 0.5 + (100 - aiAdoptionScore) * 0.5,
    'AI-Dependent Novices': (100 - expertiseScore) * 0.5 + aiAdoptionScore * 0.5,
    'Traditional Experts': expertiseScore * 0.5 + (100 - aiAdoptionScore) * 0.5,
    'AI-Enhanced Experts': expertiseScore * 0.5 + aiAdoptionScore * 0.5
  }
  
  return {
    quadrant,
    expertiseScore,
    aiAdoptionScore,
    recommendations,
    scores
  }
}

export function getRiskBadgeColor(riskLevel: string) {
  switch (riskLevel.toLowerCase()) {
    case 'high':
      return 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-800'
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-100 dark:hover:bg-yellow-800'
    case 'low':
      return 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-800'
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600'
  }
}
