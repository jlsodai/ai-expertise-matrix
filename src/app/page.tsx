'use client';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/layout/Header';
import { MatrixGrid } from '@/components/matrix/MatrixGrid';
import { QuadrantModal } from '@/components/matrix/QuadrantModal';
import { QuestionnaireForm } from '@/components/questionnaire/QuestionnaireForm';
import { QuestionnaireResults } from '@/components/questionnaire/QuestionnaireResults';
import { KeyInsights } from '@/components/insights/KeyInsights';
import { MovementPathways } from '@/components/pathways/MovementPathways';
import { quadrants, questions, keyInsights, movementPaths } from '@/data/matrix-data';
import { QuadrantData, QuestionnaireResult } from '@/types/matrix';

export default function AIExpertiseMatrix() {
  const [selectedQuadrant, setSelectedQuadrant] = useState<QuadrantData | null>(null);
  const [activeTab, setActiveTab] = useState('matrix');
  const [showResults, setShowResults] = useState(false);
  const [questionnaireResult, setQuestionnaireResult] = useState<QuestionnaireResult | null>(null);

  const handleQuestionnaireComplete = (result: QuestionnaireResult) => {
    setQuestionnaireResult(result);
    setShowResults(true);
  };

  const resetQuestionnaire = () => {
    setShowResults(false);
    setQuestionnaireResult(null);
  };

  const handleExploreMatrix = () => {
    setActiveTab('matrix');
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Header />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-5xl mx-auto">
          <TabsList className="grid w-full sm:grid-cols-4 mb-8 h-42 sm:h-12">
            <TabsTrigger value="matrix">Interactive Matrix</TabsTrigger>
            <TabsTrigger value="questionnaire">Find Your Quadrant</TabsTrigger>
            <TabsTrigger value="insights">Key Insights</TabsTrigger>
            <TabsTrigger value="pathways">Movement Pathways</TabsTrigger>
          </TabsList>

          <TabsContent value="matrix" className="space-y-8">
            <MatrixGrid 
              quadrants={quadrants} 
              onQuadrantClick={setSelectedQuadrant} 
            />
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
              <QuestionnaireForm 
                questions={questions}
                onComplete={handleQuestionnaireComplete}
              />
            ) : (
              <QuestionnaireResults
                result={questionnaireResult!}
                onReset={resetQuestionnaire}
                onExploreMatrix={handleExploreMatrix}
              />
            )}
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <KeyInsights insights={keyInsights} />
          </TabsContent>

          <TabsContent value="pathways" className="space-y-6">
            <MovementPathways paths={movementPaths} />
          </TabsContent>
        </Tabs>

        <QuadrantModal
          quadrant={selectedQuadrant}
          isOpen={!!selectedQuadrant}
          onClose={() => setSelectedQuadrant(null)}
        />
      </div>
    </div>
  );
}