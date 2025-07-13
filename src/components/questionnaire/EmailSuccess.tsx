'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Mail, Calendar, BookOpen } from 'lucide-react';
import { QuestionnaireResult } from '@/types/matrix';

interface EmailSuccessProps {
  result: QuestionnaireResult;
  email: string;
  onContinue: () => void;
}

export function EmailSuccess({ result, email, onContinue }: EmailSuccessProps) {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <CardTitle className="text-xl text-green-800">Success! Check Your Email</CardTitle>
        <CardDescription>
          We've sent your personalized AI risk report to <strong>{email}</strong>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Mail className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-semibold text-blue-900 mb-1">Immediate</h4>
            <p className="text-sm text-blue-700">Detailed risk assessment and action plan</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h4 className="font-semibold text-purple-900 mb-1">Weekly</h4>
            <p className="text-sm text-purple-700">Curated learning resources for your level</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-semibold text-green-900 mb-1">Monthly</h4>
            <p className="text-sm text-green-700">Advanced strategies and case studies</p>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">What's in your risk report:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Detailed analysis of your {result.riskProfile.level.toLowerCase()} risk profile</li>
            <li>• Specific vulnerabilities in your current approach</li>
            <li>• Step-by-step action plan to improve your AI readiness</li>
            <li>• Recommended tools and resources for your expertise level</li>
            <li>• Timeline for skill development and risk mitigation</li>
          </ul>
        </div>

        <Button onClick={onContinue} className="w-full">
          Continue Exploring the Matrix
        </Button>

        <div className="text-xs text-gray-500 text-center">
          Didn't receive the email? Check your spam folder or contact support.
        </div>
      </CardContent>
    </Card>
  );
}