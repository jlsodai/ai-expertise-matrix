import { useState, useCallback } from 'react';
import { Question, QuestionnaireResult } from '@/types';
import { calculateResults } from '@/lib/utils';

export const useQuestionnaire = (questions: Question[]) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [results, setResults] = useState<QuestionnaireResult | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const allQuestionsAnswered = Object.keys(answers).length === questions.length;

  const handleAnswer = useCallback((questionId: string, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));

    // Auto-advance to next question if not the last one
    setCurrentQuestionIndex(prev => {
      if (prev < questions.length - 1) {
        return prev + 1;
      }
      return prev;
    });
  }, [questions.length]);

  const goToNextQuestion = useCallback(() => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [isLastQuestion]);

  const goToPreviousQuestion = useCallback(() => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [isFirstQuestion]);

  const submitQuestionnaire = useCallback(() => {
    if (allQuestionsAnswered) {
      const calculatedResults = calculateResults(answers);
      setResults(calculatedResults);
    }
  }, [answers, allQuestionsAnswered]);

  const resetQuestionnaire = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResults(null);
  }, []);

  return {
    currentQuestion,
    currentQuestionIndex,
    answers,
    results,
    isFirstQuestion,
    isLastQuestion,
    allQuestionsAnswered,
    totalQuestions: questions.length,
    handleAnswer,
    goToNextQuestion,
    goToPreviousQuestion,
    submitQuestionnaire,
    resetQuestionnaire,
  };
};
